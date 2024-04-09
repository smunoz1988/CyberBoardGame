import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const MercenaryItem = ({ mercenary, onMercenarySelect }) => {

  return (
    <TouchableOpacity style={styles.heroCard} onPress={() => onMercenarySelect(mercenary)}>
        <View>
            <Text style={styles.mercenaryName}>{mercenary.name}</Text>
            <Text>Health: {mercenary.health}</Text>
            <Text>Styles:</Text>
            {mercenary.styles.map((style, index) => (
            <View key={index}>
                <Text>{style}</Text>
            </View>
            ))}
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  heroCard: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  mercenaryName: {
    fontFamily: 'Orbitron_900Black',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default MercenaryItem;
