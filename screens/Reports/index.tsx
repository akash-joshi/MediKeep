import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";

import { RootStackParamList } from "../../types";

import { View, Text, TouchableOpacity, Button } from "react-native";

import ClickableCard from "../../components/Home/ClickableCard";

const Home = ({ navigation }: StackScreenProps<RootStackParamList, "Home">) => {
  return (
    <View style={{ flex: 1, alignItems: "center", width: "100%" }}>
      <View
        style={{
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            background: "black",
            borderRadius: 200,
            textAlign: "center",
            alignItems: "center",
            marginTop: "0.5em",
            marginLeft: "1em",
            paddingTop: 9,
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
          onPress={() => navigation.pop()}
        >
          <AntDesign name="arrowleft" size={20} color="white" />
        </TouchableOpacity>
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
