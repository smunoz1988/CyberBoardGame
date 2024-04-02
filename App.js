import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import MissionScreen from './Screens/MissionScreen';

const Stack = createNativeStackNavigator();

function App() {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
