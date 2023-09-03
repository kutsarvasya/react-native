import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Too short password")
    .max(12, "Too long")
    .required("Password is required"),
});
const { width } = Dimensions.get("window");

const LoginScreen = ({ changeScreen }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailInputShow, setEmailInputShow] = useState(false);
  const [passwordInputShow, setPasswordInputShow] = useState(false);
  const [isShowButton, setIsShowButton] = useState(false);
  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("error1");
      }}
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{ login: "", email: "", password: "" }}
    >
      {(props) => (
        <View
          style={{
            width: "100%",
            backgroundColor: "#fff",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 92,
            // marginBottom: -150,
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
          <View style={{ gap: 16, marginBottom: 43 }}>
            <TextInput
              style={{
                ...styles.input,
                borderColor: emailInputShow ? "#FF6C00" : "#E8E8E8",
              }}
              placeholder="Адреса електронної пошти"
              returnKeyType="done"
              onChangeText={props.handleChange("email")}
              error={props.errors.email}
              onBlur={() => {
                setEmailInputShow(false);
                setIsShowButton(false);
              }}
              onFocus={() => {
                setEmailInputShow(true);
                setIsShowButton(true);
              }}
              placeholderTextColor={emailInputShow ? "#FF6C00" : "#BDBDBD"}
              value={props.values.email}
            />
            <View style={{}}>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: passwordInputShow ? "#FF6C00" : "#E8E8E8",
                }}
                placeholderTextColor={passwordInputShow ? "#FF6C00" : "#BDBDBD"}
                secureTextEntry={!passwordVisible}
                placeholder="Пароль"
                returnKeyType="done"
                onChangeText={props.handleChange("password")}
                error={props.errors.password}
                onBlur={() => {
                  setPasswordInputShow(false);
                  setIsShowButton(false);
                }}
                onFocus={() => {
                  setPasswordInputShow(true);
                  setIsShowButton(true);
                }}
                value={props.values.password}
              />
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
          {!isShowButton ? (
            <>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.text}>Увійти</Text>
              </TouchableOpacity>
              <Text style={styles.textBtn} onPress={changeScreen}>
                Немає акаунту? Зареєструватися
              </Text>
            </>
          ) : null}
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // gap: 16,
    // justifyContent: "flex-end",
    // marginBottom: 43,
    // paddingTop: 150,
    // height: "65%",
    // paddingRight: 16,
    // paddingLeft: 16,
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
