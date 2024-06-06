import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import CharacterInitiative from '../Components/CharacterInitiative';
import Timer from '../Components/Timer';
import PhaseButton from '../Components/PhaseButton';

const MissionIntro = ({ route, navigation }) => {
  const { selectedMercenaries, mission } = route.params;
  const enemies = mission.enemies;
  const [turn, setTurn] = useState(0);
  const [planTimer, setPlanTimer] = useState(30);
  const [planTimerRunning, setPlanTimerRunning] = useState(false);
  const [gameTimer, setGameTimer] = useState(3600);
  const [gameTimerRunning, setGameTimerRunning] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [gamePhase, setGamePhase] = useState('planification');
  const [activePlayer, setActivePlayer] = useState(0);
  const [newEnemiesId, setNewEnemiesId] = useState(20); 

  // mostrar alerta de fin de planificacion
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (showMessage) {
        setShowMessage(false);
      }
    }
    , 2000);

    return () => clearInterval(intervalId);
  }, [showMessage]);

  // timer de planificacion
  useEffect(() => {
    let intervalId;
    if (planTimerRunning && planTimer > 0) {
      intervalId = setInterval(() => {
        setPlanTimer((s) => s - 1);
      }, 1000);
    } else if (!planTimerRunning || planTimer === 0) {
      clearInterval(intervalId);
      if (planTimer === 0) {
        setShowMessage(true);
        setGamePhase('action');
        setPlanTimerRunning(false);
        setGameTimerRunning(true);
      }
    }

    return () => clearInterval(intervalId);
  }, [planTimerRunning, planTimer]);

  // timer de juego
  useEffect(() => {
    let intervalId;
    if (gameTimerRunning && gameTimer > 0) {
      intervalId = setInterval(() => {
        setGameTimer((s) => s - 1);
      }, 1000);
    } else if (!gameTimerRunning || gameTimer === 0) {
      clearInterval(intervalId);
       // or turn === 13
      if (gameTimer === 0 || turn === 12) { 
        alert('Time is over!');
        setGameTimerRunning(false);
      }
    }

    return () => clearInterval(intervalId);
  }, [gameTimerRunning, gameTimer]);

  const getRandomDice = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // array de mercenarios
  const mercenaryArray = Object.keys(selectedMercenaries).map(key => ({
    type: 'mercenary',
    name: selectedMercenaries[key].name,
    hp: selectedMercenaries[key].hp,
  }));

  // array de enemigos
  const typedEnemies = enemies.flatMap(enemy =>
    Array.from({ length: enemy.quantity }).map((_, i) => ({
      type: 'enemy',
      name: enemy.name,
      enemyId: i + 1,
      hp: enemy.hp,
      range: enemy.range,
      moveMin: enemy.moveMin,
      moveMax: enemy.moveMax,
      attackMin: enemy.attackMin,
      attackMax: enemy.attackMax,
      move: getRandomDice(enemy.moveMin, enemy.moveMax), // Initial random move
      attack: getRandomDice(enemy.attackMin, enemy.attackMax), // Initial random attack
    }))
  );

  // juntar mercenarios con enemigos
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
    if (isChecked) {
      if (index === initiativesList.length - 1) {
        setActivePlayer(0);
      } else {
        setActivePlayer(index + 1);
      }
    }
  };
  
  const canEndTurn = () => initiativesList.every(character => character.checked);

  const addSoldiers = (array) => {
    const newSoldiers = [
      {
        type: 'enemy',
        name: 'New Tech Soldier',
        enemyId: newEnemiesId,
        hp: 12,
        range: 3,
        moveMin: 2,
        moveMax: 4,
        attackMin: 1,
        attackMax: 4,
        checked: false,
      },
      {
        type: 'enemy',
        name: 'New Tech Soldier',
        enemyId: newEnemiesId + 1,
        hp: 12,
        range: 3,
        moveMin: 2,
        moveMax: 4,
        attackMin: 1,
        attackMax: 4,
        checked: false,
      },
    ];
    setNewEnemiesId(newEnemiesId + 2);
    return [...array, ...newSoldiers];
  };

  // generar iniciativas
  const shuffleArray = (originalArray) => {
    if ((turn + 1) % mission.levelCardTurn === 0 && turn !== 0 && (turn + 1) !== 12) {
      originalArray = addSoldiers(originalArray);
    }
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

    setPlanTimer(30)
    setInitiativesList(array);
    setTurn(prevTurn => prevTurn + 1);
    setPlanTimerRunning(true);
  };

  const handleDeleteCharacter = (character) => {
    setInitiativesList(initiativesList.filter(item => item !== character));
    const index = initiativesList.findIndex(item => item === character);
    if (index < activePlayer) {
      setActivePlayer(activePlayer - 1);
    }
  };

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <View style={style.container}>
      <Text style={style.turn}>Mission: {mission.name}</Text>
      <Text style={style.turn}>Objective: {mission.objective}</Text>
      <Text style={style.turn}>card turn: {mission.levelCardTurn}</Text>
      {turn == 0 ? (
        <>
          <Text>AQUI SE VA A PONER UNA ANIMACION DE INTRO DEL JUEGO</Text>
          <Text>Cartas de mercenarios en cooldown, turno en 0, enemigos en el nivel, cartas de nivel, entreotros</Text>
          <TouchableOpacity 
            style={style.startButton}
            onPress={() => {  
              shuffleArray(initiativesList);
            }}
          >
            <Text style={style.startButtonText}>START GAME</Text>
          </TouchableOpacity> 
        </>

      ) : (
        <>
      <View style={style.timerContainer}>
        <Timer sec={gameTimer} title={"Game Time"} />
        <View style={style.phaseContainer}>
          <Text style={style.phaseTitle}>Phase</Text>
          {/* planification */}
          {gamePhase === 'planification' && <Timer sec={planTimer} title={"Planning Time"} />}
          {/* action */}
          {gamePhase === 'action' && <Text style={style.phaseTitle}>Action</Text>}
          {/* endTurn */}
          {gamePhase === 'endTurn' && <Text style={style.phaseTitle}>End Turn</Text>}
            <Text style={style.alert}></Text>
        </View>
      </View>
      {showMessage && <Text style={style.alertMessage}>Planning time is over! Game time has started.</Text>}
      <Text style={style.turn}>Turn: {turn}</Text>
      {gamePhase === 'action' && <Text style={style.turn}>Active player: {initiativesList[activePlayer].name}</Text>}
      <Text style={style.turn}>Active player: {activePlayer}</Text>
      {gamePhase === 'planification' && (
        <>
          <Text style={style.turn}>Planification actions:</Text>
          <Text style={style.alert}>- Move level token</Text>
          <Text style={style.alert}>- Move mercenary cards on cooldown</Text>
        </>
      )}
      {gamePhase === 'endTurn' && turn % mission.levelCardTurn === 0 && <Text style={style.alert}>resolve level cards</Text>}
      {(turn + 1) % mission.levelCardTurn === 0 && turn !== 0 && gamePhase === 'endTurn' && turn !== 12 && (
        <>
        <Text style={style.alert}>End turn conditionals:</Text>
        <Text style={style.alert}>- New enemies will be added</Text>
        <Text style={style.alert}>Entrance number: {generateRandomNumber(1, 4)}</Text>
        </>
      )}
      <ScrollView>
        <Text>INITIATIVES</Text>
        {initiativesList.map((character, index) => {
          const key = character.type === 'enemy' ? `${character.name}-${character.enemyId}` : `${character.name}`;
          return (
            <View key={key} style={[style.initiativeContainer, index === activePlayer && canEndTurn() === false && gamePhase === 'action' && style.activePlayerContainer]}>
              <View style={style.checkContainer}>
                <Text style={style.initiativeCounter}>{index + 1}</Text>
                {index === activePlayer && canEndTurn() === false && gamePhase === 'action' && <CheckBox
                  checked={character.checked}
                  onPress={() => handleCheckboxChange(index,!character.checked)}
                />}
              </View>
                <CharacterInitiative character={character} onCharacterDelete={() => handleDeleteCharacter(character)} />
            </View>
          );
        })}
      </ScrollView>
      <PhaseButton 
          gamePhase={gamePhase}
          setGamePhase={setGamePhase}
          planTimerRunning={planTimerRunning}
          setPlanTimerRunning={setPlanTimerRunning}
          gameTimerRunning={gameTimerRunning}
          setGameTimerRunning={setGameTimerRunning}
          shuffleArray={shuffleArray}
          initiativesList={initiativesList}
          canEndTurn={canEndTurn()}
        />
      </>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 10,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,

  },
  alertMessage: {
    position: 'absolute',
    alignSelf: 'center',
    top: '25%',
    width: '50%',
    height: '20%',
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    color: 'white',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    zIndex: 1,
    elevation: 10,
  },
  turn: {
    fontSize: 16,
    color: '#bb00ff', // Neon purple
    textShadowColor: '#bb00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    fontFamily: 'Orbitron_900Black',
    textAlign: 'center',
  },
  alert: {
    color: 'red',
    fontSize: 34,
    fontFamily: 'Orbitron_900Black',
    textAlign: 'center',
  },
  phaseContainer: {
    backgroundColor: 'black',
  },
  phaseTitle: {
    fontFamily: 'Orbitron_900Black',
    color: 'white',
    fontSize: 16,
  },
  initiativeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 6,
    borderColor: '#fff',
    elevation: 3,
    backgroundColor: '#2a2a2a',
  },
  activePlayerContainer: {
    borderColor: '#bb00ff',
  },
  checkContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    flex: 1,
  },
  initiativeCounter: {
    color: '#fff', 
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
    alignItems: 'center', 
    justifyContent: 'center',
    height: 50, 
    margin: 20,
  },
  startButtonText: {
    fontFamily: 'Orbitron_900Black',
    color: 'white',
    fontSize: 16,
    textShadowColor: 'white',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});

export default MissionIntro;
