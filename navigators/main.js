import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Home from '../screens/home.js';
import Professionals from '../screens/professionals.js';
import Articles from '../screens/articles.js';
import Chat from '../screens/chat.js';

const Tab = createMaterialBottomTabNavigator();

const MainNavigator = () => (
   <Tab.Navigator barStyle={styles.tabBar}>
      <Tab.Screen
         name="HomeTab"
         component={Home}
         options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ }) => (
               <MaterialCommunityIcons name="home-roof" color='#7844ac' size={26} />
            ),
         }}
      />
      <Tab.Screen
         name="ProfessionalsTab"
         component={Professionals}
         options={{
            tabBarLabel: 'Professionals',
            tabBarIcon: ({ color }) => (
               <MaterialIcons name="people-outline" color='#7844ac' size={26} />
            ),
         }}
      />
      <Tab.Screen
         name="ArticlesTab"
         component={Articles}
         options={{
            tabBarLabel: 'Articles',
            tabBarIcon: ({ }) => (
               <MaterialCommunityIcons name="glasses" color='#7844ac' size={26} />
            ),
         }}
      />
      <Tab.Screen
         name="ChatTab"
         component={Chat}
         options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({ }) => (
               <MaterialCommunityIcons name="chat-processing-outline" color='#7844ac' size={26} />
            ),
         }}
      />
   </Tab.Navigator>
);

export default MainNavigator;

const styles = StyleSheet.create({
   tabBar: {
      color: "#faf8fe",
      backgroundColor: "#faf8fe",
      borderTopWidth: 1,
      borderTopColor: '#E7E3F1',
   },
});