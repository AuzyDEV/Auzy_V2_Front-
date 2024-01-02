// React, Paper and Third-Party Imports
import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { Dialog, Text, Button } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "../utils/mat-com-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Styles, Screens and Componenets Imports
import { common } from "../styles/common";
import HomeTab from "../tabs/home";
import ProfessionalsTab from "../tabs/professionals";
import ArticlesTab from "../tabs/articles";
import LoadingPortal from "../components/loading-portal";

// Contexts, Services and Utilities Imports
import { useAuthentication } from "../contexts/authentication";
import { useContent } from "../contexts/content";
import { getUserInfo } from "../services/user-management";
import {
   getFeatProfessionals,
   getFeatArticles,
   getProfessionalsTags,
   getArticlesTags
} from "../services/content";
import {
   deauthenticate,
   refreshTokenIfExpired,
   getUserId
} from "../services/authentication";

const DashboardNavigator = () => {
   // Destructuring values from context hooks.
   const {
      idToken,
      setIdToken,
      userInfo,
      setUserInfo,
      authenticated,
      setAuthenticated,
   } = useAuthentication();
   const {
      featProfessionals,
      setFeatProfessionals,
      featArticles,
      setFeatArticles,
      professionalsTags,
      setProfessionalsTags,
      setArticlesTags
   } = useContent();

   // State variables for managing component state.
   const [errorDialog, setErrorDialog] = useState(false);
   const [errorMessage, setErrorMessage] = useState(null);
   const [loading, setLoading] = useState(false);

   const Tab = createMaterialBottomTabNavigator();

   const logout = async () => {
      try {
         await AsyncStorage.removeItem("idToken");
         setIdToken(null);
         setUserInfo(null);
         setFeatArticles(null);
         setFeatProfessionals(null);
         setProfessionalsTags(null);
         setArticlesTags(null);
         await deauthenticate();
      } catch (error) {
         setErrorMessage(error?.response?.data?.error || null);
         setErrorDialog(true);
      }
   };

   useEffect(() => {
      (async () => {
         if (authenticated) {
            try {
               setLoading(true);

               const newIdToken = await refreshTokenIfExpired(idToken);
               if (idToken !== newIdToken) {
                  setIdToken(newIdToken);
               }

               setUserInfo(await getUserInfo(getUserId(newIdToken), newIdToken));
               setFeatProfessionals(await getFeatProfessionals(newIdToken));
               setFeatArticles(await getFeatArticles(newIdToken));
               setProfessionalsTags(await getProfessionalsTags(newIdToken));
               setArticlesTags(await getArticlesTags(newIdToken));
            } catch (error) {
               setLoading(false);
               setErrorMessage(error?.response?.data?.error || null);
               setErrorDialog(true);
               await logout();
            }
         }
      })();
   }, []);

   useEffect(() => {
      if (
         userInfo &&
         featProfessionals &&
         featArticles &&
         professionalsTags &&
         loading
      ) {
         setLoading(false);
      }
   }, [userInfo, featProfessionals, featArticles, professionalsTags]);

   if (loading) {
      return <LoadingPortal loadingMessage={"Fetching data..."} />;
   }

   if (
      !authenticated ||
      !userInfo ||
      !featProfessionals ||
      !featArticles ||
      !professionalsTags
   ) {
      return (
         <ScrollView contentContainerStyle={[common.bgwhite, common.grow]}>
            <Dialog visible={errorDialog} style={[common.bgwhite, common.radlg]}>
               <Dialog.Title>Sorry, an error occurred.</Dialog.Title>
               <Dialog.Content>
                  {errorMessage ? (
                     <Text variant="bodyMedium">{errorMessage}</Text>
                  ) : (
                     <Text variant="bodyMedium">
                        An unexpected error has occurred, unable to continue.
                     </Text>
                  )}
               </Dialog.Content>
               <Dialog.Actions>
                  <Button
                     onPress={() => setAuthenticated(false)}
                     icon={({ size, color }) => (
                        <MaterialCommunityIcons
                           name="arrow-left"
                           size={size}
                           color={color}
                        />
                     )}
                  >
                     Return to Login
                  </Button>
               </Dialog.Actions>
            </Dialog>
         </ScrollView>
      );
   }

   return (
      <>
         <Tab.Navigator
            barStyle={[
               common.bgpurple,
               { borderTopWidth: 1, borderTopColor: "#E7E3F1" },
            ]}
         >
            <Tab.Screen
               name="HomeTab"
               component={HomeTab}
               options={{
                  tabBarLabel: "Home",
                  tabBarIcon: ({ }) => (
                     <MaterialCommunityIcons
                        name="home-roof"
                        color="#7844ac"
                        size={26}
                     />
                  ),
               }}
               listeners={({ navigation }) => ({
                  tabPress: (e) => {
                     e.preventDefault();
                     navigation.reset({
                        index: 0,
                        routes: [{ name: "HomeTab" }],
                     });
                  },
               })}
            />
            <Tab.Screen
               name="ProfessionalsTab"
               component={ProfessionalsTab}
               options={{
                  tabBarLabel: "Professionals",
                  tabBarIcon: ({ color }) => (
                     <MaterialCommunityIcons
                        name="account-search-outline"
                        color="#7844ac"
                        size={26}
                     />
                  ),
               }}
               listeners={({ navigation }) => ({
                  tabPress: (e) => {
                     e.preventDefault();
                     navigation.reset({
                        index: 0,
                        routes: [{ name: "ProfessionalsTab" }],
                     });
                  },
               })}
            />
            <Tab.Screen
               name="ArticlesTab"
               component={ArticlesTab}
               options={{
                  tabBarLabel: "Articles",
                  tabBarIcon: ({ }) => (
                     <MaterialCommunityIcons
                        name="glasses"
                        color="#7844ac"
                        size={26}
                     />
                  ),
               }}
               listeners={({ navigation }) => ({
                  tabPress: (e) => {
                     e.preventDefault();
                     navigation.reset({
                        index: 0,
                        routes: [{ name: "ArticlesTab" }],
                     });
                  },
               })}
            />
         </Tab.Navigator>
      </>
   );
};

export default DashboardNavigator;
