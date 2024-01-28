import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  StylesSheet,
} from "react-native";
import EmotionFace from "../components/EmotionFace";



const { height } = Dimensions.get("window");

export default function NegotiateScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#35465c" }}>
      <View style={{ flex: 2, flexDirection: "row" }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 25,
          }}
        >
          <EmotionFace emotion="happy" />
        </View>
        <View
          style={{
            backgroundColor: "black",
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            width: 190,
            height: 62,
            marginLeft: 19,
            marginTop: 35,
            marginRight: 19,
          }}
        >
          <Text style={{ fontSize: 25, color: "white" }}>Offer Type</Text>
        </View>
      </View>
      <View style={{ flex: 5, backgroundColor: "steelblue" }}>
        <View style={{ flex: 1 }}>
          <Text>Current Price</Text>
        </View>
      </View>
      <View style={{ flex: 3 }}>
        <View style={{ flex: 1 }}>
          <Text>Textbox</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TextInput placeholder="Input Text Box" />
        </View>
        <TextInput
          placeholder="Input Text Box"
          style={{
            borderRadius: 10,
            borderWidth: 3,
            borderColor: "#000",
            // Add other styles as needed
          }}
        />

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Button
            title="Haggle"
            onPress={() => navigation.navigate("Negotiator")}
          />
          <Text> </Text>
          <Button title="✅" onPress={() => navigation.navigate("Success")} />
          <Text> </Text>
          <Button title="❌" onPress={() => navigation.navigate("Failed")} />
        </View>
      </View>
    </View>
  );
}
