import CadastroScreen from "../screens/CadastroScreen";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import VirtualRealityScreen from "../screens/VirtualRealityScreen";
type AuthRoutes = {
  cadastroScreen: undefined;
  virtualRealityScreen: undefined;

};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="cadastroScreen" component={CadastroScreen} />

      <Screen name="virtualRealityScreen" component={VirtualRealityScreen} />

    </Navigator>
  );
}
