import React from "react";
import { View, Button } from "react-native";

const Auth = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Sign in with Google"
        onPress={() => {
          alert("Button Pressed");
        }}
      />
    </View>
  );
};

export default Auth;
