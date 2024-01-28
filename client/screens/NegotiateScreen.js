import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  StylesSheet,
  ScrollView,
} from "react-native";
import EmotionFace from "../components/EmotionFace";
import Suggestion from "../components/Suggestion";



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
            marginTop:10
          }}
        >
          <EmotionFace emotion="happy" />
        </View>

      <View
        style={{
          flex: 1,
          flexDirection: "column",
          marginHorizontal: 10,
          height: "90%",
          //marginLeft: "5%",
          marginRight: "10%"
        }}
      >
        <View
          style={{
            backgroundColor: "black",
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            width: 190,
            height: 62,
            marginTop: 20,
            marginRight: 19,
            marginBottom:"5%"
          }}
        >
          <Text style={{ fontSize: 25, color: "white" }}>Offer Type</Text>
        </View>
        <View
          style={{
            backgroundColor: "black",
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            width: 190,
            height: 62,
            marginRight: 19,
          }}
        >
          <Text style={{ fontSize: 25, color: "white" }}>$100</Text>
        </View>
      </View>
        
      </View>
        <View
        style={{
          flex: 4,
          backgroundColor: "steelblue",
          height: 72,
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
        }}
      >
        
        <View
          style={{
            backgroundColor: "black",
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            height: 62,
          }}
        >
          <Text style={{ color: "white", fontSize: 30 }}>
            Price History
          </Text>
        
        </View>
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Suggestion text="Seller up 👍" />
          <Suggestion text="Buyer down 👎" />
          <Suggestion text="I don't want to hear 🙉💸" />
          <Suggestion text="Just pay 🫴💵" />
          <Suggestion text="Done more plz🫤👎" />
          <Suggestion text="Good 🤝 ?"  />
        </ScrollView>
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
