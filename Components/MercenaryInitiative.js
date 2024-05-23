import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const MercenaryInitiative = ({ mercenary, onMercenaryDelete }) => {
  const [mercenaryHp, setMercenaryHp] = useState(mercenary.hp);

  return (
    <View style={styles.card}>
      <View style={styles.titleHpCont}>
        <Text style={styles.name}>{mercenary.name}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          disabled={mercenaryHp == mercenary.hp} 
          style={[styles.cureButtons, mercenaryHp == mercenary.hp && styles.disabledButton]} 
          onPress={() => setMercenaryHp(mercenaryHp + 1)}>
          <Icon name="heart-circle-plus" size={25} color="white" />
        </TouchableOpacity>
        <View style={styles.titleHpCont}>
          <Text style={styles.hpTextNum}>{mercenaryHp}</Text>
          <Text style={styles.hpText}>HP</Text>
        </View>
        {mercenaryHp > 0? (
          <TouchableOpacity 
            style={[styles.damageButtons]}
            onPress={() => setMercenaryHp(mercenaryHp - 1)}>
            <Icon name="heart-crack" size={25} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.deleteButtons} 
            onPress={() => onMercenaryDelete(mercenary)}>
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
  initiativeText: {
    color: 'white',  // Light text for visibility
    fontSize: 16,
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Orbitron_900Black',
    color: '#bb00ff',  // Neon purple for names
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

export default MercenaryInitiative;
