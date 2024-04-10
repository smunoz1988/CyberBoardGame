import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const MercenaryItem = ({ mercenary, onMercenarySelect }) => {

  return (
    <TouchableOpacity style={styles.heroCard} onPress={() => onMercenarySelect(mercenary)}>
        <View>
            <Text style={styles.mercenaryName}>{mercenary.name}</Text>
            <Text style={styles.mercenaryHealth}>Health: {mercenary.health}</Text>
            <Text style={styles.mercenaryStyles}>Styles:</Text>
            {mercenary.styles.map((style, index) => (
            <View key={index}>
                <Text style={styles.mercenariesStyles}>{style}</Text>
            </View>
            ))}
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  heroCard: {
    flex: 1,
    backgroundColor: '#2a2a2a', // Darker element background
    borderRadius: 10,
    padding: 15,
    margin: 10,
    flexDirection: 'row', // Align items in a row
    alignItems: 'center',
    justifyContent: 'space-between', // Space items nicely
    borderWidth: 1,
    borderColor: '#3f3', 
  },
  mercenaryName: {
    fontFamily: 'Orbitron_900Black',
    color: '#fff', 
    fontSize: 18,
  },
  mercenaryHealth: {
    color: '#f00',
    fontSize: 16,
  },
  mercenaryStyles: {
    color: '#0f0', 
    fontSize: 16,
  },
  mercenariesStyles: {
    color: '#f0f',
    fontSize: 16,
  },
});

export default MercenaryItem;
