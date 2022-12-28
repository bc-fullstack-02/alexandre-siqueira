import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Loading } from './src/components/Loading';
import { Login } from './src/Screen/Login';
import { SingUp } from './src/Screen/SingUp';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { THEME } from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  })

  const Stack = createNativeStackNavigator();

  return (
      <SafeAreaProvider>
        {fontsLoaded ? (
            <NavigationContainer>
              <Stack.Navigator 
                screenOptions={{
                  headerShown: false,
                  contentStyle: { 
                    backgroundColor: THEME.COLORS.BACKGROUND_900,
                    flex: 1,
                  },
                  statusBarColor: THEME.COLORS.BACKGROUND_900,
                  statusBarStyle: "light"      
                }}
              >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SingUp" component={SingUp} />
              </Stack.Navigator>
            </NavigationContainer>            
          ) : ( <Loading /> ) }               
      </SafeAreaProvider>
    );
}
