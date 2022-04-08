import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ColorPalette from './src/screens/ColorPalette';
import Home from './src/screens/Home';

const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen
          name="ColorPalette"
          component={ColorPalette}
          options={({ route }: any) => ({ title: route.params.paletteName })}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
