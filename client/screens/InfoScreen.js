import React, { useState } from "react";

import {
  Button,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

export default function InfoScreen({ navigation }) {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [country, setCountry] = useState("");
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#35465c",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Text style={styles.titleText}>Back to the Market</Text>
      </View>

      <View
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
        }}
      >
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => setItem(text)}
          value={item}
          placeholder="Item"
        />

        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => setPrice(text)}
          value={price}
          placeholder="Price"
        />

        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => setCountry(text)}
          value={country}
          placeholder="Country"
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            margintop: 20,
          }}
        >
          <Button title="Back" onPress={() => navigation.navigate("Home")} />
          <Button
            title="Continue"
            onPress={() => {
              console.log(
                `Item: ${item}, Price: ${price}, Country: ${country}`
              );
              navigation.navigate("Negotiate");
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },

  textInput: {
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#000",
    padding: 5,
    marginVertical: 5,
    width: "100%",
    backgroundColor: "white",
  },
});
