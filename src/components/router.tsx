import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/home.tsx";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Settings from "../screens/settings.tsx";
import ListFiles from "../screens/listFiles/listFiles.tsx";

function Router(){
  const Tab = createBottomTabNavigator();

  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{title: 'Welcome'}}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{title: 'Settings'}}
        />
        <Tab.Screen
          name="My Files"
          component={ListFiles}
          options={{title: 'My Files'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Router
