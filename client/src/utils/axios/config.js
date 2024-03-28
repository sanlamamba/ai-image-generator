const baseUrlProduction = "https://ai-image-generator-lt0y.onrender.com";
const baseUrlDevelopment = "http://localhost:9080";
const baseUrlTesting = "http://localhost:9080";
// const environment = "development";
const environment = "production";
const apiVersion = "v1";
const apiSuffix = "api";


const baseUrl =
  environment === "production"
    ? baseUrlProduction
    : environment === "testing"
    ? baseUrlTesting
    : baseUrlDevelopment;

// Application configuration
const appConfig = {
  // API Base URL Configuration
  apiBaseUrl: `${baseUrl}/${apiSuffix}/${apiVersion}`,
  // Default Timeout for Axios Requests
  defaultTimeout: 20000, // 5 seconds
  defaultHeaders: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  }

};

export default appConfig;
