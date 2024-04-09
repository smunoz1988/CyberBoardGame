import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import MissionScreen from './Screens/MissionScreen';
import MercenaryScreen from './Screens/MercenaryScreen';
import { useFonts, Orbitron_400Regular, Orbitron_900Black } from '@expo-google-fonts/orbitron';

const Stack = createNativeStackNavigator();

function App() {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
