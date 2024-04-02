import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

function HomeScreen({ navigation }) {
  const [playerCount, setPlayerCount] = useState('');
  const [playerNames, setPlayerNames] = useState([]);

  // Ensure playerCount is a positive integer before using it to set playerNames
  useEffect(() => {
    const count = parseInt(playerCount, 10);
    if (!isNaN(count) && count > 0) {
      setPlayerNames(new Array(count).fill(''));
    } else {
      setPlayerNames([]);
    }
  }, [playerCount]);

  const handleNameChange = (text, index) => {
    const newNames = [...playerNames];
    newNames[index] = text;
    setPlayerNames(newNames);
  };

  const renderNameInputs = () => {
    return playerNames.map((name, index) => (
      <TextInput
        key={index.toString()} // It's better to use unique identifiers as keys, but for simplicity index is used here
        style={styles.input}
        onChangeText={(text) => handleNameChange(text, index)}
        value={name}
        placeholder={`Player ${index + 1} Name`}
      />
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>How many players want to play?</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setPlayerCount(text.replace(/[^0-9]/g, ''))} // Only allow numeric input
        value={playerCount}
        keyboardType="numeric"
        placeholder="Number of Players"
      />
      {renderNameInputs()}
      <Button
        title="Start Mission"
        onPress={() => navigation.navigate('Mission', { playerNames })}
        disabled={playerNames.length === 0 || playerNames.includes('')} // Also disable button if playerCount is 0
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    width: '90%', // Adjust width as needed
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default HomeScreen;
