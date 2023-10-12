import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, View } from 'react-native';

const PickerWithIcon = ({ icon, data, isCommunity, onValueChange }) => {
   const [selectedValue, setSelectedValue] = useState('option1');

   const handlePickerChange = (value) => {
      setSelectedValue(value);
      onValueChange(value);
   };

   return (
      <View style={styles.pickerContainer}>
         {isCommunity ? (
            <MaterialCommunityIcons
               name={icon}
               size={24}
               color="#1c1c1c"
               style={styles.pickerIcon} />
         ) : (
            <MaterialIcons
               name={icon}
               size={24}
               color="#1c1c1c"
               style={styles.pickerIcon} />
         )}
         <View style={{ flex: 1 }}>
            <Picker
               selectedValue={selectedValue}
               onValueChange={handlePickerChange}>
               {data.map((item) => (
                  <Picker.Item
                     key={item.value}
                     label={item.label}
                     value={item.value}
                     color='#1c1c1c'
                  />
               ))}
            </Picker>
         </View>
      </View>
   );
};

export default PickerWithIcon;

const styles = StyleSheet.create({
   pickerContainer: {
      backgroundColor: '#f3f0fa',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
   },
   pickerIcon: {
      marginLeft: 15
   }
});
