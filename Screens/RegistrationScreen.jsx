import React, { useEffect, useState } from "react";
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
    login: yup
      .string()
      .min(4, "Too Short!")
      .max(24, "Too Long!")
      .required("Login is required"),
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

const RegistrationScreen = () => {
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
  const onSubmit = (data) => console.log(data);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/photo-bg.jpg")}
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
            }}
          >
            <Image
              source={require("../assets/avatar.jpg")}
              style={{
                width: 120,
                height: 120,
                borderRadius: 16,
                backgroundColor: "#F6F6F6",
                position: "absolute",
                top: -10,
                left: "50%",
                transform: [{ translateX: -50 }, { translateY: -50 }],
              }}
            />
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
                        borderColor: errors.login ? "#E12800" : "#E8E8E8",
                      }}
                      placeholder="Логін"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="login"
                />
                {errors.login && (
                  <Text style={styles.errorMessage}>
                    {errors.login.message}
                  </Text>
                )}
              </View>
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
            {!isShowButton ? (
              <>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text style={styles.text}>Увійти</Text>
                </TouchableOpacity>
                <Text style={styles.textBtn}>
                  Немає акаунту? Зареєструватися
                </Text>
              </>
            ) : null}
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
  inputContainer: {},
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

    alignItems: "center",
    height: 51,
    justifyContent: "center",
    borderRadius: 100,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: "#fff",
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
  },
  textBtn: {
    textAlign: "center",
    marginBottom: 45,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
  },
});
export default RegistrationScreen;

// import React, { useState } from "react";
// import {
//   View,
//   TextInput,
//   StyleSheet,
//   Text,
//   Image,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   Dimensions,
//   Button,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from "react-native";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import { StatusBar } from "expo-status-bar";

// const validationSchema = Yup.object().shape({
//   login: Yup.string()
//     .min(4, "Too Short!")
//     .max(24, "Too Long!")
//     .required("Login is required"),
//   email: Yup.string()
//     .email("Must be a valid email")
//     .required("Email is required"),
//   password: Yup.string()
//     .min(6, "Too short password")
//     .max(12, "Too long")
//     .required("Password is required"),
// });
// const { width } = Dimensions.get("window");

