import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const CharacterInitiative = ({ character, onCharacterDelete }) => {
  const [characterHp, setcharacterHp] = useState(character.hp);

  return (
    <View style={styles.card}>
      <View style={styles.titleHpCont}>
        {character.type === 'enemy' ? (
          <View style={styles.nameCont}>
            <Text style={styles.nameEnemy}>{character.name} {character.enemyId}</Text>
            <View style={styles.titleHpCont}>
              <Text style={styles.moveTextNum}>{character.move}</Text>
              <Text style={styles.moveText}>Move</Text>
            </View>
            <View style={styles.titleHpCont}>
              <Text style={styles.attackNum}>{character.attack}</Text>
              <Text style={styles.attackText}>Attack</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.name}>{character.name}</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          disabled={characterHp == character.hp} 
          style={[styles.cureButtons, characterHp == character.hp && styles.disabledButton]} 
          onPress={() => setcharacterHp(characterHp + 1)}>
          <Icon name="heart-circle-plus" size={25} color="white" />
        </TouchableOpacity>
        <View style={styles.titleHpCont}>
          <Text style={styles.hpTextNum}>{characterHp}</Text>
          <Text style={styles.hpText}>HP</Text>
        </View>
        {character.type === 'enemy' && (
            <>

            </>
          )}
        {characterHp > 0? (
          <TouchableOpacity 
            style={[styles.damageButtons]}
            onPress={() => setcharacterHp(characterHp - 1)}>
            <Icon name="heart-crack" size={25} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.deleteButtons} 
            onPress={() => onCharacterDelete(character)}>
            <Icon name="skull" size={25} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'black',
    flex: 6,
    justifyContent: 'center',
    padding: 10,
  },
  titleHpCont: {
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontFamily: 'Orbitron_900Black',
    color: '#bb00ff',  // Neon purple for names
    marginBottom: 10,
  },
  nameCont: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  nameEnemy: {
    fontSize: 16,
    fontFamily: 'Orbitron_900Black',
    color: '#39FF14',  // Neon red for enemy names
    marginVertical: 10,
  },
  hpTextNum: {
    color: 'red',
    fontFamily: 'Orbitron_900Black',
    fontSize: 24,
  },
  hpText: {
    color: 'red',
    fontFamily: 'Orbitron_900Black',
    fontSize: 12,
  },
  moveTextNum: {
    color: 'blue',
    fontFamily: 'Orbitron_900Black',
    fontSize: 20,
  },
  moveText: {
    color: 'blue',
    fontFamily: 'Orbitron_900Black',
    fontSize: 8,
  },
  attackNum: {
    color: 'yellow',
    fontFamily: 'Orbitron_900Black',
    fontSize: 20,
  },
  attackText: {
    color: 'yellow',
    fontFamily: 'Orbitron_900Black',
    fontSize: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  damageButtons: {
    backgroundColor: '#FF0000', // Semi-transparent black background
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FF0000', // Red neon border
    borderWidth: 2,
    shadowColor: '#FF0000', // Red neon shadow
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    height: 50,
    width: 50,
  },
  disabledButton: {
    opacity: 0.3,
    backgroundColor: 'white',  // Adjust background for disabled state
  },
  cureButtons: {
    backgroundColor: 'rgb(0,0,255)',  // Neon green for cure buttons
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    opacity: 0.8,
  },
  deleteButtons: {
    backgroundColor: 'darkred',  // Dark red for delete buttons
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    opacity: 0.8,
  },
  buttonText: {
    color: 'white',  // Light text on buttons for visibility
    fontWeight: 'bold',
  },
});

export default CharacterInitiative;
