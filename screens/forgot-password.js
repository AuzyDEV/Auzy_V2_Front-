import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput, Avatar, IconButton, Dialog } from 'react-native-paper';
import { useState } from 'react';

const ForgotPassword = ({ navigation }) => {

   const [showEmailDialog, setShowEmailDialog] = useState(false);

   const hideEmailDialog = () => setShowEmailDialog(false);

   const handleResetPassword = () => {
      setShowEmailDialog(true)
   }

   const handleSignup = () => {
      navigation.navigate('Signup');
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
                  source={require('../assets/90114.png')}
               />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
               <Text variant="headlineSmall">Forgot password?</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
               <Text variant="bodyMedium">Type your e-mail to reset your password</Text>
            </View>
            <View style={{ marginTop: 30 }}>
               <TextInput
                  label="Email"
                  left={<TextInput.Icon icon={'email-outline'} size={24} />}
                  underlineColor="transparent"
                  underlineColorAndroid="transparent"
                  style={{ marginTop: 10 }}
               />
            </View>
            <Button mode="contained"
               style={{ marginTop: 20 }}
               onPress={handleResetPassword}>
               Reset password
            </Button>
         </View>
         <View style={styles.footer}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
               <Text variant="bodyMedium">Don't have an account? </Text>
               <TouchableOpacity activeOpacity={0.8} onPress={handleSignup}>
                  <Text variant="bodyMedium" style={{ color: '#7844ac', fontWeight: 'bold' }}>Sign up</Text>
               </TouchableOpacity>
            </View>
         </View>
         <Dialog visible={showEmailDialog} onDismiss={hideEmailDialog} style={{ backgroundColor: "#fff" }}>
            <Dialog.Title>Reset email has been successfully sent.</Dialog.Title>
            <Dialog.Content>
               <Text variant="bodyMedium">An email containing instructions for resetting your password has been sent. Kindly review your email inbox for further details.</Text>
               <Text variant="bodyMedium" style={{ marginTop: 10 }}>If you have not received the email to reset your password, please do not hesitate to reach out to us at support@auzy.help. We are here to assist you.</Text>
            </Dialog.Content>
         </Dialog>
      </ScrollView >
   )
}

export default ForgotPassword

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