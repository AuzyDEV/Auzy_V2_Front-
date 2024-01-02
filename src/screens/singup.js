// React and Paper Native Imports
import { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import {
   Button,
   Text,
   TextInput,
   Avatar,
   IconButton,
   HelperText,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// Styles, Screens and Componenets Imports
import { common } from "../styles/common";
import ErrorDialog from "../components/error-dialog";
import LoadingPortal from "../components/loading-portal";

// Contexts, Services and Utilities Imports
import { useAuthentication } from "../contexts/authentication";
import { addNewUser } from "../services/user-management";
import {
   isName,
   isPhone,
   isEmail,
   isPassword,
   arePasswordsMatching,
} from "../utils/validation";

const SignupScreen = ({ navigation }) => {
   // Destructuring values from context hooks.
   const { idToken, setIdToken, setAuthenticated } = useAuthentication();

   // State variables for managing component state.
   const [errorDialog, setErrorDialog] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");
   const [loading, setLoading] = useState(false);
   const [formData, setFormData] = useState({
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
   });
   const [formHelpers, setFormHelpers] = useState({
      name: false,
      phone: false,
      email: false,
      password: false,
      confirmPassword: false,
   });

   // Checks if the signup form fields are in a valid format.
   const isFormValid = () => {
      const isNameValid = isName(formData.name);
      const isPhoneValid = isPhone(formData.phone);
      const isEmailValid = isEmail(formData.email);
      const isPasswordValid = isPassword(formData.password);
      const passwordMatching = arePasswordsMatching(
         formData.password,
         formData.confirmPassword
      );

      setFormHelpers({
         name: !isNameValid,
         phone: !isPhoneValid,
         email: !isEmailValid,
         password: !isPasswordValid,
         confirmPassword: !passwordMatching,
      });

      return (
         isNameValid &&
         isPhoneValid &&
         isEmailValid &&
         isPasswordValid &&
         passwordMatching
      );
   };

   // Shows the dashboard upon successful user authentication.
   useEffect(() => {
      if (idToken) {
         setLoading(false);
         setAuthenticated(true);
      }
   }, [idToken]);

   // Handles the user signup by validating the form and creating a new user.
   const signup = async () => {
      if (isFormValid()) {
         try {
            setLoading(true);
            const idToken = await addNewUser({
               firstname: formData.name.split(" ")[0],
               lastname: formData.name.split(" ").slice(1).join(" ") || null,
               email: formData.email,
               phone: formData.phone,
               password: formData.password,
            });
            await AsyncStorage.setItem("idToken", idToken);
            setIdToken(idToken);
         } catch (error) {
            setErrorMessage(error?.response?.data?.error || null);
            setErrorDialog(true);
            setLoading(false);
         }
      }
   };

   // If loading, display a loading portal.
   if (loading) {
      return <LoadingPortal loadingMessage={"Signing up..."} />;
   }

   return (
      <ScrollView
         contentContainerStyle={[common.pmd, common.bgwhite, common.grow]}
      >
         <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => navigation.navigate("Login")}
            style={[common.mtno, common.mlno]}
         />
         <View style={common.ccenter}>
            <View style={common.rcenter}>
               <Avatar.Image size={100} source={require("../../assets/16759.png")} />
            </View>
            <View style={[common.rcenter, common.mtlg]}>
               <Text variant="headlineSmall">Welcome!</Text>
            </View>
            <View style={[common.rcenter, common.mtnr]}>
               <Text variant="bodyMedium">Create your account to continue</Text>
            </View>
            <View style={common.mtxxlg}>
               <TextInput
                  label="Full Name"
                  value={formData.name}
                  onChangeText={(value) => setFormData({ ...formData, name: value })}
                  left={<TextInput.Icon icon={"account-outline"} size={24} />}
                  underlineColor="transparent"
                  underlineColorAndroid="transparent"
               />
               {formHelpers.name && (
                  <HelperText type="error">
                     The provided name is either empty or invalid.
                  </HelperText>
               )}
               <TextInput
                  label="Phone number"
                  value={formData.phone}
                  keyboardType="numeric"
                  onChangeText={(value) => setFormData({ ...formData, phone: value })}
                  left={<TextInput.Icon icon={"phone-outline"} size={24} />}
                  underlineColor="transparent"
                  underlineColorAndroid="transparent"
                  style={common.mtsm}
               />
               {formHelpers.phone && (
                  <HelperText type="error">
                     The provided phone number is either empty or invalid.
                  </HelperText>
               )}
               <TextInput
                  label="Email"
                  value={formData.email}
                  onChangeText={(value) => setFormData({ ...formData, email: value })}
                  left={<TextInput.Icon icon={"email-outline"} size={24} />}
                  underlineColor="transparent"
                  underlineColorAndroid="transparent"
                  style={common.mtsm}
               />
               {formHelpers.email && (
                  <HelperText type="error">
                     The provided email is either empty or invalid.
                  </HelperText>
               )}
               <TextInput
                  label="Password"
                  secureTextEntry={true}
                  value={formData.password}
                  onChangeText={(value) =>
                     setFormData({ ...formData, password: value })
                  }
                  left={<TextInput.Icon icon={"lock-outline"} size={24} />}
                  underlineColor="transparent"
                  underlineColorAndroid="transparent"
                  style={common.mtsm}
               />
               {formHelpers.password && (
                  <HelperText type="error">
                     The provided password is either empty or invalid.
                  </HelperText>
               )}
               <TextInput
                  label="Confirm password"
                  secureTextEntry={true}
                  value={formData.confirmPassword}
                  onChangeText={(value) =>
                     setFormData({ ...formData, confirmPassword: value })
                  }
                  left={<TextInput.Icon icon={"lock-outline"} size={24} />}
                  underlineColor="transparent"
                  underlineColorAndroid="transparent"
                  style={common.mtsm}
               />
               {formHelpers.confirmPassword && (
                  <HelperText type="error">
                     The provided confirm password is either empty or invalid.
                  </HelperText>
               )}
            </View>
            <Button
               icon={({ size, color }) => (
                  <MaterialIcons name="arrow-forward" size={size} color={color} />
               )}
               mode="contained"
               style={common.mtmd}
               onPress={signup}
            >
               Sign up
            </Button>
         </View>
         <View style={[common.rcenter, common.mblg]}>
            <View style={[common.rcenter, common.mtlg]}>
               <Text variant="bodyMedium">Already have an account?</Text>
               <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("Login")}
                  style={common.mlnr}
               >
                  <Text variant="bodyMedium" style={[common.bold, common.purple]}>
                     Login
                  </Text>
               </TouchableOpacity>
            </View>
         </View>
         <ErrorDialog
            errorDialog={errorDialog}
            onDismiss={() => setErrorDialog(false)}
            errorMessage={errorMessage}
         />
      </ScrollView>
   );
};

export default SignupScreen;