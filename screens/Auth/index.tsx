import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { View, Button } from "react-native";

const Auth = ({ navigation }: StackScreenProps<RootStackParamList, "Root">) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Sign in with Google"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </View>
  );
};

export default Auth;
