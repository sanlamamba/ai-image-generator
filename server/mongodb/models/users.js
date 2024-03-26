import mongoose from "mongoose";
import { magicTokenGenerator } from "../../utils/helpers/index.js";
import { sendEmail } from "../../utils/nodemailer/configuration.js";
import registerMagicLinkTemplate from "../../utils/nodemailer/templates/registerMagicLink.js";
import loginMagicLinkTemplate from "../../utils/nodemailer/templates/loginMagicLink.js";

const socialAuthProviderSchema = new mongoose.Schema(
  {
    id: String,
    supplier: String,
    token: String,
    last_used: Date,
  },
  { _id: false }
);

const subscriptionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["free", "premium", "enterprise"],
      default: "free",
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      default: function () {
        return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      },
    },
    requestLimit: {
      type: Number,
      default: function () {
        switch (this.type) {
          case "free":
            return 10;
          case "premium":
            return 100;
          case "enterprise":
            return 200;
          default:
            return 10;
        }
      },
    },
    requestsMade: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    socialAuth: {
      google: socialAuthProviderSchema,
      github: socialAuthProviderSchema,
      default: {},
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    magicLinkToken: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended", "verification_pending"],
      default: "verification_pending",
    },
    magicLinkExpiresAt: {
      type: Date,
      default: null,
    },
    justRegistered: {
      type: Boolean,
      default: true,
    },
    subscription: subscriptionSchema,
  },
  { timestamps: true }
);
userSchema.methods.newSubscription = function (type) {
  this.subscription = {
    type,
    startedAt: new Date(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  };
  return this.save();
};
userSchema.methods.updateSubscription = function (type) {
  this.subscription.type = type;
  this.subscription.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  return this.save();
};
userSchema.methods.cancelSubscription = function () {
  this.subscription.type = "free";
  this.subscription.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  return this.save();
};
userSchema.methods.incrementRequestCount = function () {
  this.subscription.requestsMade += 1;
  return this.save();
};
userSchema.methods.resetRequestCount = function () {
  this.subscription.requestsMade = 0;
  return this.save();
};

userSchema.pre("save", function (next) {
  if (this.isNew && this.justRegistered) {
    this.subscription = {
      type: "free",
      startedAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };
    this.magicLinkToken = magicTokenGenerator(); // TODO : bcrypt the magic token
    this.magicLinkExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const baseUrl =
      process.env.ENVIROMENT === "development"
        ? process.env.ORIGIN_LOCAL
        : process.env.ORIGIN_PROD;
    sendEmail({
      to: this.email,
      subject: "Welcome to our platform!",
      text: `Hello, ${this.name}! Please click the following link to verify your email address and activate your account: ${process.env.CLIENT_URL}/verify-email/${this.magicLinkToken}`,
      template: registerMagicLinkTemplate,
      data: {
        name: this.name,
        email: this.email,
        verificationCode: this.magicLinkToken,
        verificationLink: `${baseUrl}/verify-email/${this.magicLinkToken}`,
      },
    });
    if (this.subscription?.type !== "free") {
      this.subscription.startedAt = new Date();
      this.subscription.expiresAt = new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      );
    }
  }

  next();
});

userSchema.methods.requestRemaining = function () {
  return this.subscription.requestLimit - this.subscription.requestsMade > 0
    ? this.subscription.requestLimit - this.subscription.requestsMade
    : 0;
};

userSchema.methods.verifyMagicToken = async function (token) {
  try {
    if(this.magicLinkExpiresAt < new Date()){
      this.magicLinkToken = null;
      this.magicLinkExpiresAt = null;
      await this.save();
      throw new Error("Token expired");
    }
    const isTokenValid =
      this.magicLinkToken === token && new Date() <= this.magicLinkExpiresAt;

    if (!isTokenValid) {
      throw new Error("Invalid or expired token");
    }
    if(this.status === "verification_pending"){
      this.status = "active";
      this.isEmailVerified = true;
    }

    this.magicLinkToken = null;
    this.magicLinkExpiresAt = null;
    await this.save();

    return true;
  } catch (err) {
    return false;
  }
};

userSchema.methods.startLogginIn = function () {
  this.magicLinkToken = magicTokenGenerator(); // TODO : bcrypt the magic token
  this.magicLinkExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const baseUrl =
    process.env.ENVIROMENT === "development"
      ? process.env.ORIGIN_LOCAL
      : process.env.ORIGIN_PROD;
  sendEmail({
    to: this.email,
    subject: "Welcome to our platform!",
    text: `Hello, ${this.name}! Please click the following link to verify your email address and activate your account: ${process.env.CLIENT_URL}/verify-email/${this.magicLinkToken}`,
    template: loginMagicLinkTemplate,
    data: {
      name: this.name,
      email: this.email,
      verificationCode: this.magicLinkToken,
      verificationLink: `${baseUrl}/verify-email/${this.magicLinkToken}`,
    },
  });

  return this.save();
};

const User = mongoose.model("User", userSchema);

export default User;
