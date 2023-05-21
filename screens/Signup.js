import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useForm, Controller } from "react-hook-form";
import { API_URL } from "@env";

import {
  View,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Platform,
  StatusBar,
  ScrollView,
  ImageBackground,
} from "react-native";
import axios from "axios";

const Signup = ({ navigation: { navigate } }) => {
  const [show, setShow] = useState(true);
  const [password, setPassword] = useState(false);
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onSubmit = (data) => {
    console.log(data)
    if (data.user_password === data.password) {
      data.history = [];
      axios.post(API_URL + "/signup", data).then((resp) => {
        if (resp.data.success) {
          navigate("Login");
        } else {
          console.warn("Something Went Wrong");
        }
      });
    } else {
      setPassword(true);
    }
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
      className="flex-1 bg-blue-500 items-center"
    >
      <ScrollView className="w-full">
        {/* <Image style={{width:"100%",height:"100%"}} source={{uri:"../assets/LoginScreenLogo.jpg"}}  /> */}
        <View className="py-16 h-60 w-full justify-end">
          <Text className="text-4xl font-bold px-5 text-white">
            Create Account
          </Text>
        </View>
        <View className="flex-1 gap-y-3 pb-16 pt-2 px-8 bg-white rounded-t-2xl w-full">
          <View>
            <Text className="text-2xl font-semibold">UserName</Text>
            <View className="flex-row border items-center px-2">
              <Controller
                control={control}
                name="user_name"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="UserName"
                    autoComplete="name"
                    value={value}
                    onChangeText={(value) => onChange(value)}
                    className="flex-1 text-lg py-1 px-3"
                  />
                )}
              />
              <FontAwesome name="user-o" size={28} />
            </View>
          </View>
          <View>
            <Text className="text-2xl font-semibold">Email</Text>
            <View className="flex-row border items-center px-2">
              <Controller
                control={control}
                name="user_email"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Your Email"
                    inputMode="email"
                    autoComplete="email"
                    keyboardType="email-address"
                    value={value}
                    onChangeText={(value) => onChange(value)}
                    className="flex-1 text-lg py-1 px-3"
                  />
                )}
              />
              <FontAwesome name="envelope-o" size={28} />
            </View>
          </View>
          <View>
            <Text className="text-xl font-semibold">Password</Text>
            <View className="flex-row border items-center px-2">
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
                    className="flex-1 text-lg py-1 px-3"
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
            <Text className="text-xl font-semibold">Confirm Password</Text>
            <View className="flex-row border items-center px-2">
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Your Pasword"
                    inputMode="text"
                    autoComplete="password"
                    secureTextEntry={show}
                    value={value}
                    onChangeText={(value) => onChange(value)}
                    className="text-lg flex-1 py-1 px-3"
                  />
                )}
              />
            </View>
            {password ? (
              <Text className="text-red-500 text-sm">
                Password Does not Match
              </Text>
            ) : null}
          </View>
          <View>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              activeOpacity={0.7}
              className="rounded-lg bg-orange-400 w-1/2 mx-auto p-1 justify-center items-center"
            >
              <Text className="text-white text-base font-semibold w-full text-center">
                SIGN UP
              </Text>
            </TouchableOpacity>
            <View className="my-2" />
            <TouchableOpacity
              onPress={() => {
                navigate("Login");
              }}
              activeOpacity={0.7}
              className="rounded-lg bg-blue-500 w-1/2 mx-auto p-1 justify-center items-center"
            >
              <Text className="text-white text-base font-semibold w-full text-center">
                SIGN IN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
