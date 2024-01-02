// Third-party Modules Imports
import axios from "axios";

/**
 * Adds a new user by making a POST request to the add-new-user endpoint.
 * @param {Object} newUser - The user object containing information for registration.
 * @param {string} newUser.email - The email address of the new user.
 * @param {string} newUser.password - The password of the new user.
 * @param {string} newUser.firstname - The first name of the new user.
 * @param {string} newUser.lastname - The last name of the new user.
 * @param {string} newUser.phone - The phone number of the new user.
 * @returns {Promise<string>} - A promise that resolves to the ID token of the user.
 */
const addNewUser = async (newUser) => {
   const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/add-new-user`,
      {
         email: newUser.email,
         password: newUser.password,
         firstName: newUser.firstname,
         lastName: newUser.lastname,
         phoneNumber: newUser.phone,
         photoURL: null,
         street: null,
         city: null,
         zipCode: null,
         country: null,
         role: "user"
      }
   );
   return response.data.idToken;
};

const updateUser = async (userId, newUserInfo, idToken) => {
   await axios.put(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/update-user/${userId}`,
      newUserInfo,
      {
         headers: {
            Authorization: `Bearer ${idToken}`,
         },
      }
   );
};

const updateUserPassword = async (userId, password, idToken) => {
   await axios.put(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/update-user-password/${userId}`,
      {
         password: password
      },
      {
         headers: {
            Authorization: `Bearer ${idToken}`,
         },
      }
   );
};


/**
 * Retrieves user information by making a GET request to the get-user endpoint.
 * @param {string} userId - The ID of the user whose information is to be retrieved.
 * @param {string} idToken - The user's ID token for authentication.
 * @returns {Promise<Object>} - A promise that resolves to the data of the user.
 */
const getUserInfo = async (userId, idToken) => {
   const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/get-user/${userId}`,
      {
         headers: {
            Authorization: `Bearer ${idToken}`,
         },
      }
   );
   return response.data;
};

export { addNewUser, getUserInfo, updateUser, updateUserPassword } 