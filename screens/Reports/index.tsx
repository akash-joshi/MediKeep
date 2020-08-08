import React from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

import { View, Text, TouchableOpacity, Button } from "react-native";

import ClickableCard from "../../components/Home/ClickableCard";

const Home = ({ navigation }: StackScreenProps<RootStackParamList, "Home">) => {
  return (
    <View style={{ flex: 1, alignItems: "center", width: "100%" }}>
      <View
        style={{
          width: "100%",
          textAlign: "right",
          marginRight: "2em",
          marginTop: "0.5em",
        }}
      >
        <Text style={{ fontSize: 20 }}>MediKeep</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text>FAB</Text>
      </View>
    </View>
  );
};

export default Home;
