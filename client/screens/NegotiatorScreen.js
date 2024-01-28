// screens/Negotiator.js

import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import EmotionFace from "../components/EmotionFace";
import Suggestion from "../components/Suggestion";

const NegotiatorScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 2,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
            marginLeft: 35,
            marginTop: 15,
          }}
        >
          <EmotionFace emotion="happy" />
        </View>

        <View
          style={{
            flex: 2,
            flexDirection: "column",
            marginHorizontal: 10,
            height: "90%",
            marginLeft: "10%",
          }}
        >
          <View
            style={{
              backgroundColor: "black",
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              marginTop: 30,
              marginBottom: '10%'
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
              flex: 1,
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
            Suggested Responses
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Suggestion text="I'll give you $50" />
          <Suggestion text="I'll give you $50" />
          <Suggestion text="I'll give you $50" />
          <Suggestion text="I'll give you $50" />
          <Suggestion text="I'll give you $50" />
          <Suggestion text="I'll give you $50" />
        </ScrollView>
      </View>
      <View style={{ flex: 1, backgroundColor: "Red" }}>
        <Text>Textbox</Text>
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            borderRadius: 15,
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            width: "90%",
            height: 63,
          }}
          onPress={() => {}}
        >
          <Text style={{ color: "white" }}>Listen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NegotiatorScreen;
