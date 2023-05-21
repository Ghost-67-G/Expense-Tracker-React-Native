import React, { useLayoutEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Expense from "./Expense";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import History from "./History";
import Profile from "./Profile";


const Tab = createBottomTabNavigator();
const Home = () => {
  const navigate = useNavigation();
  useLayoutEffect(() => {
    navigate.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View className="flex-1">
      <Tab.Navigator>
        <Tab.Screen
          name="Expense"
          options={{
            tabBarLabel: "Expense",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome
                name="dollar"
                color={color}
                size={size}
              />
            ),
          }}
          component={Expense}
        />
        <Tab.Screen
          name="History"
          options={{
            tabBarLabel: "History",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome
                name="rotate-left"
                color={color}
                size={size}
              />
            ),
          }}
          component={History}
        />
        <Tab.Screen
          name="Profile"
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome
                name="user-circle-o"
                color={color}
                size={size}
              />
            ),
          }}
          component={Profile}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Home;
