import React from 'react';
import { useState } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const EnemyInitiative = ({ listNum, enemy, onEnemyDelete }) => {
  const [enemyHp, setEnemyHp] = useState(enemy.hp);
  return (
    <View style={styles.card}>
      <Text>Initiative: {listNum}</Text>
      <Text style={styles.name}>{enemy.name} {enemy.enemyId}</Text>
      <Text>{enemy.description}</Text>
      <Text>HP: {enemyHp}</Text>
      <TouchableOpacity disabled={enemyHp <= 0} style={styles.damageButtons} onPress={() => setEnemyHp(enemyHp - 1)}>
        <Text>Damage</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cureButtons} onPress={() => setEnemyHp(enemyHp + 1)}>
        <Text>Cure</Text>
      </TouchableOpacity>
      {enemyHp <= 0 && <TouchableOpacity style={styles.deleteButtons} onPress={() => onEnemyDelete(enemy)}>
        <Text>Kill Enemy</Text>
      </TouchableOpacity>}
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
  damageButtons: {
    backgroundColor: 'red',
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    opacity: 0.5,
  },
  cureButtons: {
    backgroundColor: '#39FF14',
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    opacity: 0.5,
  },
  deleteButtons: {
    backgroundColor: '#39FF14',
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 200,
    opacity: 0.5,
  },
});

export default EnemyInitiative;
