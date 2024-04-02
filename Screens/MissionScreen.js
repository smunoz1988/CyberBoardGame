import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import missions from '../GameData/missions';

function MissionScreen({ route }) {
  const { playerNames } = route.params;
  const [mission, setMission] = useState(null);

  useEffect(() => {
    // Function to select a random mission and objective
    const loadMission = () => {
      const selectedMission = missions[Math.floor(Math.random() * missions.length)];
      const selectedObjective = selectedMission.objectives[Math.floor(Math.random() * selectedMission.objectives.length)];
      setMission({
        ...selectedMission,
        objective: selectedObjective, // Override the objectives array with a single selected objective
      });
    };

    loadMission();
  }, []);

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
            <Text key={index}>{enemy}</Text>
          ))}
        </View>
      )}
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
});

export default MissionScreen;
