import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EnemyInitiative = ({ enemy }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{enemy.name}</Text>
      <Text>{enemy.description}</Text>
      <Text>HP: {enemy.hp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EnemyInitiative;
