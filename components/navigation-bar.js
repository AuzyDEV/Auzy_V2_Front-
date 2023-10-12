import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { StyleSheet } from 'react-native';

const NavigationBar = ({ navigation, route, options, back }) => {
   const title = getHeaderTitle(options, route.name);

   return (
      <Appbar.Header style={styles.appBar} >
         {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
         <Appbar.Content title={title} titleStyle={styles.appBarTitle} />
         <Appbar.Action
            icon="account-settings-outline"
            color='#7844ac'
            size={26}
            onPress={() => { navigation.navigate('Settings') }}
         />
      </Appbar.Header>
   );
}

const styles = StyleSheet.create({
   appBar: {
      backgroundColor: "#faf8fe",
      borderBottomWidth: 1,
      borderBottomColor: '#E7E3F1'
   },
   appBarTitle: {
      color: '#7844ac',
      fontSize: 18
   }
});

export default NavigationBar;