import 'react-native-gesture-handler';
import { StyleSheet, View, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavigationBar from '../components/navigation-bar';
import SmallCard from '../components/small-card';
import LargeCard from '../components/large-card';
import Settings from './settings';
import Professional from './professional-single';
import Article from './article-single';

const Stack = createStackNavigator();

const Current = ({ navigation }) => {
   const professionals = require('../json/professionals.json');
   const articles = require('../json/articles.json');

   const professionalCard = ({ item }) => (
      <View style={{ marginRight: 15 }}>
         <SmallCard
            item={item}
            onPress={(item) => navigation.navigate('Professional', item)}
         />
      </View>
   );

   const articleCard = ({ item }) => (
      <View style={{ marginRight: 15, width: Dimensions.get('window').width - 80 }}>
         <LargeCard
            item={item}
            onPress={(item) => navigation.navigate('Article', item)}
         />
      </View>
   );

   return (
      <ScrollView style={styles.lightPurpleBackground}>
         <View style={styles.container}>
            <Text variant="headlineSmall">Welcome Amine,</Text>
            <View style={styles.row}>
               <Text variant="titleMedium">Do you need someone to talk to?</Text>
               <Button
                  icon={({ size, color }) => (
                     <MaterialIcons name="arrow-forward" size={size} color={color} />)}
                  mode="contained"
                  style={styles.topMargin}
                  onPress={() => navigation.navigate('Chat')}>
                  Let's talk
               </Button>
            </View>
            <View style={styles.row} >
               <Text variant="titleMedium">Our Professionals</Text>
               <FlatList
                  horizontal
                  data={professionals}
                  keyExtractor={(item) => item.id}
                  renderItem={professionalCard}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.cardContainer}
               />
            </View>
            <View style={styles.row} >
               <Text variant="titleMedium">Articles</Text>
               <FlatList
                  horizontal
                  data={articles}
                  keyExtractor={(item) => item.id}
                  renderItem={articleCard}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.cardContainer}
               />
            </View>
         </View>
      </ScrollView>
   )
}

const Home = () => {
   return (
      <Stack.Navigator initialRouteName="Home" screenOptions={{
         header: (props) => <NavigationBar {...props} />
      }} >
         <Stack.Screen name="Home" component={Current} />
         <Stack.Screen name="Settings" component={Settings} />
         <Stack.Screen name="Professional" component={Professional} />
         <Stack.Screen name="Article" component={Article} />
      </Stack.Navigator>
   );
}

export default Home;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 15,
   },
   lightPurpleBackground: {
      backgroundColor: "#faf8fe",
   },
   row: {
      marginTop: 25
   },
   topMargin: {
      marginTop: 15
   },
   cardContainer: {
      paddingLeft: 3,
      paddingBottom: 5,
      marginTop: 15
   }
});
