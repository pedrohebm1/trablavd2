import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import Cadastro from "../pages/Cadastro";
import Listagem from "../pages/Listagem";

const { Navigator, Screen } = createBottomTabNavigator();

type AppRoutes = {
  dashboard: undefined;
  dashboardList: undefined;
};

export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>;

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "purble",
      }}
    >
      <Screen
        name="Cadastro"
        component={Cadastro}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="add" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Listagem"
        component={Listagem}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="list" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
