import { ScrollView, Text } from 'react-native';
import EnemyInitiative from "../Components/EnemyInitiative";

const MissionIntro = ({ route, navigation }) => {
  const { playerNames, mission } = route.params;
  const enemies = mission.enemies;
  console.log('MissionIntro', mission);
  return (
    <ScrollView>
      {enemies.map((enemy, index) => (
        Array.from({ length: enemy.quantity }).map((_, i) => (
          <EnemyInitiative key={`${index}-${i}`} enemy={enemy} />
        ))
      ))}
      <Text>Objective:</Text>
    </ScrollView>
  )
}

export default MissionIntro;
