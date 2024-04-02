import React, { useState } from 'react';
import { Button, TextInput, StyleSheet, Text, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const HomeScreen = ({ navigation }) => {
  const [playerCount, setPlayerCount] = useState(null);
  const [playerNames, setPlayerNames] = useState([]);

  const handlePlayerCountChange = (value) => {
    setPlayerCount(value);
    if (value) {
      setPlayerNames(new Array(parseInt(value)).fill(''));
    } else {
      setPlayerNames([]);
    }
  };

  const handleNameChange = (text, index) => {
    const newNames = [...playerNames];
    newNames[index] = text;
    setPlayerNames(newNames);
  };

  const renderNameInputs = () => {
    return playerNames.map((_, index) => (
      <TextInput
        key={index}
        style={styles.input}
        onChangeText={(text) => handleNameChange(text, index)}
        value={playerNames[index]}
        placeholder={`Player ${index + 1} Name`}
      />
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to the Mission Tracker!</Text>
      <Text style={styles.title}>Select the number of players:</Text>
      <RNPickerSelect
        onValueChange={handlePlayerCountChange}
        items={[
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '4', value: '4' },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: 'Select number of players', value: null }}
      />
      {renderNameInputs()}
      <Button
        title="Start Mission"
        onPress={() => navigation.navigate('Mission', { playerNames })}
        disabled={!playerCount || playerNames.includes('')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, 
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 20,
  },
});

export default HomeScreen;
