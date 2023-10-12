import { useAuth } from '../contexts/auth';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput, Avatar, IconButton } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Singup = ({ navigation }) => {
   const { setIsUserAuthenticated } = useAuth();

   const handleSignup = () => {
      setIsUserAuthenticated(true);
   }

   return (
      <ScrollView contentContainerStyle={styles.container}>
         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconButton
               icon="arrow-left"
               size={24}
               onPress={() => navigation.navigate('Login')}
               style={{ marginLeft: 0, marginTop: 0 }}
            />
         </View>
         <View style={styles.content}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
               <Avatar.Image
                  size={100}
                  source={require('../assets/15383.png')}
               />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
               <Text variant="headlineSmall">Welcome!</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
               <Text variant="bodyMedium">Create your account to continue</Text>
            </View>
            <View style={{ marginTop: 30 }}>
               <TextInput
                  label="Full Name"
                  left={<TextInput.Icon icon={'account-outline'} size={24} />}
                  underlineColor="transparent"
                  underlineColorAndroid="transparent"
               />
               <TextInput
                  label="Phone number"
                  left={<TextInput.Icon icon={'phone-outline'} size={24} />}
                  underlineColor="transparent"
                  underlineColorAndroid="transparent"
                  style={{ marginTop: 10 }}
               />
               <TextInput
                  label="Email"
                  left={<TextInput.Icon icon={'email-outline'} size={24} />}
                  underlineColor="transparent"
                  underlineColorAndroid="transparent"
                  style={{ marginTop: 10 }}
               />
               <TextInput
                  label="Password"
                  secureTextEntry={true}
                  left={<TextInput.Icon icon={'lock-outline'} size={24} />}
                  underlineColor="transparent"
                  underlineColorAndroid="transparent"
                  style={{ marginTop: 10 }}
               />
               <TextInput
                  label="Confirm password"
                  secureTextEntry={true}
                  left={<TextInput.Icon icon={'lock-outline'} size={24} />}
                  underlineColor="transparent"
                  underlineColorAndroid="transparent"
                  style={{ marginTop: 10 }}
               />
            </View>
            <Button
               icon={({ size, color }) => (
                  <MaterialIcons name="arrow-forward" size={size} color={color} />)}
               mode="contained"
               style={{ marginTop: 20 }}
               onPress={handleSignup}>
               Sign up
            </Button>
         </View>
         <View style={styles.footer}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
               <Text variant="bodyMedium">Already have an account? </Text>
               <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Login')}>
                  <Text variant="bodyMedium" style={{ color: '#7844ac', fontWeight: 'bold' }}>Login</Text>
               </TouchableOpacity>
            </View>
         </View>
      </ScrollView >
   )
}

export default Singup

const styles = StyleSheet.create({
   container: {
      flexGrow: 1,
      padding: 15,
      backgroundColor: "#faf8fe",
   },
   content: {
      flex: 1,
      justifyContent: 'center',
   },
   lightPurpleBackground: {
      backgroundColor: "#faf8fe",
   },
   footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
   },
})