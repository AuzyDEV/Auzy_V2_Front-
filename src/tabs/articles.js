import { createStackNavigator } from "@react-navigation/stack";

import ArticlesScreen from "../screens/articles";
import SettingsScreen from "../screens/settings";
import ArticleSingleScreen from "../screens/article-single";
import NavigationBar from "../components/navigation-bar";
import UserInformationScreen from "../screens/user-infomation";
import ChangePasswordScreen from "../screens/change-password";
import TermsAndConditionsScreen from "../screens/terms-and-conditions";

const ArticlesTab = () => {
   const Stack = createStackNavigator();

   return (
      <Stack.Navigator
         initialRouteName="Home"
         screenOptions={{
            header: (props) => <NavigationBar {...props} />,
         }}
      >
         <Stack.Screen name="Articles" component={ArticlesScreen} />
         <Stack.Screen name="Settings" component={SettingsScreen} />
         <Stack.Screen name="User Information" component={UserInformationScreen} />
         <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
         <Stack.Screen
            name="Terms and Conditions"
            component={TermsAndConditionsScreen}
         />
         <Stack.Screen name="Article" component={ArticleSingleScreen} />
      </Stack.Navigator>
   );
};

export default ArticlesTab;