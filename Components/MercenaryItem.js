import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import BlackNight from '../assets/the-black-knight.webp';

const MercenaryItem = ({ mercenary, onMercenarySelect, isDisabled }) => {
  return (
    <TouchableOpacity 
      style={[styles.heroCard, isDisabled && styles.disabledHeroCard]} 
      onPress={() => !isDisabled && onMercenarySelect(mercenary)}
    >
      <ImageBackground source={BlackNight} style={styles.backgroundImage}>
        <View style={styles.contentContainer}>
          <Text style={styles.mercenaryName}>{mercenary.name}</Text>
          <Text style={styles.mercenaryHealth}>Health: {mercenary.health}</Text>
          <Text style={styles.mercenaryHealth}>Hiring cost: {mercenary.contractCost}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  heroCard: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
    borderWidth: 3,
    borderColor: '#3f3',
  },
  disabledHeroCard: {
    opacity: 0.5,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    backgroundColor: 'rgba(42, 42, 42, 0.3)', 
    padding: 15,
    height: 200,
    justifyContent: 'center',
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
});

export default MercenaryItem;
