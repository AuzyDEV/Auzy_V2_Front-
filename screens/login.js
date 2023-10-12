import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, TextInput, Avatar } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../contexts/auth';
import { Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Login = ({ navigation }) => {
   const { setIsUserAuthenticated } = useAuth();

   const handleSignIn = () => {
      setIsUserAuthenticated(true);
   }

   const handleSignup = () => {
      navigation.navigate('Signup');
   }

   const handleForgotPassword = () => {
      navigation.navigate('Forgot password');
   }

   return (
      <ScrollView contentContainerStyle={styles.container}>
         <View style={styles.content}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
               <Avatar.Image
                  size={100}
                  source={require('../assets/25212.png')}
               />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
               <Text variant="headlineSmall">Welcome back</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
               <Text variant="bodyMedium">Login to continue</Text>
            </View>
            <View style={{ marginTop: 30 }}>
               <TextInput
                  label="E-mail"
                  left={<TextInput.Icon icon={'email-outline'} size={24} />}
                  underlineColor="transparent"
                  underlineColorAndroid="transparent"
               />
               <TextInput
                  label="Password"
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
               onPress={handleSignIn}>
               Login
            </Button>

            <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
               <TouchableOpacity activeOpacity={0.8} onPress={handleForgotPassword}>
                  <Text variant="bodyMedium">Forgot password?</Text>
               </TouchableOpacity>
            </View>
         </View>
         <View style={styles.footer}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
               <Text variant="bodyMedium">Don't have an account? </Text>
               <TouchableOpacity activeOpacity={0.8} onPress={handleSignup}>
                  <Text variant="bodyMedium" style={{ color: '#7844ac', fontWeight: 'bold' }}>Sign up</Text>
               </TouchableOpacity>
            </View>
         </View>
      </ScrollView>
   )
}

export default Login

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