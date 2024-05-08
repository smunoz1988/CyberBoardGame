import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MercenaryInitiative = ({ listNum, mercenary, onMercenaryDelete }) => {
  const [mercenaryHp, setMercenaryHp] = useState(mercenary.hp);
  return (
    <View style={styles.card}>
      <Text>Initiative: {listNum}</Text>
      <Text style={styles.name}>{mercenary.name}</Text>
      <Text>HP: {mercenaryHp}</Text>
      <TouchableOpacity 
        disabled={mercenaryHp <= 0} 
        style={[styles.damageButtons, mercenaryHp <= 0 && styles.disabledButton]} 
        onPress={() => setMercenaryHp(mercenaryHp - 1)}>
        <Text>Damage</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cureButtons} onPress={() => setMercenaryHp(mercenaryHp + 1)}>
        <Text>Cure</Text>
      </TouchableOpacity>
      {mercenaryHp <= 0 && <TouchableOpacity style={styles.deleteButtons} onPress={() => onMercenaryDelete(mercenary)}>
        <Text>Remove Hero</Text>
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
  disabledButton: {
    opacity: 0.3,
    backgroundColor: 'grey',  // This can be adjusted to suit your design preferences
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
    backgroundColor: 'black',
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

export default MercenaryInitiative;
