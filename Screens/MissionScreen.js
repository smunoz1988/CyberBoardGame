import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Animated, TouchableOpacity } from 'react-native';
import missions from '../GameData/missions';
import Enemy1Image from '../assets/tech-soldier.png';
import Enemy2Image from '../assets/iron-caveman.png';
// import TemploMap from '../assets/templo-map.png';

function MissionScreen({ route, navigation }) {
  const { playerNames } = route.params;
  const [mission, setMission] = useState(null);
  const moveAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loadMission = () => {
      const selectedMission = missions[Math.floor(Math.random() * missions.length)];
      const selectedObjective = selectedMission.objectives[Math.floor(Math.random() * selectedMission.objectives.length)];

      const enemiesWithImages = selectedObjective.enemies.map(enemy => {
        let image;
        switch (enemy.image) {
          case 'Enemy1Image':
            image = Enemy1Image;
            break;
          case 'Enemy2Image':
            image = Enemy2Image;
            break;
          default:
            image = Enemy1Image;
        }
        return { ...enemy, image };
      });

      setMission({
        ...selectedMission,
        objective: selectedObjective.objective,
        enemies: enemiesWithImages, 
      });
    };

    loadMission();
  }, [route.params]);

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

  return (
    <ScrollView style={styles.container}>
      <Animated.Image
        source={require('../assets/mission-background.jpg')}
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
        {mission && (
          <View style={styles.missionContainer}>
            <Text style={styles.missionTitle}>Mission: {mission.name}</Text>
            <Text style={styles.missionObjective}>Objective: {mission.objective}</Text>
            <Text>Enemies:</Text>
            {mission.enemies.map((enemy, index) => (
              <View key={index} style={styles.enemyContainer}>
                <Text>{enemy.name}</Text>
                <Image source={enemy.image} style={styles.enemyImage} />
                <Text>Quantity: {enemy.quantity}</Text>
                <Text>HP: {enemy.hp} </Text>
              </View>
            ))}
          </View>
        )}
        <Text>Mapa del nivel</Text>
        <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRspkQWM_CO2-MTC0bedTLyMe5z0_6rI_S1g7PdvbY_zQ&s' }} style={styles.level} />
        <TouchableOpacity
          style={[styles.startButton, playerNames.includes('') ? styles.buttonDisabled : null]}
          onPress={() => navigation.navigate('Mercenary', { playerNames, mission })}
          disabled={playerNames.includes('')}>
          <Text style={styles.startButtonText}>Start Mission</Text>
        </TouchableOpacity>
      </ScrollView>
  );
}

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
  playerName: {
    fontSize: 16,
    marginTop: 10,
  },
  missionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  missionTitle: {
    fontSize: 25,
    fontFamily: 'Orbitron_900Black',
    padding: 10,
    color: '#0f0',
    width: '80%',
    textAlign: 'center',
  },
  missionObjective: {
    fontSize: 16,
    fontFamily: 'Orbitron_400Regular',
    color: '#0f0',
    width: '100%',
    textAlign: 'center',
  },
  enemyContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  enemyImage: {
    width: 50,
    height: 50,
    marginTop: 5,
  },
  level: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
    margin: 20,
  },
  startButton: {
    backgroundColor: '#39FF14',
    opacity: 0.8,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
    height: 50, // Set a fixed height
    opacity: 0.8, // You can adjust the opacity for disabled state as needed
    margin: 20,
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

export default MissionScreen;
