import { StatusBar } from 'react-native';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthenticationProvider } from './src/contexts/authentication';
import { ContentProvider } from './src/contexts/content';
import RootNavigator from './src/navigators/root';
import theme from './src/styles/theme';

export default function App() {
   return (
      <Provider>
         <PaperProvider theme={theme}>
            <AuthenticationProvider>
               <ContentProvider>
                  <NavigationContainer>
                     <RootNavigator />
                  </NavigationContainer>
               </ContentProvider>
            </AuthenticationProvider>
            <StatusBar backgroundColor="#faf8fe" barStyle="dark-content" />
         </PaperProvider>
      </Provider >
   );
}


