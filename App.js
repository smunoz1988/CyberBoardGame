import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import MissionScreen from './Screens/MissionScreen';
import MercenaryScreen from './Screens/MercenaryScreen';
import MissionIntro from './Screens/MissionIntro';
import { useFonts, Orbitron_400Regular, Orbitron_900Black } from '@expo-google-fonts/orbitron';

const Stack = createNativeStackNavigator();

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
      <Stack.Navigator>
        <Stack.Screen 
        name="CyberBoardGame" 
        component={HomeScreen} 
        options={{
          headerTitleAlign: 'center',
        }}
        />
        <Stack.Screen name="Mission" component={MissionScreen} />
        <Stack.Screen name="Mercenary" component={MercenaryScreen} />
        <Stack.Screen name="MissionIntro" component={MissionIntro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
