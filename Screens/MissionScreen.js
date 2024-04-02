import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

function MissionScreen({ route }) {
  const { playerNames } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Players:</Text>
      {playerNames.map((name, index) => (
        <Text key={index} style={styles.playerName}>
          Player {index + 1}: {name}
        </Text>
      ))}
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
});

export default MissionScreen;
