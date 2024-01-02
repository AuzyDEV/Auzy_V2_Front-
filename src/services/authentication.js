// Third-party Modules Imports
import jwt_decode from "jwt-decode";
import axios from "axios";

/**
 * Authenticates a user by making a POST request to the sign-in endpoint.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<string>} - A promise that resolves to the user's ID token.
 */
const authenticate = async (email, password) => {
   const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/sign-in`,
      {
         email: email,
         password: password,
      }
   );
   return response.data.idToken;
};

/**
 * Deauthenticates the user by making a GET request to the sign-out endpoint.
 * @returns {Promise<void>} - A promise that resolves when the user is deauthenticated.
 */
const deauthenticate = async () => {
   await axios.get(`${process.env.EXPO_PUBLIC_API_BASE_URL}/sign-out`);
};

/**
 * Decodes a Firebase ID token.
 * @param {string} idToken - The Firebase ID token to decode.
 * @returns {Object} - The decoded token object.
 */
const decodeFirebaseToken = (idToken) => {
   const decodedToken = jwt_decode(idToken);
   return decodedToken;
};

/**
 * Checks if a token is about to expire within a specified threshold.
 * @param {Object} decodedToken - The decoded token object.
 * @param {number} thresholdSeconds - The threshold in seconds (default is 120 seconds).
 * @returns {boolean} - True if the token is about to expire, otherwise false.
 */
const isTokenAboutToExpire = (decodedToken, thresholdSeconds = 120) => {
   if (!decodedToken || !decodedToken.exp) {
      return false;
   }

   const currentTime = Math.floor(Date.now() / 1000);
   const tokenExpiration = decodedToken.exp;

   return tokenExpiration - currentTime < thresholdSeconds;
};

/**
 * Refreshes the user's ID token by making a GET request.
 * @param {string} idToken - The user's current ID token.
 * @returns {Promise<string>} - A promise that resolves to the refreshed ID token.
 */
const refreshIdToken = async (idToken) => {
   const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/refresh-auth-token/`
   );
   return response.data.idToken;
};

/**
 * Refreshes the user's ID token if it is about to expire.
 * @param {string} idToken - The user's current ID token.
 * @returns {Promise<string>} - A promise that resolves to the new or original ID token.
 */
const refreshTokenIfExpired = async (idToken) => {
   const decodedToken = decodeFirebaseToken(idToken);
   if (isTokenAboutToExpire(decodedToken)) {
      return await refreshIdToken();
   }
   return idToken;
};

/**
 * Retrieves the user's ID from the decoded ID token.
 * @param {string} idToken - The user's ID token.
 * @returns {string} - The user's ID.
 */
const getUserId = (idToken) => {
   const decodedToken = decodeFirebaseToken(idToken);
   return decodedToken.user_id;
};

/**
 * Initiates a password reset by making a POST request to the reset-password endpoint.
 * @param {string} email - The user's email address.
 * @returns {Promise<string>} - A promise that resolves to the reset password response.
 */
const resetPassword = async (email) => {
   const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/reset-password/`,
      {
         email: email,
      }
   );
   return response.data.idToken;
};

export {
   authenticate,
   deauthenticate,
   refreshTokenIfExpired,
   getUserId,
   resetPassword
};