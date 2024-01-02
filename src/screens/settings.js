// React, Paper and Third-Party Imports
import { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import {
   Avatar,
   Text,
   Button,
   List,
   Card,
   Portal
} from "react-native-paper";
import MaterialCommunityIcons from "../utils/mat-com-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Styles, Screens and Componenets Imports
import { common } from "../styles/common";
import ErrorDialog from "../components/error-dialog";
import LoadingPortal from "../components/loading-portal";

// Contexts, Services and Utilities Imports
import { useAuthentication } from "../contexts/authentication";
import { deauthenticate } from "../services/authentication";
import { useContent } from "../contexts/content";

const SettingsScreen = ({ navigation }) => {
   // Destructuring values from context hooks.
   const {
      setIdToken,
      userInfo,
      setUserInfo,
      setAuthenticated
   } = useAuthentication();
   const {
      setFeatProfessionals,
      setFeatArticles,
      setProfessionalsTags,
      setArticlesTags,
   } = useContent();

   // State variables for managing component state.
   const [showErrorDialog, setShowErrorDialog] = useState(false);
   const [errorMessage, setErrorMessage] = useState(null);
   const [showLoading, setShowLoading] = useState(false);

   // Handles the user logout process by clearing user data.
   const logout = async () => {
      try {
         setShowLoading(true);
         await AsyncStorage.removeItem("idToken");
         setIdToken(null);
         setUserInfo(null);
         setFeatArticles(null);
         setFeatProfessionals(null);
         setProfessionalsTags(null);
         setArticlesTags(null);
         await deauthenticate();
         setAuthenticated(false);
      } catch (error) {
         setShowLoading(false);
         setErrorMessage(error?.response?.data?.error || null);
         setShowErrorDialog(true);
      }
   };

   // If loading, display a loading portal.
   if (showLoading) {
      return <LoadingPortal loadingMessage={"Logging out..."} />;
   }

   return (
      <ScrollView
         contentContainerStyle={[common.pmd, common.bgpurple, common.grow]}
      >
         <View style={[common.rvcenter]}>
            <Avatar.Text
               size={60}
               label={(() =>
                  userInfo.firstName.charAt(0).toUpperCase() +
                  (userInfo.lastName?.charAt(0).toUpperCase() || ""))()}
            />
            <View style={[common.mlmd]}>
               <Text variant="titleMedium">
                  {userInfo.firstName} {userInfo.lastName}
               </Text>
               <Text variant="bodyMedium">{userInfo.email}</Text>
            </View>
         </View>
         <View style={common.mtlg}>
            <View>
               <Text variant="titleMedium">Account Information</Text>
               <View style={common.mtmd}>
                  <Card style={[common.pnr, common.bgwhite]}>
                     <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.navigate("User Information")}
                     >
                        <List.Item
                           title="Update Information"
                           left={(props) => (
                              <List.Icon {...props} icon="account-outline" />
                           )}
                           right={(props) => (
                              <List.Icon {...props} icon="chevron-right" />
                           )}
                           style={common.lsep}
                        />
                     </TouchableOpacity>
                     <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.navigate("Change Password")}
                     >
                        <List.Item
                           title="Change Password"
                           left={(props) => <List.Icon {...props} icon="lock-outline" />}
                           right={(props) => (
                              <List.Icon {...props} icon="chevron-right" />
                           )}
                        />
                     </TouchableOpacity>
                  </Card>
               </View>
            </View>
            <View style={common.mtlg}>
               <Text variant="titleMedium">General Information</Text>
               <View style={common.mtmd}>
                  <Card style={[common.pnr, common.bgwhite]}>
                     <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.navigate("Terms and Conditions")}
                     >
                        <List.Item
                           title="Terms and Conditions"
                           left={(props) => (
                              <List.Icon {...props} icon="clipboard-check-outline" />
                           )}
                           right={(props) => (
                              <List.Icon {...props} icon="chevron-right" />
                           )}
                           style={common.lsep}
                        />
                     </TouchableOpacity>
                  </Card>
               </View>
            </View>
            <View style={common.mtxxlg}>
               <Button
                  icon={({ size, color }) => (
                     <MaterialCommunityIcons name="logout" size={size} color={color} />
                  )}
                  mode="contained"
                  onPress={logout}
               >
                  Logout
               </Button>
            </View>
         </View>
         <Portal>
            <ErrorDialog
               errorDialog={showErrorDialog}
               onDismiss={() => setShowErrorDialog(false)}
               errorMessage={errorMessage}
            />
         </Portal>
      </ScrollView>
   );
};

export default SettingsScreen;