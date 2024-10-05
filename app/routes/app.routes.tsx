import HeartScreen from "../screens/HeartScreen";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import VirtualRealityScreen from "../screens/VirtualRealityScreen";

type AppRoutes = {
  heartScreen: undefined;
  virtualRealityScreen: undefined;
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="heartScreen" component={HeartScreen} />

      <Screen name="virtualRealityScreen" component={VirtualRealityScreen} />
    </Navigator>
  );
}
