import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

import {
  Provider as AuthProvider,
  Context as AuthContext
} from "./src/context/AuthContext"

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Loading } from "./src/components/Loading";
import { Login } from "./src/Screen/Login";
import { SingUp } from "./src/Screen/SingUp";
import { Home } from "./src/Screen/Home";
import { Profile } from "./src/Screen/Profile";
import { Friends } from "./src/Screen/Friends";


import { THEME } from "./src/theme";

function App() {

  const { token } = useContext(AuthContext)

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaProvider>
      {fontsLoaded ? (
        <NavigationContainer>
        {!token ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: THEME.COLORS.BACKGROUND_900,
                flex: 1,
              },
              statusBarColor: THEME.COLORS.BACKGROUND_900,
              statusBarStyle: "light",
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SingUp" component={SingUp} />
          </Stack.Navigator>
        ) : (
          <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Friends" component={Friends} />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
        )}
        </NavigationContainer>  
      ) : (
        <Loading />
      )}
    </SafeAreaProvider>
  );
}

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}