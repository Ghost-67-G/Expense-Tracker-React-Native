import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useSelector } from "react-redux";

import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TextInput,
} from "react-native";

const History = () => {
  const user = useSelector((store) => store.userSection);

  return (
    <SafeAreaView>
      <View>
        <View className="flex-row items-center border my-1 gap-3">
          <FontAwesome name="search" size={20} />
        <TextInput placeholder="Search Trasactions" className="py-2 flex-1"/>
        </View>
        <FlatList
          data={user.history}
          renderItem={({ item }) => (
            <View className="flex-row bg-emerald-500 my-1 px-3 py-2 justify-between">
              <View className="flex-row items-center gap-3">
                <FontAwesome name="trash" size={20} color="#8A0707"/>
              <Text>{item.description}</Text>
              </View>
              <Text>${item.amount}</Text>
              <View className="flex-row gap-3">
              <Text>{item.date}</Text>
                <FontAwesome name="edit" size={20} color="blue"/>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};
export default History;
