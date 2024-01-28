// TestPage.js
import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import axios from "axios";

export default function TestPage({ navigation }) {
  const [responseText, setResponseText] = useState("Empty");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://uofp-1-p7103236.deta.app/cohelp"
      );
      const data = response.data.json_data;
      const low = data.prices.low;
      const medium = data.prices.medium;
      const high = data.prices.high;
      const tips = data.negotiation_tips;

      console.log(JSON.stringify(response.data));
      setResponseText(
        `low: ${low}\nmed: ${medium}\nhigh: ${high}\ntips: ${tips}`
      );
      // setResponseText("Hello");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Test Page</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Text>{responseText}</Text>
      <Button title="Run" onPress={fetchData} />
    </View>
  );
}
