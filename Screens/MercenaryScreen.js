import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, Button, TouchableOpacity } from 'react-native';
import mercenaries from '../GameData/mercenaries';
import MercenaryItem from '../Components/MercenaryItem';
import NeonTextSelect from '../Components/NeonTextSelect';

const MercenaryScreen = ({ route, navigation }) => {
  const { playerNames, mission } = route.params;
  const [selectedMercenaries, setSelectedMercenaries] = useState({});
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const moveAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setSelectedMercenaries(playerNames.reduce((acc, name, index) => ({ ...acc, [index]: null }), {}));
  }, [playerNames]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnimation, {
          toValue: 1,
          duration: 10000,
          useNativeDriver: true,
        }),
        Animated.timing(moveAnimation, {
          toValue: 0,
          duration: 10000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [moveAnimation]);

  const movingMargin = moveAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 50], 
  });

  const handleMercenarySelect = (mercenary) => {
      setSelectedMercenaries(prev => ({
        ...prev,
        [currentPlayerIndex]: mercenary.name
      }));
      setCurrentPlayerIndex((currentPlayerIndex + 1) % playerNames.length);
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/mercenaries-background.jpg')}
        style={[
          styles.backgroundImage,
          {
            transform: [
              {
                translateX: movingMargin,
              },
            ],
          },
        ]}
        resizeMode="cover"
      />
      <Text>Players:</Text>
      {playerNames.map((name, index) => (
        <Text key={index} style={styles.playerName}>
          Player {index + 1}: {selectedMercenaries[index] ? selectedMercenaries[index] : 'Not selected'}
        </Text>
      ))}
      <Text>Mission: {mission.name}</Text>
      <Text>Objective: {mission.objective}</Text>
      <Text style={styles.playerName}>Current Player: Player {currentPlayerIndex + 1}, {playerNames[currentPlayerIndex]}</Text>
      <NeonTextSelect>Choose your Mercenary:</NeonTextSelect>
      <FlatList
        data={mercenaries}
        renderItem={({ item }) => {
          const isDisabled = Object.values(selectedMercenaries).includes(item.name);
          return (
          <MercenaryItem 
            mercenary={item} 
            onMercenarySelect={() => handleMercenarySelect(item)}
            isDisabled={isDisabled}
          />
          )
        }}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
      <TouchableOpacity
        style={[styles.startButton, playerNames.includes('') ? styles.buttonDisabled : null]}
        onPress={() => navigation.navigate('MissionIntro', { playerNames, mission })}
        disabled={playerNames.includes('')}>
        <Text style={styles.startButtonText}>Start Mission</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute', 
    width: '150%', 
    height: '100%', 
    top: 0,
    left: '-20%',
    right: 0,
    bottom: 0,
    zIndex: -1, 
  },
  title: {
    color: '#0f0', 
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  mercenaryItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 200,
  },
  playerName: {
    color: 'white',
    fontSize: 20,
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

export default MercenaryScreen;
