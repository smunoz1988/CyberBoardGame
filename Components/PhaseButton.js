import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const PhaseButton = ({ 
  gamePhase, 
  setGamePhase, 
  planTimerRunning, 
  setPlanTimerRunning, 
  gameTimerRunning, 
  setGameTimerRunning, 
  shuffleArray, 
  initiativesList, 
  canEndTurn
  }) => {
    const manageEndTurn = () => {
        setGamePhase('endTurn');
        setGameTimerRunning(false);
    };

    const manageLaunchInitiatives = () => {
        shuffleArray(initiativesList);
        setGamePhase('planification');
    };

    if (gamePhase === 'planification') {
      if (planTimerRunning) {
        return (
          <TouchableOpacity
            style={[styles.button, styles.pauseButton]}
            onPress={() => setPlanTimerRunning(false)}
          >
            <Text style={styles.buttonText}>Pause Planification</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            style={[styles.button, styles.resumeButton]}
            onPress={() => setPlanTimerRunning(true)}
          >
            <Text style={styles.buttonText}>Resume Planification</Text>
          </TouchableOpacity>
        );
      }
    } else if (gamePhase === 'action') {
      if (canEndTurn) {
        return (
          <TouchableOpacity
            style={[styles.button, styles.nextButton]}
            onPress={manageEndTurn}
          >
            <Text style={styles.buttonText}>End Turn</Text>
          </TouchableOpacity>
        );
      } else if (gameTimerRunning) {
        return (
          <TouchableOpacity
            style={[styles.button, styles.pauseButton]}
            onPress={() => setGameTimerRunning(false)}
          >
            <Text style={styles.buttonText}>Pause Game</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            style={[styles.button, styles.resumeButton]}
            onPress={() => setGameTimerRunning(true)}
          >
            <Text style={styles.buttonText}>Resume Game</Text>
          </TouchableOpacity>
        );
      }
    } else {
      return (
        <TouchableOpacity
          style={[styles.button, styles.launchButton]}
          onPress={manageLaunchInitiatives}
        >
          <Text style={styles.buttonText}>LAUNCH INITIATIVES</Text>
        </TouchableOpacity>
      );
    }
  };
  
  const styles = StyleSheet.create({
    button: {
      opacity: 0.8,
      padding: 10,
      borderRadius: 10,
      alignItems: 'center', 
      justifyContent: 'center', 
      height: 50, 
      margin: 20,
    },
    buttonText: {
      fontFamily: 'Orbitron_900Black',
      color: 'white',
      fontSize: 16, 
      textShadowColor: 'white',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,
    },
    resumeButton: {
      backgroundColor: '#4CAF50',
    },
    pauseButton: {
      backgroundColor: '#FF3131',
    },
    nextButton: {
      backgroundColor: '#2196F3',
    },
    launchButton: {
      backgroundColor: '#bb00ff',
    },
  });

export default PhaseButton;
