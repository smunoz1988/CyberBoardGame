import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MercenaryInitiative = ({ listNum, mercenary, onMercenaryDelete }) => {
  const [mercenaryHp, setMercenaryHp] = useState(mercenary.hp);

  return (
    <View style={styles.card}>
      <Text style={styles.initiativeText}>{listNum}</Text>
      <TouchableOpacity disabled={mercenaryHp == mercenary.hp} style={[styles.cureButtons, mercenaryHp == mercenary.hp && styles.disabledButton]} onPress={() => setMercenaryHp(mercenaryHp + 1)}>
        <Text style={styles.buttonText}>Cure</Text>
      </TouchableOpacity>
      <View style={styles.titleHpCont}>
        <Text style={styles.name}>{mercenary.name}</Text>
        <Text style={styles.hpText}>HP: {mercenaryHp}</Text>
      </View>
      {mercenaryHp > 0? (
        <TouchableOpacity 
          style={[styles.damageButtons]}
          onPress={() => setMercenaryHp(mercenaryHp - 1)}>
          <Text style={styles.buttonText}>Damage</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          style={styles.deleteButtons} 
          onPress={() => onMercenaryDelete(mercenary)}>
          <Text style={styles.buttonText}>Remove Hero</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: '#000',  // Dark background
    borderRadius: 10,
    borderWidth: 8,
    borderColor: '#fff',  // White border for visibility
    elevation: 3,
    alignItems: 'center',
    flexDirection: 'row',
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
    fontWeight: 'bold',
    color: '#bb00ff',  // Neon purple for names
  },
  hpText: {
    color: 'white',  // Light text for visibility
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
    opacity: 0.8,
  },
  disabledButton: {
    opacity: 0.3,
    backgroundColor: 'white',  // Adjust background for disabled state
  },
  cureButtons: {
    backgroundColor: '#39FF14',  // Neon green for cure buttons
    marginHorizontal: 20,
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
    marginHorizontal: 20,
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
