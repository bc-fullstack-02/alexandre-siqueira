import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { House, User, UsersThree } from "phosphor-react-native"

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

import {
  Provider as AuthProvider,
  Context as AuthContext,
} from "./src/context/AuthContext";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Loading } from "./src/components/Loading";
import { Login } from "./src/Screen/Login";
import { SingUp } from "./src/Screen/SingUp";
import { Home } from "./src/Screen/Home";
import { Profile } from "./src/Screen/Profile";
import { Friends } from "./src/Screen/Friends";

import { THEME } from "./src/theme";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: THEME.COLORS.BACKGROUND_900,
  },
  statusBarStyle: "dark",
  title: false,
};

function App() {
  const { token } = useContext(AuthContext);

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
        <NavigationContainer theme={MyTheme}>
          {!token ? (
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                statusBarStyle: "dark"
              }}
            >
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SingUp" component={SingUp} />
            </Stack.Navigator>
          ) : (
            <Tab.Navigator
              screenOptions={({route}) => ({
                tabBarIcon: ({color, size}) => {
                  switch (route.name){
                    case "Home":
                      return (
                        <House size={size} color={color} />
                      )
                    case "Friends":
                      return (
                        <UsersThree size={size} color={color} />
                      )
                    case "Profile":
                      return (
                        <User size={size} color={color} />
                      )
                  }
                },
                tabBarStyle: {backgroundColor: THEME.COLORS.BACKGROUND_900},
                tabBarShowLabel: false,
                headerShown: false,
              })}
            >
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
  );
};
