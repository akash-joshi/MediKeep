import React from "react";

import { View, Text, TouchableOpacity } from "react-native";

export default function ClickableCard({ text, url, background }) {
  return (
    <TouchableOpacity
      onPress={() => alert(url)}
      style={{
        background,
        borderRadius: 10,
        width: "90%",
        textAlign: "center",
        justifyContent: "center",
        height: 112,
        marginBottom: "1em",
      }}
    >
      <Text style={{ color: "white", fontSize: 20 }}>{text}</Text>
    </TouchableOpacity>
  );
}
