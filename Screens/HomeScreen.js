import React, { useState, useEffect } from 'react';
import { TouchableOpacity, TextInput, StyleSheet, Text, ScrollView, View, ActivityIndicator, ImageBackground } from 'react-native';
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
      <ImageBackground
        key={index}
        source={require('../assets/Loading-bar.png')}
        style={styles.inputBackground}
        resizeMode="cover"
        >
        <Text style={styles.playerIndicator}>{`P ${index + 1}`}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleNameChange(text, index)}
          value={playerNames[index]}
          placeholder={`Player ${index + 1} Name`}
        />
      </ImageBackground>
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
                <NeonText style={styles.mainTitle}>IPERION</NeonText>
                <View style={styles.pickerContainer}>
                  <Text style={styles.selectText}>Select the number of players:</Text>
                  <View style={styles.playerButtonContainer}>
                    <TouchableOpacity
                      style={styles.numPlayersButton}
                      onPress={() => handlePlayerCountChange('2')}
                    >
                      <Text style={styles.numPlayersText}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.numPlayersButton}
                      onPress={() => handlePlayerCountChange('3')}
                    >
                      <Text style={styles.numPlayersText}>3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.numPlayersButton}
                      onPress={() => handlePlayerCountChange('4')}
                    >
                      <Text style={styles.numPlayersText}>4</Text>
                    </TouchableOpacity>
                  </View>

                  {/* <RNPickerSelect
                    onValueChange={handlePlayerCountChange}
                    items={[
                      { label: '2', value: '2' },
                      { label: '3', value: '3' },
                      { label: '4', value: '4' },
                    ]}
                    style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                    placeholder={{ label: '0', value: null }}
                  /> */}
                </View>
                <View style={styles.inputsContainer}>
                  {renderNameInputs()}
                </View>
              </View>
            )}
            </ScrollView>
            <TouchableOpacity
              style={[styles.startButton, !playerCount || playerNames.includes('') ? styles.buttonDisabled : null]}
              onPress={() => navigation.navigate('Mission', { playerNames })}
              disabled={!playerCount || playerNames.includes('')}
            >
              <Text style={styles.startButtonText}>Start Mission</Text>
            </TouchableOpacity>
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
    borderRadius: 10,
    padding: 20,
    width: '100%',
    height: '100%', 
  },
  selectText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Orbitron_400Regular',
  },
  pickerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  numPlayersButton: {
    backgroundColor: '#39FF14',
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
  },
  numPlayersText: {
    fontFamily: 'Orbitron_900Black',
    color: 'white',
    fontSize: 16,
  },
  inputsContainer: {
    width: '100%',
  },
  inputBackground: {
    height: 60, // Make sure this matches or is a bit larger than your TextInput height
    width: '100%', // Adjust according to your layout needs
    justifyContent: 'space-between',
    marginBottom: 10, // Adds space between each input
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  playerIndicator: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    fontFamily: 'Orbitron_900Black',
    textAlign: 'right',
  },
  input: {
    fontFamily: 'Orbitron_400Regular',
    color: 'white', 
    textAlign: 'center',
    width: '84%',
    height: 55,
    paddingRight: 40,
  },
  startButton: {
    backgroundColor: '#39FF14',
    opacity: 0.8,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
    height: 50, // Set a fixed heigh
    marginBottom: 20,
    width: '80%',
    alignSelf: 'center',
  },
  startButtonText: {
    fontFamily: 'Orbitron_900Black',
    color: 'white',
    fontSize: 16, // Adjust text size as needed
  },
  buttonDisabled: {
    backgroundColor: '#ccc'
  },
});

// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: 16,
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 4,
//     color: 'white',
//     marginBottom: 20,
//     textAlign: 'center',
//     width: 50,
//   },
//   inputAndroid: {
//     fontSize: 16,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderWidth: 0.5,
//     borderColor: 'purple',
//     borderRadius: 8,
//     color: 'white',
//     marginBottom: 20,
//     textAlign: 'center',
//     width: 50,
//   },
// });

export default HomeScreen;
