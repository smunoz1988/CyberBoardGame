import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button } from 'react-native';
import missions from '../GameData/missions';
import Enemy1Image from '../assets/tech-soldier.png';
import Enemy2Image from '../assets/iron-caveman.png';

function MissionScreen({ route, navigation }) {
  const { playerNames } = route.params;
  const [mission, setMission] = useState(null);

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Players:</Text>
      {playerNames.map((name, index) => (
        <Text key={index} style={styles.playerName}>
          Player {index + 1}: {name}
        </Text>
      ))}
      {mission && (
        <View style={styles.missionContainer}>
          <Text style={styles.missionTitle}>Mission: {mission.name}</Text>
          <Text>Objective: {mission.objective}</Text>
          <Text>Enemies:</Text>
          {mission.enemies.map((enemy, index) => (
            <View key={index} style={styles.enemyContainer}>
              <Text>{enemy.name}</Text>
              <Image source={enemy.image} style={styles.enemyImage} />
            </View>
          ))}
        </View>
      )}
      <Text>Mapa del nivel</Text>
      <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRspkQWM_CO2-MTC0bedTLyMe5z0_6rI_S1g7PdvbY_zQ&s' }} style={styles.level} />
      <Button 
        title="Choose Mercenaries" 
        onPress={() => navigation.navigate('Mercenary', { playerNames, mission })} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  playerName: {
    fontSize: 16,
    marginTop: 10,
  },
  missionContainer: {
    marginTop: 20,
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
    width: 250,
    height: 250,
    marginTop: 20,
  },
});

export default MissionScreen;
