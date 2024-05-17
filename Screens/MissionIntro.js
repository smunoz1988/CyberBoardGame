import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import EnemyInitiative from "../Components/EnemyInitiative";
import MercenaryInitiative from '../Components/MercenaryInitiative';
import Timer from '../Components/Timer';

const MissionIntro = ({ route }) => {
  const { selectedMercenaries, mission } = route.params;
  const enemies = mission.enemies;
  const [turn, setTurn] = useState(0);

  const getRandomDice = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const mercenaryArray = Object.keys(selectedMercenaries).map(key => ({
    type: 'mercenary',
    name: selectedMercenaries[key].name,
    hp: selectedMercenaries[key].hp,
  }));

  const typedEnemies = enemies.flatMap(enemy =>
    Array.from({ length: enemy.quantity }).map((_, i) => ({
      type: 'enemy',
      name: enemy.name,
      enemyId: i + 1,
      hp: enemy.hp,
      moveMin: enemy.moveMin,
      moveMax: enemy.moveMax,
      attackMin: enemy.attackMin,
      attackMax: enemy.attackMax,
      move: getRandomDice(enemy.moveMin, enemy.moveMax), // Initial random move
      attack: getRandomDice(enemy.attackMin, enemy.attackMax), // Initial random attack
    }))
  );

  const combinedArray = [...mercenaryArray, ...typedEnemies];
  const [initiativesList, setInitiativesList] = useState(combinedArray);


  const shuffleArray = (originalArray) => {
    let array = originalArray.map(character => {
      if (character.type === 'enemy') {
        return {
          ...character,
          move: getRandomDice(character.moveMin, character.moveMax),
          attack: getRandomDice(character.attackMin, character.attackMax),
        };
      }
      return character;
    });

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    setInitiativesList(array);
    setTurn(prevTurn => prevTurn + 1);
  };

  const handleDeleteCharacter = (character) => {
    setInitiativesList(initiativesList.filter(item => item !== character));
  };

  return (
    <View style={style.container}>
      <Timer />
      <Text style={style.turn}>Mission: {mission.name}</Text>
      <Text style={style.turn}>Objective: {mission.objective}</Text>
      <Text style={style.turn}>Turn: {turn}</Text>
      <ScrollView>
        {initiativesList.map((character, index) => {
          const key = character.type === 'enemy' ? `${character.name}-${character.enemyId}` : `${character.name}`;
          if (character.type === 'enemy') {
            return <EnemyInitiative key={key} listNum={index + 1} enemy={character} onEnemyDelete={() => handleDeleteCharacter(character)} turn={turn} />;
          } else {
            return <MercenaryInitiative key={key} listNum={index + 1} mercenary={character} onMercenaryDelete={() => handleDeleteCharacter(character)} />;
          }
        })}
      </ScrollView>
      <TouchableOpacity style={style.startButton} onPress={() => shuffleArray(initiativesList)}>
        <Text style={style.startButtonText}>Launch Initiatives</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  turn: {
    fontSize: 24,
    color: '#bb00ff', // Neon purple
    textShadowColor: '#bb00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    fontFamily: 'Orbitron_900Black',
  },
  startButton: {
    backgroundColor: '#bb00ff',
    opacity: 0.8,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
    height: 50, // Set a fixed height
    margin: 20,
  },
  startButtonText: {
    fontFamily: 'Orbitron_900Black',
    color: 'white',
    fontSize: 16, // Adjust text size as needed
    textShadowColor: 'white',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});

export default MissionIntro;
