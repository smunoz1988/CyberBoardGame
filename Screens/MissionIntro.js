import React from 'react';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import EnemyInitiative from "../Components/EnemyInitiative";
import MercenaryInitiative from '../Components/MercenaryInitiative';

const MissionIntro = ({ route }) => {
  const { selectedMercenaries, mission } = route.params;
  const enemies = mission.enemies;

  const mercenaryArray = Object.keys(selectedMercenaries).map(key => ({
    type: 'mercenary',
    name: selectedMercenaries[key]
  }));

  const typedEnemies = enemies.flatMap(enemy =>
    Array.from({ length: enemy.quantity }).map((_, i) => ({
      type: 'enemy',
      name: enemy.name,
      enemyId: i + 1,
      hp: enemy.hp,
    }))
  );

  const combinedArray = [...mercenaryArray, ...typedEnemies];
  const [initiativesList, setInitiativesList] = useState(combinedArray);
  const [turn, setTurn] = useState(0);

  const shuffleArray = (originalArray) => {
    let array = [...originalArray]; 
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];  
    }
    setInitiativesList(array);
    setTurn(prevTurn => prevTurn + 1);
  };

  const handleDeleteCharacter = (character) => {
    setInitiativesList(initiativesList.filter(item => item !== character));
  }

  return (
    <ScrollView>
      <Text style={style.clock}>tiempo atras</Text>
      <Text style={style.clock}>turn: {turn}</Text>
      {initiativesList.map((character, index) => {
        const key = character.type === 'enemy' ? `${character.name}-${character.enemyId}` : `${character.type}-${index}`;
        if (character.type === 'enemy') {
          return <EnemyInitiative key={key} listNum={index+1} enemy={character} onEnemyDelete={() => handleDeleteCharacter(character)}/>;
        } else {
          return <MercenaryInitiative key={key} listNum={index+1} mercenary={character} />
        }
      })}
      <TouchableOpacity style={style.startButton} onPress={() => shuffleArray(initiativesList)}>
        <Text style={style.startButtonText}>Launch Initiatives</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  clock: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50
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
});

export default MissionIntro;
