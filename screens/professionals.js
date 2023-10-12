import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput, Button, Text } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavigationBar from '../components/navigation-bar';
import Settings from './settings';
import Professional from './professional-single';
import PickerWithIcon from '../components/picker-with-icon';
import SmallCard from '../components/small-card';

const Stack = createStackNavigator();

const Current = ({ navigation }) => {
   const [selectedLocation, setSelectedLocation] = useState('');
   const [selectedTag, setSelectedTag] = useState('');

   const tagData = [
      { id: '1', value: 'psychiatrist', label: 'Psychiatrist' },
      { id: '2', value: 'neurologist', label: 'Neurologist' },
      { id: '3', value: 'psychologist', label: 'Psychologist' },
   ];

   const locationData = [
      { id: '1', value: 'sousse', label: 'Sousse' },
      { id: '2', value: 'nabeul', label: 'Nabeul' },
      { id: '3', value: 'tunis', label: 'Tunis' },
   ];

   const handleTagValueChange = (value) => {
      setSelectedTag(value);
   };

   const handleLocationValueChange = (value) => {
      setSelectedLocation(value);
   };

   const professionals = require('../json/professionals.json');

   const professionalCard = ({ item }) => (
      <View style={{ marginBottom: 15 }}>
         <SmallCard
            item={item}
            onPress={() => navigation.navigate('Professional', item)}
         />
      </View>
   );

   return (
      <FlatList
         data={professionals}
         keyExtractor={(item) => item.id}
         ListHeaderComponent={
            <View >
               <TextInput
                  label="Name"
                  left={<TextInput.Icon icon={'account-search-outline'} size={24} />}
                  underlineColor="transparent"
                  underlineColorAndroid="transparent"
               />
               <View style={{ marginTop: 10 }}>
                  <PickerWithIcon
                     icon='tag-outline'
                     isCommunity={true}
                     data={tagData}
                     onValueChange={handleTagValueChange}
                  />
               </View>
               <View style={{ marginTop: 10 }}>
                  <PickerWithIcon
                     icon='location-searching'
                     isCommunity={false}
                     data={locationData}
                     onValueChange={handleLocationValueChange}
                  />
               </View>
               <Button
                  icon={({ size, color }) => (
                     <MaterialIcons name="search" size={size} color={color} />
                  )}
                  mode="contained"
                  style={{ marginTop: 10 }}>
                  Search
               </Button>

               <Text variant="titleMedium" style={{ marginTop: 20, marginBottom: 15 }}>
                  Featured Professionals
               </Text>
            </View>
         }
         renderItem={professionalCard}
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={{
            padding: 15,
            backgroundColor: "#faf8fe",
         }}
      />
   );
};

const Professionals = () => {
   return (
      <Stack.Navigator
         initialRouteName="Home"
         screenOptions={{
            header: (props) => <NavigationBar {...props} />,
         }}
      >
         <Stack.Screen name="Professionals" component={Current} />
         <Stack.Screen name="Settings" component={Settings} />
         <Stack.Screen name="Professional" component={Professional} />
      </Stack.Navigator>
   );
};

export default Professionals;
