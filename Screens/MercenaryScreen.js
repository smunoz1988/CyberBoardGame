import { View, Text, StyleSheet, FlatList } from 'react-native';
import mercenaries from '../GameData/mercenaries';
import MercenaryItem from '../Components/MercenaryItem';

const MercenaryScreen = ({ route }) => {
  const { playerNames, mission } = route.params;

  const renderHeader = () => (
    <View>
      <Text>Players:</Text>
      {playerNames.map((name, index) => (
        <Text key={index} style={styles.playerName}>
          Player {index + 1}: {name}
        </Text>
      ))}
      <Text>Mission: {mission.name}</Text>
      <Text>Objective: {mission.objective}</Text>
      <Text>Choose your Mercenary</Text>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={mercenaries}
      renderItem={({ item }) => <MercenaryItem mercenary={item} />}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  playerName: {
    color: 'black',
    fontSize: 20,
  },
});

export default MercenaryScreen;
