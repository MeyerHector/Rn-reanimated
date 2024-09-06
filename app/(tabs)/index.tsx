import { Image, StyleSheet, Platform, View, Text, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useState } from "react";

const initialOffset = -500;

export default function HomeScreen() {
  const offset = useSharedValue(initialOffset);
  const [background, setBackground] = useState(true);
  const opacity = useSharedValue(1);
  const [textVisible, setTextVisible] = useState(true); // Estado para la visibilidad del texto

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    // Animar el texto para que caiga desde arriba
    offset.value = withSpring(0, { damping: 10, stiffness: 100 });
  }, []);

  const handleClick = () => {
    if (textVisible) {
      // Ocultar el texto y reiniciar la posición
      opacity.value = withTiming(0, { duration: 500 }, () => {
        setTextVisible(false);
      });
      setTimeout(() => {
        offset.value = initialOffset;
      }, 500);
    } else {
      // Mostrar el texto y animar para que caiga desde arriba
      setTextVisible(true);
      offset.value = withSpring(0, { damping: 10, stiffness: 100 });
    }
    setBackground(!background);
  };

  return (
    <View style={styles.fullScreen}>
      {background ? (
        <LinearGradient colors={["#4c669f", "white"]} style={styles.gradient}>
          <Animated.View style={[styles.mainContainer, animatedStyles]}>
            {textVisible && <Text style={styles.titleContainer}>Titulo</Text>}
          </Animated.View>
          <View style={styles.buttonContainer}>
            <Button onPress={handleClick} title="Cambiar fondo 🫦" />
          </View>
        </LinearGradient>
      ) : (
        <LinearGradient colors={["#FF7F7F", "white"]} style={styles.gradient}>
          <Animated.View style={[styles.mainContainer, animatedStyles]}>
            {textVisible && <Text style={styles.titleContainer}>Titulo</Text>}
          </Animated.View>
          <View style={styles.buttonContainer}>
            <Button onPress={handleClick} title="Cambiar fondo 🫦" />
          </View>
        </LinearGradient>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  gradient: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
  },
  titleContainer: {
    fontSize: 24,
    textAlign: "center",
  },
  buttonContainer: {
    margin: 20,
  },
});
