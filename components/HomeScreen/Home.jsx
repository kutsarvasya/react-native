import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  AntDesign,
  Feather,
  SimpleLineIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import PostsScreen from "../PostsScreen/PostsScreen";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import BackBtn from "../BackBtn/BackBtn";

const Tabs = createBottomTabNavigator();

const Home = ({ navigation }) => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#FFFFFF",
        inactiveTintColor: "#212121",
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarShowLabel: false,
        tabBarItemStyle: {
          flex: 1,
          height: 40,
          borderRadius: 20,
          marginLeft: 35,
          marginRight: 35,
          marginTop: 5,
        },
      })}
      initialRouteName="PostsScreen"
      backBehavior="firstRoute"
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerRight: () => (
            <LogoutBtn logout={() => navigation.navigate("Login")} />
          ),
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name={"grid"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          headerLeft: () => (
            <BackBtn back={() => navigation.navigate("PostsScreen")} />
          ),
          title: "Створити публікацію",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name={"plus"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name={"user"} size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
