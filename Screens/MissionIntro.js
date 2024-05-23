import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import CharacterInitiative from '../Components/CharacterInitiative';
import Timer from '../Components/Timer';

const MissionIntro = ({ route }) => {
  const { selectedMercenaries, mission } = route.params;
  const enemies = mission.enemies;
  const [turn, setTurn] = useState(0);
  const [planTimer, setPlanTimer] = useState(30);
  const [planTimerRunning, setPlanTimerRunning] = useState(false);
  const [gameTimer, setGameTimer] = useState(3600);
  const [gameTimerRunning, setGameTimerRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (planTimerRunning && planTimer > 0) {
      intervalId = setInterval(() => {
        setPlanTimer((s) => s - 1);
      }, 1000);
    } else if (!planTimerRunning || planTimer === 0) {
      clearInterval(intervalId);
      if (planTimer === 0) {
        alert('Time to plan is over! Start your turn.');
        setPlanTimerRunning(false);
        setPlanTimer(30);
        setGameTimerRunning(true);
      }
    }

    return () => clearInterval(intervalId);
  }, [planTimerRunning, planTimer]);

  useEffect(() => {
    let intervalId;
    if (gameTimerRunning && gameTimer > 0) {
      intervalId = setInterval(() => {
        setGameTimer((s) => s - 1);
      }, 1000);
    } else if (!gameTimerRunning || gameTimer === 0) {
      clearInterval(intervalId);
      if (gameTimer === 0) {
        alert('Time is over!');
        setGameTimerRunning(false);
      }
    }

    return () => clearInterval(intervalId);
  }, [gameTimerRunning, gameTimer]);

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

  const combinedArray = [...mercenaryArray, ...typedEnemies].map(character => ({
    ...character,
    checked: false,
  }))
  const [initiativesList, setInitiativesList] = useState(combinedArray);

  const handleCheckboxChange = (index, isChecked) => {
    setInitiativesList(initiativesList.map((character, i) => {
      if (i === index) {
        return {...character, checked: isChecked };
      }
      return character;
    }));
  };
  
  const canLaunchInitiatives = () => initiativesList.every(character => character.checked);


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

    array.forEach(character => {
      character.checked = false;
    });

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    setInitiativesList(array);
    setTurn(prevTurn => prevTurn + 1);
    setGameTimerRunning(false);
    setPlanTimerRunning(true);
  };

  const handleDeleteCharacter = (character) => {
    setInitiativesList(initiativesList.filter(item => item !== character));
  };

  return (
    <View style={style.container}>
      <Text style={style.turn}>Mission: {mission.name}</Text>
      <Text style={style.turn}>Objective: {mission.objective}</Text>
      <Timer sec={planTimer} title={"Planning Timer"} />
      <Timer sec={gameTimer} title={"Game Timer"} />
      {turn == 0 ? (
        <TouchableOpacity 
        style={style.startButton}
        onPress={() => {
          shuffleArray(initiativesList);
        }}
      >
        <Text style={style.startButtonText}>START GAME</Text>
      </TouchableOpacity>
      ) : (
        <>
      <Text style={style.turn}>Turn: {turn}</Text>
      <ScrollView>
        {initiativesList.map((character, index) => {
          const key = character.type === 'enemy' ? `${character.name}-${character.enemyId}` : `${character.name}`;
          return (
            <View key={key} style={style.initiativeContainer}>
              <View style={style.checkContainer}>
                <Text style={style.initiativeCounter}>{index + 1}</Text>
                <CheckBox
                  checked={character.checked}
                  onPress={() => handleCheckboxChange(index,!character.checked)}
                />
              </View>
                <CharacterInitiative character={character} onCharacterDelete={() => handleDeleteCharacter(character)} />
            </View>
          );
        })}
      </ScrollView>
      {gameTimerRunning ? (
        <TouchableOpacity
        style={style.startButton}
        onPress={() => {
          setGameTimerRunning(false);
        }}
      >
        <Text style={style.startButtonText}>Pause Game</Text>
      </TouchableOpacity>
      ) : (
      <TouchableOpacity 
        style={style.startButton}
        onPress={() => {
          if (canLaunchInitiatives()) {
            shuffleArray(initiativesList);
          } else {
            alert('Complete all characters turns to launch initiatives.');
          }
        }}
      >
        <Text style={style.startButtonText}>Launch Initiatives</Text>
      </TouchableOpacity>
      )}
      </>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    paddingHorizontal: 10,
  },
  turn: {
    fontSize: 16,
    color: '#bb00ff', // Neon purple
    textShadowColor: '#bb00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    fontFamily: 'Orbitron_900Black',
  },
  initiativeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 6,
    borderColor: '#fff',  // White border for visibility
    elevation: 3,
    backgroundColor: '#2a2a2a', // Dark background
  },
  checkContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    flex: 1,
  },
  initiativeCounter: {
    color: '#fff', // White text for visibility
    fontSize: 25,
    paddingTop: 10,
    fontFamily: 'Orbitron_900Black',
    paddingRight: 5,
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
