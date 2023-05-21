import { useLayoutEffect,useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { API_URL } from "@env";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Platform,
  StatusBar,
  TextInput,
  Button,
  ScrollView,
} from "react-native";

const Expense = () => {
  const user = useSelector((store) => store.userSection);
  const { control, handleSubmit, reset } = useForm();
  const navigate = useNavigation();
  const dispatch = useDispatch();
  let total = 0;
  let expense = 0;
  let income = 0;

  for (let item of user.history) {
    if (item.type=== "minus") {
        expense -= +item.amount;
        total += +item.amount;
    } else {
      total += +item.amount;
      income += +item.amount;
    }
  }
  
  useLayoutEffect(() => {
    navigate.setOptions({
      headerShown: false,
    });
  }, []);

  const transactions = (data) => {
    data.date = new Date().toLocaleDateString();
    if(data.amount[0]== "-"){
      data.type= "minus"
    }else{
      data.type= "plus"
    }
    axios.put(API_URL + "/transaction", { id: user._id, data });
    dispatch({
      type: "TRANSACTION",
      payload: data,
    });
    reset();
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View className="bg-teal-700 h-52 px-7 py-5 ">
        <View className="flex-row justify-between">
          <View>
            <Text className="text-white text-3xl font-extrabold">Balance</Text>
            <Text className="text-white my-2 text-2xl">
              ${total}
            </Text>
          </View>
          <View className="w-2/5">
            <FontAwesome name="user-circle-o" color={"white"} size={45} />
            <Text className="my-2 text-xl text-white">{user.user_name}</Text>
          </View>
        </View>
        <View className="flex-row gap-20 justify-center">
          <View>
            <Text className="text-white text-2xl font-bold">Income</Text>
            <View className="flex-row justify-center items-center">
              <Text className="text-green-400 text-xl">$</Text>
              <Text className="text-white text-lg">{income}</Text>
            </View>
          </View>
          <View className="justify-center">
            <Text className="text-white text-2xl font-bold">Expense</Text>
            <View className="flex-row items-center justify-center">
              <Text className="text-red-400 text-xl">$</Text>
              <Text className="text-white text-lg">{expense}</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView>
        <View>
          <ImageBackground
            source={require("../assets/loginbg.jpg")}
            style={{ width: "100%", height: 500 }}
            opacity={0.8}
          >
            <View className="px-3 py-16 justify-center gap-8">
              <View>
                <Text className="text-2xl font-semibold">Description</Text>
                <View className="flex-row bg-white border rounded-lg items-center px-2">
                  <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        placeholder="Description"
                        inputMode="text"
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        keyboardType="default"
                        className="flex-1 text-xl py-2 px-3"
                      />
                    )}
                  />
                  <FontAwesome name="pencil" size={20} />
                </View>
              </View>
              <View>
                <Text className="text-2xl font-semibold">Amount</Text>
                <View className="flex-row border bg-white rounded-lg items-center px-2">
                  <Controller
                    control={control}
                    name="amount"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        placeholder="Amount"
                        inputMode="numeric"
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        keyboardType="number-pad"
                        className="flex-1 text-xl py-2 px-3"
                      />
                    )}
                  />
                  <FontAwesome name="money" size={20} />
                </View>
              </View>
              <View className="mt-6">
                <Button
                  title="Add Trasaction"
                  onPress={handleSubmit(transactions)}
                  color="rgb(8 60 112)"
                />
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Expense;
