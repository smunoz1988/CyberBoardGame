import React, { useEffect } from 'react';
import { View, Text, BackHandler, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import MissionScreen from './Screens/MissionScreen';
import MercenaryScreen from './Screens/MercenaryScreen';
import MissionIntroWrapper from './Components/MissionIntroWrapper';
import { useFonts, Orbitron_400Regular, Orbitron_900Black } from '@expo-google-fonts/orbitron';

const Stack = createNativeStackNavigator();

const disableGesturesConfig = {
  gestureEnabled: false,
  headerLeft: () => null, // This removes the back button in the header if any
};

const App = () => {
  let [fontsLoaded] = useFonts({
    Orbitron_400Regular,
    Orbitron_900Black,
  });

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CyberBoardGame" component={HomeScreen} />
        <Stack.Screen name="Mission" component={MissionScreen} />
        <Stack.Screen name="Mercenary" component={MercenaryScreen} />
        <Stack.Screen name="MissionIntro" component={MissionIntroWrapper} options={disableGesturesConfig} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
