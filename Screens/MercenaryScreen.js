import { Text, ScrollView, StyleSheet } from "react-native";

const MercenaryScreen = ({ route }) => {
  const { playerNames } = route.params;
  return (
    <ScrollView contentContainerStyle={styles.container}>
    <Text>Mercenary Screen</Text>
    <Text>Players:</Text>
      {playerNames.map((name, index) => (
        <Text key={index} style={styles.playerName}>
          Player {index + 1}: {name}
        </Text>
      ))}
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
