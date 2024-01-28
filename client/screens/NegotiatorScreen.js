// screens/Negotiator.js

import React, { useState } from "react";
import axios from "axios";

import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import EmotionFace from "../components/EmotionFace";
import Suggestion from "../components/Suggestion";

const NegotiatorScreen = ({ route }) => {
  // State for storing TextInput value
  const [merchantResponse, setMerchantResponse] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [placeholdResponse, setPlaceholdResponse] = useState("No responses");
  const { item, price, country, currency, low, medium, high, tips } =
    route.params;

  const [suggestedPrice, addSuggestedPrice] = [];
  const addSuggestion = (newSuggestion) => {
    addSuggestedPrice((currentSuggestions) => [
      ...currentSuggestions,
      newSuggestion,
    ]);
  };

  const getHigherValue = (value) => {
    if (typeof value === "string" && value.includes("-")) {
      const values = value.split("-").map(Number);
      return Math.max(...values);
    }
    return Number(value);
  };
  const numericalPrice = getHigherValue(price);
  const numericalLow = getHigherValue(low);
  const numericalMedium = getHigherValue(medium);
  const numericalHigh = getHigherValue(high);

  const determineEmotion = (price, low, medium, high) => {
    if (price <= low) {
      return "happy";
    } else if (price <= medium) {
      return "surprised";
    } else if (price <= high) {
      return "sad";
    } else {
      return "angry";
    }
  };
  console.log(numericalPrice, numericalLow, numericalMedium, numericalHigh);
  console.log(
    determineEmotion(
      numericalPrice,
      numericalLow,
      numericalMedium,
      numericalHigh
    )
  );

  const [responseData, setResponseData] = useState([]);
  const testPress = async () => {
    examples = [
      "I want 10% off",
      "Come on thats bad price give me local price",
      "My friend, give friend price",
    ];
    setResponseData(examples);
    console.log("processed");
    console.log(examples);
  };
  const handlePress = async () => {
    setPlaceholdResponse("Loading...");
    console.log("PROCESSING");
    const data = {
      country: country,
      product: item,
      haggle: merchantResponse + "My friend for the price of " + price,
    };

    const response = await axios.post(
      "https://uofp-1-p7103236.deta.app/suggestions",
      data
    );

    setResponseData(response.data.json_data.suggestions);
    console.log(response.data.json_data.suggestions);
    setPlaceholdResponse("No responses");

    // Clear the merchantResponse state
    setMerchantResponse("");
  };
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
          <EmotionFace
            emotion={determineEmotion(
              numericalPrice,
              numericalLow,
              numericalMedium,
              numericalHigh
            )}
          />
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
              marginBottom: "10%",
            }}
          >
            <Text style={{ fontSize: 25, color: "white" }}>{item}</Text>
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
            <Text style={{ fontSize: 25, color: "white" }}>{price}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 4,
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
          paddingBottom: 100,
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
          {responseData.length > 0 ? (
            responseData.map((suggestion, index) => (
              <Suggestion key={index} text={suggestion} />
            ))
          ) : (
            <Text>{placeholdResponse}</Text>
          )}
        </ScrollView>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-top",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center", // Aligns the TextInput vertically in the center
            width: "100%", // Makes the View take the full width of the parent
            paddingHorizontal: 10, // Adds some horizontal padding
            marginTop: -100,
            marginBottom: 50,
          }}
        >
          <TextInput
            placeholder="Merchant response"
            value={merchantResponse} // Bind TextInput value to state
            onChangeText={(text) => setMerchantResponse(text)} // Update state on change
            style={{
              height: 100, // Set a fixed height for the TextInput
              borderWidth: 1,
              borderColor: "black",
              textAlignVertical: "top",
              borderRadius: 15,
              marginTop: -100,
              backgroundColor: "white",
              width: "100%", // Makes the TextInput take the full width of the parent
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            ...styles.button,
            width: "100%",
            marginTop: -100,
            marginBottom: 100,
          }}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Negotiate!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "purple",
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default NegotiatorScreen;
