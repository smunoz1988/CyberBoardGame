  import React, { useState, useEffect } from 'react';
  import { View, Text, StyleSheet, FlatList } from 'react-native';
  import mercenaries from '../GameData/mercenaries';
  import MercenaryItem from '../Components/MercenaryItem';

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
        <Text>Choose your Mercenary</Text>
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
        <Text>Current Player: Player {currentPlayerIndex + 1}</Text>
        <Text>Current Player: {playerNames[currentPlayerIndex]}</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      marginTop: 20,
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
      color: 'black',
      fontSize: 20,
    },
  });

  export default MercenaryScreen;
