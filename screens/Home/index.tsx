import React from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

import { View, Text, TouchableOpacity } from "react-native";

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
        <ClickableCard
          text={"Measurement"}
          url={"Nice Feet"}
          background={
            "linear-gradient(203.55deg, #67B26F -4.43%, #4CA2CD 79.02%)"
          }
        />
        <ClickableCard
          text={"Reports"}
          url={"Send Peeks"}
          background={
            "linear-gradient(203.55deg, #A770EF -4.43%, #CF8BF3 31.21%, #FDB99B 79.02%)"
          }
        />
      </View>
    </View>
  );
};

export default Home;
