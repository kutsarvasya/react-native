import React, { useEffect, useState } from "react";
// import { Ionicons } from "@expo/vector-icons";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { StatusBar } from "expo-status-bar";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Too short password")
      .max(12, "Too long")
      .required("Password is required"),
  })
  .required();

const { width } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [isShowButton, setIsShowButton] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsShowButton(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsShowButton(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
    navigation.navigate("Home");
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/photo-bg.jpg")}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: "#fff",
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 92,
              marginBottom: isShowButton
                ? Platform.OS === "ios"
                  ? -50
                  : -140
                : 0,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 30,
                fontWeight: 500,
                marginBottom: 33,
              }}
            >
              Увійти
            </Text>
            {/* <TouchableOpacity
              style={{ marginLeft: 20 }}
              onPress={() => navigation.navigate("Home")}
            >
              <Ionicons name="arrow-back" size={24} color="#212121" />
            </TouchableOpacity> */}
            <View style={{ gap: 16, marginBottom: 43 }}>
              <View>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={{
                        ...styles.input,
                        borderColor: errors.email ? "#E12800" : "#E8E8E8",
                      }}
                      placeholder="Адреса електронної пошти"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="email"
                />
                {errors.email && (
                  <Text style={styles.errorMessage}>
                    {errors.email.message}
                  </Text>
                )}
              </View>
              <View style={{}}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={{
                        ...styles.input,
                        borderColor: errors.password ? "#E12800" : "#E8E8E8",
                      }}
                      placeholder="Пароль"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={!passwordVisible}
                    />
                  )}
                  name="password"
                />

                {errors.password && (
                  <Text style={styles.errorMessage}>
                    {errors.password.message}
                  </Text>
                )}
                <TouchableOpacity
                  style={styles.showPassword}
                  onPress={() => {
                    setPasswordVisible(!passwordVisible);
                  }}
                >
                  <Text style={styles.showPasswordText}>
                    {passwordVisible ? "Сховати" : "Показати"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.btn}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.text}>Увійти</Text>
            </TouchableOpacity>
            <Text
              style={styles.textBtn}
              onPress={() => navigation.navigate("Registration")}
            >
              Немає акаунту? Зареєструватися
            </Text>
          </View>
        </KeyboardAvoidingView>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
};

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
  inputContainer: {
    // flex: 1,
  },
  input: {
    borderColor: "#E8E8E8",
    borderWidth: 1.0,
    height: 50,
    padding: 10,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    fontSize: 16,
  },
  errorMessage: {
    color: "#E12800",
    paddingLeft: 10,
  },
  btn: {
    backgroundColor: "#FF6C00",
    // width: "100%",
    alignItems: "center",
    height: 51,
    justifyContent: "center",
    borderRadius: 100,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    // fontWeight: 400,
  },
  showPassword: {
    position: "absolute",
    top: 16,
    right: 10,
  },
  containerPass: { position: "relative" },
  showPasswordText: {
    color: "#1B4371",
    fontSize: 16,
    // fontWeight: 400,
    // fontFamily: "Roboto-Regular",
  },
  textBtn: {
    textAlign: "center",
    marginBottom: 45,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    // fontWeight: 400,a
  },
});
export default LoginScreen;
