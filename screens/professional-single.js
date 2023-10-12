import * as React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, Text, Snackbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Clipboard from 'expo-clipboard';

const Professional = ({ route }) => {
   const [visible, setVisible] = React.useState(false);

   const copyToClipboard = async (text) => {
      await Clipboard.setStringAsync(text);
      setVisible(true);
      setTimeout(() => {
         setVisible(false);
      }, 2000);
   };

   return (
      <View style={{ flex: 1 }}>
         <ScrollView style={styles.lightPurpleBackground}>
            <View style={styles.container}>
               <View style={styles.avatarContainer}>
                  <Avatar.Image size={152} source={{ uri: route.params.avatarURL }} />
                  <View style={styles.avatarText}>
                     <Text variant="headlineSmall">{route.params.title}</Text>
                     <Text variant="bodyMedium">{route.params.speciality}</Text>
                  </View>
               </View>
               <View style={styles.separator} />
               <View style={styles.topMargin}>
                  <Text variant="titleMedium">Biography</Text>
                  <Text variant="bodyMedium" style={styles.smalltopMargin}>
                     {route.params.description}
                  </Text>
               </View>
               <View style={styles.topMargin}>
                  <Text variant="titleMedium">Contact</Text>
                  <View style={styles.smalltopMargin}>
                     <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => copyToClipboard(route.params.email)}>
                        <View style={styles.iconRow}>
                           <MaterialCommunityIcons
                              name="email-outline"
                              size={24} />
                           <Text style={styles.text}>{route.params.email}</Text>
                        </View>
                     </TouchableOpacity>
                     <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => copyToClipboard(route.params.phone)}>
                        <View style={styles.iconRow}>
                           <MaterialCommunityIcons
                              name="phone-outline"
                              size={24} />
                           <Text style={styles.text}>{route.params.phone}</Text>
                        </View>
                     </TouchableOpacity>
                     <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => copyToClipboard(route.params.address)}>
                        <View style={styles.iconRow}>
                           <MaterialIcons
                              name="location-searching"
                              size={24} />
                           <Text style={styles.text}>{route.params.address}</Text>
                        </View>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         </ScrollView>
         <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            style={styles.snackbar}>
            <View style={styles.snackbarContent}>
               <MaterialCommunityIcons name="content-copy" size={24} color="#fff" />
               <Text style={styles.snackbarText}>Text copied to the clipboard.</Text>
            </View>
         </Snackbar>
      </View>
   );
}

export default Professional;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 15,
   },
   avatarContainer: {
      alignItems: 'center',
   },
   lightPurpleBackground: {
      backgroundColor: "#faf8fe"
   },
   avatarText: {
      marginTop: 10,
      alignItems: 'center'
   },
   topMargin: {
      marginTop: 20
   },
   smalltopMargin: {
      marginTop: 10
   },
   separator: {
      marginTop: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#E7E3F1',
   },
   iconRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
      backgroundColor: '#f3f0fa',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      padding: 15
   },
   text: {
      marginRight: 20,
      marginLeft: 15,
   },
   snackbarContent: {
      flexDirection: 'row',
   },
   snackbarText: {
      marginLeft: 15,
      color: '#fff'
   }
});