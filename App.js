import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import RegistrationScreen from "./Screens/RegistrationScreen";
import { useFonts } from "expo-font";
import LoginScreen from "./Screens/LoginScreen";
import { useState } from "react";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const changeScreen = () => {
    setIsLogin(!isLogin);
  };
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./assets/photo-bg.jpg")} />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
        {isLogin ? (
          <LoginScreen changeScreen={changeScreen} />
        ) : (
          <RegistrationScreen changeScreen={changeScreen} />
        )}
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
});
