// Third-party Modules Imports
import axios from "axios";

/**
 * Retrieves featured professionals by making a GET request.
 * @param {string} idToken - The user's ID token for authentication.
 * @returns {Promise<Object>} - A promise that resolves to featured professionals.
 */
const getFeatProfessionals = async (idToken) => {
   const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/get-feat-businesses/`,
      {
         headers: {
            Authorization: `Bearer ${idToken}`,
         },
      }
   );
   return response.data;
};

/**
 * Retrieves featured articles/posts by making a GET request.
 * @param {string} idToken - The user's ID token for authentication.
 * @returns {Promise<Object>} - A promise that resolves to featured articles.
 */
const getFeatArticles = async (idToken) => {
   const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/get-feat-posts/`,
      {
         headers: {
            Authorization: `Bearer ${idToken}`,
         },
      }
   );
   return response.data;
};

/**
 * Retrieves a list of all professionals tags from the server.
 * @param {string} idToken - The authentication token used to authorize the request.
 * @returns {Promise<Array>} A promise that resolves to an array containing all tags.
 */
const getProfessionalsTags = async (idToken) => {
   const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/get-all-business-tags/`,
      {
         headers: {
            Authorization: `Bearer ${idToken}`,
         },
      }
   );
   return response.data;
};

/**
 * Retrieves a list of all post tags from the server.
 * @param {string} idToken - The authentication token used to authorize the request.
 * @returns {Promise<Array>} A promise that resolves to an array containing post tags.
 */
const getArticlesTags = async (idToken) => {
   const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/get-all-post-tags/`,
      {
         headers: {
            Authorization: `Bearer ${idToken}`,
         },
      }
   );
   return response.data;
};

const getMatchingProfessionals = async (name, tag, city, idToken) => {
   const query = `name=${name}&tags=${tag || ''}&city=${city}`
   const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/get-matching-businesses?${query}`,
      {
         headers: {
            Authorization: `Bearer ${idToken}`,
         },
      }
   );
   return response.data;
};

const getArticlesByTag = async (tag, idToken) => {
   const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/get-posts-by-tag?tags=${tag}`,
      {
         headers: {
            Authorization: `Bearer ${idToken}`,
         },
      }
   );
   return response.data;
};

const getAllArticles = async (idToken) => {
   const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/get-all-posts/`,
      {
         headers: {
            Authorization: `Bearer ${idToken}`,
         },
      }
   );
   return response.data;
};


const updateBusiness = async (businessId, businessUpdate, idToken) => {
   console.log(businessUpdate)
   const response = await axios.put(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/update-business/${businessId}`,
      businessUpdate,
      {
         headers: {
            Authorization: `Bearer ${idToken}`,
         },
      }
   );
   return response.data;
};

export {
   getFeatProfessionals,
   getFeatArticles,
   getProfessionalsTags,
   getArticlesTags,
   getMatchingProfessionals,
   getArticlesByTag,
   getAllArticles,
   updateBusiness
};