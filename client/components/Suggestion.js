import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Suggestion = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25 }}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "#CECCCC",
    height: 62,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 3,
  },
});

export default Suggestion;
