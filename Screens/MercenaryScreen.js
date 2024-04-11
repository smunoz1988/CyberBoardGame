  import React, { useState, useEffect, useRef } from 'react';
  import { View, Text, StyleSheet, FlatList, Animated } from 'react-native';
  import mercenaries from '../GameData/mercenaries';
  import MercenaryItem from '../Components/MercenaryItem';
  import NeonTextSelect from '../Components/NeonTextSelect';

  const MercenaryScreen = ({ route }) => {
    const { playerNames, mission } = route.params;
    const [selectedMercenaries, setSelectedMercenaries] = useState({});
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const moveAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      const initialSelections = playerNames.reduce((acc, index) => {
        acc[index] = null;
        return acc;
      }, {});
      setSelectedMercenaries(initialSelections);
    }, [playerNames]);

    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(moveAnimation, {
            toValue: 1,
            duration: 10000,
            useNativeDriver: true,
          }),
          Animated.timing(moveAnimation, {
            toValue: 0,
            duration: 10000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, [moveAnimation]);

    const movingMargin = moveAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, 50], 
    });

    const handleMercenarySelect = (mercenary) => {
      setSelectedMercenaries(prev => ({
        ...prev,
        [currentPlayerIndex]: mercenary.name
      }));
      setCurrentPlayerIndex((currentPlayerIndex + 1) % playerNames.length);
    };

    return (
      <View style={styles.container}>
        <Animated.Image
          source={require('../assets/mercenaries-background.jpg')}
          style={[
            styles.backgroundImage,
            {
              transform: [
                {
                  translateX: movingMargin,
                },
              ],
            },
          ]}
          resizeMode="cover"
        />
        <Text>Players:</Text>
        {playerNames.map((name, index) => (
          <Text key={index} style={styles.playerName}>
            Player {index + 1}: {selectedMercenaries[index] ? selectedMercenaries[index] : 'Not selected'}
          </Text>
        ))}
        <Text>Mission: {mission.name}</Text>
        <Text>Objective: {mission.objective}</Text>
        <Text style={styles.playerName}>Current Player: Player {currentPlayerIndex + 1}, {playerNames[currentPlayerIndex]}</Text>
        <NeonTextSelect>Choose your Mercenary:</NeonTextSelect>
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
      position: 'relative',
    },
    backgroundImage: {
      position: 'absolute', 
      width: '150%', 
      height: '100%', 
      top: 0,
      left: '-20%',
      right: 0,
      bottom: 0,
      zIndex: -1, 
    },
    title: {
      color: '#0f0', 
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
