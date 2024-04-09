import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Destructure props correctly here
const MercenaryItem = ({ mercenary }) => {
  return (
    <View style={styles.heroCard}>
        <Text>{mercenary.name}</Text>
        <Text>Health: {mercenary.health}</Text>
        {mercenary.styles.map((style, index) => (
        <View key={index}>
            <Text>{style}</Text>
        </View>
        ))}
     </View>
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
});

export default MercenaryItem;
