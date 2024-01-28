import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Suggestion = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "#CECCCC",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 3,
    padding: 10,
  },
});

export default Suggestion;
