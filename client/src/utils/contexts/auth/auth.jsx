import React, { createContext, useContext, useState, useEffect } from "react";
import appAxios from "../../axios/appAxios";
import { toast } from "react-toastify";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const register = async ({ name, email }) => {
    setLoading(true);
    try {
      const response = await appAxios.post("/auth", { name, email });
      await setUser(response.data.data);
      await setToken(response.data.token);
      toast.success("User registered successfully!");
      console.log("USER : ", response.data);
      console.log("TOKEN : ", token);
    } catch (error) {
      toast.error(`An error occurred: ${error.response.data.message}`);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async ({ email, otp, token= null }) => {
    setLoading(true);
    try {
      console.log("USER : ", email, otp);
      const response = await appAxios.post("/auth/verify-otp", { email, otp });

      setUser(response.data.data);
      setToken(response.data.token);        

      saveToken(response.data.token);

      toast.success("User verified successfully!");
      console.log("USER : ", response.data);
      console.log("TOKEN : ", token);
    } catch (error) {
      toast.error(`An error occurred: ${error.response.data.message}`);
    } finally {
      setLoading(false);
    }
  };

  const saveToken = async (token, temp = false) => {
    try {
      if(temp === true){
        localStorage.setItem("temp", true);
      }
      const encryptedToken = await encryptToken(token);
      localStorage.setItem("token", encryptedToken);
    } catch (error) {
      console.error("Error saving token:", error);
    }
  };

  const loadToken = async () => {
    try {
      const encryptedToken = localStorage.getItem("token");
      const token = await decryptToken(encryptedToken);
      const response = await appAxios.get("/auth/verify-token");
      setUser(response.data.data);
      setToken(response.data.token);
      return token;
    } catch (error) {
      console.error("Error loading token:", error);
      return null;
    }
  };

  const encryptToken = async (token) => {
    try {
      const encryptedToken = btoa(token);
      return encryptedToken;
    } catch (error) {
      console.error("Error encrypting token:", error);
      return null;
    }
  };

  const decryptToken = async (encryptedToken) => {
    try {
      const decryptedToken = atob(encryptedToken);
      return decryptedToken;
    } catch (error) {
      console.error("Error decrypting token:", error);
      return null;
    }
  };

  const login = ({ email }) => {
    setLoading(true);
    appAxios
      .post("/auth/login", { email })
      .then((response) => {
        setToken(response.data.token);
        toast.info("Check your email for magic code !")
      })
      .catch((error) => {
        toast.error(`An error occurred: ${error.response.data.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("temp");
  };

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, register, token, verifyOtp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
