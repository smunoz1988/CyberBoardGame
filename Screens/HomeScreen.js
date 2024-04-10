import React, { useState, useEffect } from 'react';
import { Button, TextInput, StyleSheet, Text, ScrollView, View, ActivityIndicator } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Video } from 'expo-av';
import BackgroundImage from '../assets/background-main.mp4'; 
import NeonText from '../Components/NeonText';

const HomeScreen = ({ navigation }) => {
  const [playerCount, setPlayerCount] = useState(null);
  const [playerNames, setPlayerNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
          {isLoading ? (
            <View>
              <ActivityIndicator size="large" color="white" />
              <Text style={styles.title}>Loading...</Text>
            </View>
          ) : (
            <View style={styles.overlay}>
              <Text style={styles.title}>Welcome to the Mission Tracker!</Text>
              <View style={styles.pickerContainer}>
                <NeonText>Select the number of players:</NeonText>
                <RNPickerSelect
                  onValueChange={handlePlayerCountChange}
                  items={[
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                    { label: '4', value: '4' },
                  ]}
                  style={pickerSelectStyles}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{ label: '0', value: null }}
                />
              </View>
              <View style={styles.inputsContainer}>
                {renderNameInputs()}
              </View>
              <Button
                title="Start Mission"
                onPress={() => navigation.navigate('Mission', { playerNames })}
                disabled={!playerCount || playerNames.includes('')}
              />
            </View>
          )}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    height: '90%',
    justifyContent: 'space-around',   
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputsContainer: {
    height: 300,
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black',
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
    marginBottom: 20,
    textAlign: 'center',
    width: 50,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    width: 50,
  },
});

export default HomeScreen;
