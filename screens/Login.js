import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";

const Login = ({ navigation: { navigate } }) => {
  const [show, setShow] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();

  useEffect(() => {
    AsyncStorage.getItem("token").then((value) => {
      axios.post(API_URL + "/check-session", {token:value}).then((resp) => {
        if (resp.data.success) {
          dispatch({
            type: "LOGINDATA",
            payload: resp.data.user,
          });
          navigate("Home");
        }else{
          console.warn("you are not login");
        }
      });
    });
  }, []);

  const loginData = (data) => {
    console.log(data)
    axios
      .post(API_URL + "/login", data)
      .then((resp) => {
        if (resp.data.success) {
          dispatch({
            type: "LOGINDATA",
            payload: resp.data.user,
          });
          AsyncStorage.setItem("token", resp.data.token);
          navigate("Home");
        } else {
        }
      })
      .catch((err) => {});
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
      className="flex-1 bg-blue-500 items-center"
    >
      <ScrollView className="w-full">
        <View className="py-16 h-64 w-full justify-end">
          <Text className="text-5xl font-bold px-5 text-white">Welcome</Text>
        </View>
        <View className="flex gap-y-5 h-auto pb-40 pt-7 px-8 bg-white rounded-t-2xl w-full">
          <View>
            <Text className="text-2xl font-semibold">Email</Text>
            <View className="flex-row border rounded-lg items-center px-2">
              <Controller
                control={control}
                name="user_email"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Your Email"
                    inputMode="email"
                    value={value}
                    onChangeText={(value) => onChange(value)}
                    autoComplete="email"
                    keyboardType="email-address"
                    className="flex-1 text-xl py-2 px-3"
                  />
                )}
              />
              <FontAwesome name="user-o" size={28} />
            </View>
          </View>
          <View>
            <Text className="text-2xl font-semibold">Password</Text>
            <View className="flex-row border rounded-lg items-center px-2">
              <Controller
                control={control}
                name="user_password"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Your Pasword"
                    inputMode="text"
                    autoComplete="password"
                    secureTextEntry={show}
                    value={value}
                    onChangeText={(value) => onChange(value)}
                    className="flex-1 text-lg py-2 px-3"
                  />
                )}
              />
              {show ? (
                <FontAwesome
                  name="eye-slash"
                  onPress={() => {
                    setShow(false);
                  }}
                  size={25}
                />
              ) : (
                <FontAwesome
                  name="eye"
                  onPress={() => {
                    setShow(true);
                  }}
                  size={25}
                />
              )}
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={handleSubmit(loginData)}
              activeOpacity={0.7}
              className="rounded-lg bg-blue-500 w-1/2 mx-auto p-1 justify-center items-center"
            >
              <Text className="text-white text-base font-semibold w-full text-center">
                SIGN IN
              </Text>
            </TouchableOpacity>
            <View className="my-2" />
            <TouchableOpacity
              onPress={() => {
                navigate("Signup");
              }}
              activeOpacity={0.7}
              className="rounded-lg bg-orange-400 w-1/2 mx-auto p-1 justify-center items-center"
            >
              <Text className="text-white text-base font-semibold w-full text-center">
                SIGN UP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
