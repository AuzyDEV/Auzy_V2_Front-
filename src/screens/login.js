// React, Paper and Third-Party Imports
import { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import {
   Text,
   TextInput,
   Avatar,
   Button,
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
import { authenticate } from "../services/authentication";
import { isEmail, isPassword } from "../utils/validation";

const LoginScreen = ({ navigation }) => {
   // Destructuring values from context hooks.
   const { idToken, setIdToken, setAuthenticated } = useAuthentication();

   // State variables for managing component state.
   const [showErrorDialog, setShowErrorDialog] = useState(false);
   const [errorMessage, setErrorMessage] = useState(null);
   const [showLoading, setShowLoading] = useState(false);
   const [showLoginScreen, setShowLoginScreen] = useState(false);
   const [email, setEmail] = useState("redeerx@gmail.com");
   const [showEmailHelper, setShowEmailHelper] = useState(false);
   const [password, setPassword] = useState("gr33ngr3y");
   const [showPasswordHelper, setShowPasswordHelper] = useState(false);

   // Checks if the email and password are in a valid format.
   const isFormValid = () => {
      const isEmailValid = isEmail(email);
      const isPasswordValid = isPassword(password);
      setShowEmailHelper(!isEmailValid);
      setShowPasswordHelper(!isPasswordValid);
      return isEmailValid && isPasswordValid;
   };

   // Shows the dashboard upon successful user authentication.
   useEffect(() => {
      if (idToken) {
         setShowLoading(false);
         setAuthenticated(true);
      }
   }, [idToken]);

   // Retrieves user authentication data from storage.
   useEffect(() => {
      (async () => {
         try {
            const idToken = await AsyncStorage.getItem("idToken");
            if (idToken) {
               setIdToken(idToken);
               setShowLoading(true);
            } else {
               setShowLoginScreen(true);
            }
         } catch (error) {
            setErrorMessage(error?.response?.data?.error || null);
            setShowErrorDialog(true);
            setShowLoading(false);
         }
      })();
   }, []);

   // Shows a loading screen while retrieving authentication data from storage.
   if (!showLoginScreen) {
      return <LoadingPortal loadingMessage={"Loading..."} />;
   }

   // Handles login by validating the form and authenticating the user.
   const login = async () => {
      if (isFormValid()) {
         try {
            setShowLoading(true);
            const idToken = await authenticate(email, password);
            await AsyncStorage.setItem("idToken", idToken);
            setIdToken(idToken);
         } catch (error) {
            setErrorMessage(error?.response?.data?.error || null);
            setShowErrorDialog(true);
            setShowLoading(false);
         }
      }
   };

   // If loading, display a loading portal.
   if (showLoading) {
      return <LoadingPortal loadingMessage={"Logging in..."} />;
   }

   return (
      <ScrollView
         contentContainerStyle={[common.pmd, common.bgwhite, common.grow]}
      >
         <View style={[common.ccenter]}>
            <View style={[common.rcenter]}>
               <Avatar.Image size={100} source={require("../../assets/14999.png")} />
            </View>
            <View style={[common.rcenter, common.mtlg]}>
               <Text variant="headlineSmall">Welcome back</Text>
            </View>
            <View style={[common.rcenter, common.mtnr]}>
               <Text variant="bodyMedium">Login to continue</Text>
            </View>
            <View style={common.mtxxlg}>
               <TextInput
                  label="E-mail"
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                  left={<TextInput.Icon icon={"email-outline"} size={24} />}
                  underlineColor="transparent"
                  underlineColorAndroid="transparent"
               />
               {showEmailHelper && (
                  <HelperText type="error">
                     The provided email address is either empty or invalid.
                  </HelperText>
               )}
               <TextInput
                  label="Password"
                  value={password}
                  onChangeText={(value) => setPassword(value)}
                  secureTextEntry={true}
                  left={<TextInput.Icon icon={"lock-outline"} size={24} />}
                  underlineColor="transparent"
                  underlineColorAndroid="transparent"
                  style={common.mtsm}
               />
               {showPasswordHelper && (
                  <HelperText type="error">
                     The provided password is either empty or invalid.
                  </HelperText>
               )}
            </View>
            <Button
               icon={({ size, color }) => (
                  <MaterialIcons name="arrow-forward" size={size} color={color} />
               )}
               mode="contained"
               style={common.mtmd}
               onPress={login}
            >
               Login
            </Button>
            <View style={[common.rcenter, common.mtlg]}>
               <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("Forgot password")}
               >
                  <Text variant="bodyMedium">Forgot password?</Text>
               </TouchableOpacity>
            </View>
         </View>
         <View style={[common.rcenter, common.mblg]}>
            <View style={[common.rcenter, common.mtlg]}>
               <Text variant="bodyMedium">Don"t have an account?</Text>
               <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("Signup")}
                  style={common.mlnr}
               >
                  <Text variant="bodyMedium" style={[common.bold, common.purple]}>
                     Sign up
                  </Text>
               </TouchableOpacity>
            </View>
         </View>
         <ErrorDialog
            errorDialog={showErrorDialog}
            onDismiss={() => setShowErrorDialog(false)}
            errorMessage={errorMessage}
         />
         <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      </ScrollView>
   );
};

export default LoginScreen;