// const RegistrationScreen = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [loginInputShow, setLoginInputShow] = useState(false);
//   const [emailInputShow, setEmailInputShow] = useState(false);
//   const [passwordInputShow, setPasswordInputShow] = useState(false);
//   const [isShowButton, setIsShowButton] = useState(false);

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <View style={styles.container}>
//         <Image
//           style={styles.image}
//           source={require("../assets/photo-bg.jpg")}
//         />
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : null}
//         >
//           <Formik
//             validationSchema={validationSchema}
//             onSubmit={(values) => {
//               console.log("error1");
//             }}
//             validateOnChange={false}
//             validateOnBlur={false}
//             initialValues={{ login: "", email: "", password: "" }}
//           >
//             {(props) => (
//               <View
//                 style={{
//                   width: "100%",
//                   backgroundColor: "#fff",
//                   borderTopLeftRadius: 25,
//                   borderTopRightRadius: 25,
//                   paddingLeft: 16,
//                   paddingRight: 16,
//                   paddingTop: 92,
//                 }}
//               >
//                 <Image
//                   source={require("../assets/avatar.jpg")}
//                   style={{
//                     width: 120,
//                     height: 120,
//                     borderRadius: 16,
//                     backgroundColor: "#F6F6F6",
//                     position: "absolute",
//                     top: -10,
//                     left: "50%",
//                     transform: [{ translateX: -50 }, { translateY: -50 }],
//                   }}
//                 />
//                 <Text
//                   style={{
//                     textAlign: "center",
//                     fontSize: 30,
//                     fontWeight: 500,
//                     marginBottom: 33,
//                   }}
//                 >
//                   Реєстрація
//                 </Text>
//                 <View style={{ gap: 16, marginBottom: 43 }}>
//                   <TextInput
//                     style={{
//                       ...styles.input,
//                       borderColor: loginInputShow ? "#FF6C00" : "#E8E8E8",
//                     }}
//                     placeholderTextColor={
//                       loginInputShow ? "#FF6C00" : "#BDBDBD"
//                     }
//                     placeholder="Логін"
//                     returnKeyType="done"
//                     onChangeText={props.handleChange("login")}
//                     error={props.errors.login}
//                     onBlur={() => {
//                       setLoginInputShow(false);
//                       setIsShowButton(false);
//                     }}
//                     onFocus={() => {
//                       setLoginInputShow(true);
//                       setIsShowButton(true);
//                     }}
//                     value={props.values.login}
//                   />
//                   {console.log("2", props.errors.password)}
//                   <TextInput
//                     style={{
//                       ...styles.input,
//                       borderColor: emailInputShow ? "#FF6C00" : "#E8E8E8",
//                     }}
//                     placeholder="Адреса електронної пошти"
//                     returnKeyType="done"
//                     onChangeText={props.handleChange("email")}
//                     error={props.errors.email}
//                     onBlur={() => {
//                       setEmailInputShow(false);
//                       setIsShowButton(false);
//                     }}
//                     onFocus={() => {
//                       setEmailInputShow(true);
//                       setIsShowButton(true);
//                     }}
//                     placeholderTextColor={
//                       emailInputShow ? "#FF6C00" : "#BDBDBD"
//                     }
//                     value={props.values.email}
//                   />
//                   <View style={{}}>
//                     <TextInput
//                       style={{
//                         ...styles.input,
//                         borderColor: passwordInputShow ? "#FF6C00" : "#E8E8E8",
//                       }}
//                       placeholderTextColor={
//                         passwordInputShow ? "#FF6C00" : "#BDBDBD"
//                       }
//                       secureTextEntry={!passwordVisible}
//                       placeholder="Пароль"
//                       returnKeyType="done"
//                       onChangeText={props.handleChange("password")}
//                       error={props.errors.password}
//                       onBlur={() => {
//                         setPasswordInputShow(false);
//                         setIsShowButton(false);
//                       }}
//                       onFocus={() => {
//                         setPasswordInputShow(true);
//                         setIsShowButton(true);
//                       }}
//                       value={props.values.password}
//                     />
//                     <TouchableOpacity
//                       style={styles.showPassword}
//                       onPress={() => {
//                         setPasswordVisible(!passwordVisible);
//                       }}
//                     >
//                       <Text style={styles.showPasswordText}>
//                         {passwordVisible ? "Сховати" : "Показати"}
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>

//                 {!isShowButton ? (
//                   <>
//                     <TouchableOpacity style={styles.btn}>
//                       <Text style={styles.text}>Зареєстуватися</Text>
//                     </TouchableOpacity>
//                     <Text style={styles.textBtn} onPress={() => {}}>
//                       Вже є акаунт? Увійти
//                     </Text>
//                   </>
//                 ) : null}
//               </View>
//             )}
//           </Formik>
//         </KeyboardAvoidingView>
//         <StatusBar style="auto" />
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "flex-end",
//   },
//   image: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     zIndex: -1,
//   },
//   inputContainer: {
//     // flex: 1,
//   },
//   input: {
//     // borderColor: "#000",
//     borderWidth: 1.0,
//     height: 50,
//     padding: 10,
//     backgroundColor: "#F6F6F6",
//     borderRadius: 8,
//     fontSize: 16,
//   },
//   btn: {
//     backgroundColor: "#FF6C00",
//     // width: "100%",
//     alignItems: "center",
//     height: 51,
//     justifyContent: "center",
//     borderRadius: 100,
//     marginBottom: 16,
//   },
//   text: {
//     fontSize: 16,
//     color: "#fff",
//     // fontWeight: 400,
//   },
//   showPassword: {
//     position: "absolute",
//     top: 16,
//     right: 10,
//   },
//   containerPass: { position: "relative" },
//   showPasswordText: {
//     color: "#1B4371",
//     fontSize: 16,
//     // fontWeight: 400,
//     fontFamily: "Roboto-Regular",
//   },
//   textBtn: {
//     textAlign: "center",
//     marginBottom: 45,
//     // fontFamily: "Roboto-Regular",
//     fontSize: 16,
//     fontStyle: "normal",
//     backgroundColor: "#fff",
//     // fontWeight: 400,
//   },
// });
// export default RegistrationScreen;
