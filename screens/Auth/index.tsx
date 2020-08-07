import React from "react";
import { View, Button } from "react-native";

const Auth = ({ navigation }) => {
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
