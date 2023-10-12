import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, Chip } from 'react-native-paper';
import NavigationBar from '../components/navigation-bar';
import Settings from './settings';
import Article from './article-single';
import LargeCard from '../components/large-card';

const Stack = createStackNavigator();

const Current = ({ navigation }) => {
   const articles = require('../json/articles.json');

   const articleCard = ({ item }) => (
      <View style={{ marginBottom: 15, width: Dimensions.get('window').width - 30 }}>
         <LargeCard
            item={item}
            onPress={() => navigation.navigate('Article', item)}
         />
      </View>
   );

   const tagsData = [
      { "id": "1", "tag": "Psychology" },
      { "id": "2", "tag": "Education" },
      { "id": "3", "tag": "Well being" },
      { "id": "4", "tag": "Autism" },
      { "id": "5", "tag": "Childhood" },
   ];

   const tagChip = ({ item }) => (
      <Chip style={{ marginHorizontal: 5, }}>{item.tag}</Chip>
   );

   return (
      <FlatList
         data={articles}
         keyExtractor={(item) => item.id}
         ListHeaderComponent={
            <View >
               <Text variant="titleMedium" style={{ marginBottom: 15 }}>
                  Tags
               </Text>
               <FlatList
                  horizontal
                  data={tagsData}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id}
                  renderItem={tagChip}
               />
               <Text variant="titleMedium" style={{ marginTop: 20, marginBottom: 15 }}>
                  Featured Articles
               </Text>
            </View>
         }
         renderItem={articleCard}
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={{
            padding: 15,
            backgroundColor: "#faf8fe",
         }}
      />
   )
}

const Articles = () => {
   return (
      <Stack.Navigator initialRouteName="Home" screenOptions={{
         header: (props) => <NavigationBar {...props} />
      }} >
         <Stack.Screen name="Articles" component={Current} />
         <Stack.Screen name="Settings" component={Settings} />
         <Stack.Screen name="Article" component={Article} />
      </Stack.Navigator>
   );
}

export default Articles;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 15,
   },
   lightPurpleBackground: {
      backgroundColor: "#faf8fe",
   }
});
