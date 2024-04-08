import React, { useState } from 'react';
import { Button, TextInput, StyleSheet, Text, ScrollView, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Video } from 'expo-av';
import BackgroundImage from '../assets/background-main.mp4'; // Ensure this is the correct import path

const HomeScreen = ({ navigation }) => {
  const [playerCount, setPlayerCount] = useState(null);
  const [playerNames, setPlayerNames] = useState([]);

  // Adjusted handlePlayerCountChange to ensure state updates correctly
  const handlePlayerCountChange = (value) => {
    setPlayerCount(value);
    setPlayerNames(new Array(parseInt(value || 0)).fill(''));
  };

  const handleNameChange = (text, index) => {
    const newNames = [...playerNames];
    newNames[index] = text;
    setPlayerNames(newNames);
  };

  const renderNameInputs = () => {
    return playerNames.map((_, index) => (
      <TextInput
        key={index}
        style={styles.input}
        onChangeText={(text) => handleNameChange(text, index)}
        value={playerNames[index]}
        placeholder={`Player ${index + 1} Name`}
      />
    ));
  };

  return (
    <View style={styles.fullScreen}>
      <Video
        source={BackgroundImage} 
        style={styles.backgroundVideo}
        isMuted={true}
        shouldPlay={true}
        isLooping
        resizeMode="cover"
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome to the Mission Tracker!</Text>
          <Text style={styles.title}>Select the number of players:</Text>
          <RNPickerSelect
            onValueChange={handlePlayerCountChange}
            items={[
              { label: '2', value: '2' },
              { label: '3', value: '3' },
              { label: '4', value: '4' },
            ]}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false} // Ensure consistent styling across platforms
            placeholder={{ label: 'Select number of players', value: null }}
          />
          {renderNameInputs()}
          <Button
            title="Start Mission"
            onPress={() => navigation.navigate('Mission', { playerNames })}
            disabled={!playerCount || playerNames.includes('')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  backgroundVideo: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay for content visibility
    padding: 20,
  },
  input: {
    backgroundColor: 'black',
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
  },
  title: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'white',
    paddingRight: 30, 
    marginBottom: 20,
    textAlign: 'center',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'white',
    paddingRight: 30,
    marginBottom: 20,
    textAlign: 'center',
    width: 250,
  },
});

export default HomeScreen;
