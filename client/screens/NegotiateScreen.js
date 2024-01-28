import React, { useState, useEffect } from "react";
import axios from "axios";
import { ActivityIndicator } from "react-native";

import {
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import EmotionFace from "../components/EmotionFace";
import Suggestion from "../components/Suggestion";

// const { height } = Dimensions.get("window");

export default function NegotiateScreen({ route, navigation }) {
  const {
    item,
    price: initialPrice,
    country,
    currency,
    low,
    medium,
    high,
    tips,
  } = route.params;
  const [price, setPrice] = useState(initialPrice);
  const [lowPrice, setLowPrice] = useState(low);
  const [mediumPrice, setMediumPrice] = useState(medium);
  const [highPrice, setHighPrice] = useState(high);
  const [negotiationTips, setNegotiationTips] = useState(tips);
  const [loading, setLoading] = useState(true);
  const [emotion, setEmotion] = useState("");

  const getHigherValue = (value) => {
    if (typeof value === "string" && value.includes("-")) {
      const values = value.split("-").map(Number);
      return Math.max(...values);
    }
    return Number(value);
  };

  const [numericalPrice, setNumericalPrice] = useState(getHigherValue(price));
  const numericalLow = getHigherValue(low);
  const numericalMedium = getHigherValue(medium);
  const numericalHigh = getHigherValue(high);

  const [responseData, setResponseData] = useState([]);
  const [inputText, setInputText] = useState("");

  const fetchData = async () => {
    if (!lowPrice || !mediumPrice || !highPrice || !negotiationTips) {
      try {
        const response = await axios.post(
          "https://uofp-1-p7103236.deta.app/prices",
          {
            country: country,
            product: item,
            price: price,
          }
        );
        const data = response.data.json_data;
        setLowPrice(data.prices.low);
        setMediumPrice(data.prices.medium);
        setHighPrice(data.prices.high);
        setNegotiationTips(data.negotiation_tips);
        setLoading(false); // set loading to false after fetching the data
      } catch (error) {
        console.error(error);
      }
    } else {
      setLoading(false); // set loading to false if there's no need to fetch data
    }
  };

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

  const handleAdd = async (newPrice) => {
    const numericalNewPrice = getHigherValue(newPrice);
    setResponseData((prevState) => [...prevState, newPrice + currency]);
    setPrice(numericalNewPrice);
    setInputText("");
    setNumericalPrice(numericalNewPrice);
    setEmotion(
      determineEmotion(
        numericalNewPrice,
        getHigherValue(lowPrice),
        getHigherValue(mediumPrice),
        getHigherValue(highPrice)
      )
    );
  };

  useEffect(() => {
    fetchData();
    const numericalPrice = getHigherValue(price);
    setResponseData((prevState) => [
      ...prevState,
      `${numericalPrice} ${currency}`,
    ]);
    setNumericalPrice(numericalPrice);
    setEmotion(
      determineEmotion(
        numericalPrice,
        getHigherValue(lowPrice),
        getHigherValue(mediumPrice),
        getHigherValue(highPrice)
      )
    );
    console.log("NegotiateScreen: useEffect");
  }, []); // add dependencies here

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#35465c" }}>
      <View style={{ flex: 2, flexDirection: "row" }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 25,
            marginTop: 10,
          }}
        >
          <EmotionFace emotion={emotion} />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "column",
            marginHorizontal: 10,
            height: "90%",
            //marginLeft: "5%",
            marginRight: "10%",
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
              marginBottom: "5%",
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
              width: 190,
              height: 62,
              marginRight: 19,
            }}
          >
            <Text style={{ fontSize: 25, color: "white" }}>{price}</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <View
          style={[
            {
              flex: 1,
              backgroundColor: "#b3f5bc",
            },
            styles.priceRange,
          ]}
        >
          <Text style={{ fontSize: 25, color: "white" }}>{lowPrice}</Text>
        </View>
        <View
          style={[
            {
              flex: 1,
              backgroundColor: "#fcae7c",
            },
            styles.priceRange,
          ]}
        >
          <Text style={{ fontSize: 25, color: "white" }}>{mediumPrice}</Text>
        </View>
        <View
          style={[
            {
              flex: 1,
              backgroundColor: "#fa9189",
            },
            styles.priceRange,
          ]}
        >
          <Text style={{ fontSize: 25, color: "white" }}>{highPrice}</Text>
        </View>
      </View>

      <View
        style={{
          flex: 4,
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
          <Text style={{ color: "white", fontSize: 30 }}>Price History</Text>
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
            <Text>No suggestions available</Text>
          )}

          {/* <Suggestion text="Seller up 👍" />
          <Suggestion text="Buyer down 👎" />
          <Suggestion text="I don't want to hear 🙉💸" />
          <Suggestion text="Just pay 🫴💵" />
          <Suggestion text="Down more plz🫤👎" />
          <Suggestion text="Good 🤝 ?" /> */}
        </ScrollView>
      </View>

      <View style={{ flex: 3, justifyContent: "space-around" }}>
        {/* <View
          style={{
            flex: 1,
            borderColor: "black",
            borderWidth: 1,
            backgroundColor: "white",
            margin: 10,
            borderRadius: 15,
          }}
        > */}
        <TextInput
          style={{
            borderRadius: 15,
            borderWidth: 3,
            borderColor: "black",
            padding: 5,
            width: 260,
            height: 95,
            marginLeft: 10,
            marginTop: 10,
            backgroundColor: "white",
            paddingVertical: 20,
            fontSize: 25,
          }}
          placeholder="Write desired price."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          keyboardType="numeric"
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: -90,
            marginBottom: 10,
            marginLeft: 285,
          }}
        >
          <TouchableOpacity
            onPress={() => handleAdd(inputText)}
            style={{
              backgroundColor: "#181e44",
              borderRadius: 15,
              borderWidth: 2,
            }}
          >
            <Text
              style={[
                styles.text,
                {
                  fontSize: 60,
                  color: "white",
                  width: 75,
                  textAlign: "center",
                },
              ]}
            >
              ✓
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Negotiator", {
                item: item,
                price: price,
                country: country,
                currency: currency,
                low: lowPrice,
                medium: mediumPrice,
                high: highPrice,
                tips: negotiationTips,
              })
            }
            style={{
              flex: 3,
              backgroundColor: "#181e44",
              borderRadius: 15,
              borderWidth: 2,
              borderColor: 'black',
              alignItems: "center",
              justifyContent: "center",
              margin: 5,
            }}
          >
            <Text style={{ color: "white", fontSize: 45 }}>
              Haggle
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Success")}
            style={{
              flex: 1,
              backgroundColor: "#181e44",
              borderRadius: 15,
              borderWidth: 2,
              borderColor: 'black',
              alignItems: "center",
              justifyContent: "center",
              margin: 5,
            }}
          >
            <Text style={{ color: "white", fontSize: 45 }}>✅</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Failed")}
            style={{
              flex: 1,
              backgroundColor: "#181e44",
              borderRadius: 15,
              borderWidth: 2,
              borderColor: 'black',
              alignItems: "center",
              justifyContent: "center",
              margin: 5,
            }}
          >
            <Text style={{ color: "white", fontSize: 45 }}>❌</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  priceRange: {
    flex: 1,
    justifyContent: "center", // vertically align everything in the center
    alignItems: "center", // horizontally align everything in the center
    borderRadius: 15, // round the corners
    padding: 10, // add some padding
    fontSize: 15, // set the font size
    borderWidth: 1, // add a border
    marginHorizontal: 5,
  },
  button: {
    borderRadius: 10, // High value to ensure it's completely round
    backgroundColor: "#6a5acd", // Choose your color
    justifyContent: "center", // Center the text vertically
    alignItems: "center", // Center the text horizontally
    marginVertical: "30%",
  },
});
