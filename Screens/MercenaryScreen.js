  import React, { useState, useEffect } from 'react';
  import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
  import mercenaries from '../GameData/mercenaries';
  import MercenaryItem from '../Components/MercenaryItem';
  import NeonText from '../Components/NeonText';

  const MercenaryScreen = ({ route }) => {
    const { playerNames, mission } = route.params;
    const [selectedMercenaries, setSelectedMercenaries] = useState({});
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

    useEffect(() => {
      const initialSelections = playerNames.reduce((acc, index) => {
        acc[index] = null;
        return acc;
      }, {});
      setSelectedMercenaries(initialSelections);
    }, [playerNames]);

    const handleMercenarySelect = (mercenary) => {
      setSelectedMercenaries(prev => ({
        ...prev,
        [currentPlayerIndex]: mercenary.name
      }));
      setCurrentPlayerIndex((currentPlayerIndex + 1) % playerNames.length);
    };

    return (
      <View style={styles.container}>
        <Text>Players:</Text>
        {playerNames.map((name, index) => (
          <Text key={index} style={styles.playerName}>
            Player {index + 1}: {selectedMercenaries[index] ? selectedMercenaries[index] : 'Not selected'}
          </Text>
        ))}
        <Text>Mission: {mission.name}</Text>
        <Text>Objective: {mission.objective}</Text>
        <Text style={styles.playerName}>Current Player: Player {currentPlayerIndex + 1}, {playerNames[currentPlayerIndex]}</Text>
        <NeonText>Choose your Mercenary:</NeonText>
        <FlatList
          data={mercenaries}
          renderItem={({ item }) => (
            <MercenaryItem 
              mercenary={item} 
              onMercenarySelect={() => handleMercenarySelect(item)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212', // Dark background
      padding: 20,
    },
    title: {
      color: '#0f0', // Neon green for text
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    mercenaryItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      height: 200,
    },
    playerName: {
      color: 'white',
      fontSize: 20,
    },
  });

  export default MercenaryScreen;
