import { Text, ScrollView, StyleSheet } from "react-native";

const MercenaryScreen = ({ route }) => {
  const { playerNames, mission } = route.params;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Players:</Text>
        {playerNames.map((name, index) => (
          <Text key={index} style={styles.playerName}>
            Player {index + 1}: {name}
          </Text>
        ))}
      <Text>Mission: {mission.name}</Text>
      <Text>Objective: {mission.objective}</Text>
      <Text>Choose your Mercenary</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  playerName: {
    color: 'black',
    fontSize: 20,
  },
});

export default MercenaryScreen;
