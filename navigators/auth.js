import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/auth';
import Login from '../screens/login';
import Singup from '../screens/singup';
import ForgotPassword from '../screens/forgot-password';
import MainNavigator from './main';

const Stack = createStackNavigator();

function AuthNavigator() {
   const { isUserAuthenticated } = useAuth();

   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         {isUserAuthenticated ? (
            <Stack.Screen name="App" component={MainNavigator} />
         ) : (
            <Stack.Group>
               <Stack.Screen name="Login" component={Login} />
               <Stack.Screen name="Signup" component={Singup} />
               <Stack.Screen name="Forgot password" component={ForgotPassword} />
            </Stack.Group>
         )}
      </Stack.Navigator>
   );
}

export default AuthNavigator;