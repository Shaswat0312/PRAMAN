import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Consumer from './screens/Consumer';
import Header from './Components/Header';
import Contributor from './screens/Contributor';
import Journey from './screens/Journey'; // Import the new Journey screen

// (1) Define types for screen params
export type RootStackParamList = {
  Home: undefined;
  Consumer: { userId: string };
  Contributor: { userId: string };
  Journey: undefined;
  Feed: { sort: 'latest' | 'top' } | undefined;
};

// (2) Create navigator with types
const Stack = createNativeStackNavigator<RootStackParamList>();

// Dummy Feed screen (until you create one in ./screens/Feed.tsx)
function Feed() {
  return null; // placeholder
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Home Screen */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            header: () => <Header navigation={navigation} />,
          })}
        />

        {/* Consumer Screen */}
        <Stack.Screen
          name="Consumer"
          component={Consumer}
          options={({ navigation }) => ({
            header: () => <Header navigation={navigation} />,
          })}
        />

        <Stack.Screen
          name="Contributor"
          component={Contributor}
          options={({ navigation }) => ({
            header: () => <Header navigation={navigation} />,
          })}
        />

        {/* Feed Screen */}
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={({ navigation }) => ({
            header: () => <Header navigation={navigation} />,
          })}
        />

        {/* Journey Screen */}
        <Stack.Screen
          name="Journey"
          component={Journey}
          options={({ navigation }) => ({
            header: () => <Header navigation={navigation} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;