import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity, TextInput, StyleSheet, Text, View, ActivityIndicator, ImageBackground,
  ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
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
    const numPlayers = parseInt(value || 0);
    if (numPlayers < playerNames.length) {
      setPlayerNames(playerNames.slice(0, numPlayers));
    } else {
      setPlayerNames([...playerNames, ...new Array(numPlayers - playerNames.length).fill('')]);
    }
    setPlayerCount(value);
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
    <KeyboardAvoidingView 
      style={styles.fullScreen} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <Video
        source={BackgroundImage}
        style={styles.backgroundVideo}
        isMuted={true}
        shouldPlay={true}
        isLooping
        resizeMode="cover"
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.contentContainer, {paddingBottom: 5}]} // Adjusted for scroll padding
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <View style={styles.overlay}>
            <NeonText>CYBERION</NeonText>
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
    </KeyboardAvoidingView>
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
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {  
    borderRadius: 10,
    padding: 20,
    width: '100%',
  },
  selectText: {
    color: 'white',
    fontSize: 18,
    marginVertical: 40,
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
    marginHorizontal: 40,
    marginBottom: 40,
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
    width: '80%',
    alignSelf: 'center',
  },
  inputBackground: {
    height: 60, 
    width: '100%', 
    justifyContent: 'space-between',
    marginBottom: 10,
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
    marginTop: 20,
    marginBottom: 50,
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

export default HomeScreen;
