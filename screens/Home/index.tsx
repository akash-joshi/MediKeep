import React from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

import { View, Text } from "react-native";

const Home = ({ navigation }: StackScreenProps<RootStackParamList, "Home">) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Yahoo Akash</Text>
    </View>
  );
};

export default Home;
