import React, { useState } from "react";
import CountryPicker from "react-native-country-picker-modal";
import { getCountry } from "country-currency-map";

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
  const [currency, setCurrency] = useState("");

  const onSelect = (selectedCountry) => {
    setCountry(selectedCountry.name);
    const countryInfo = getCountry(selectedCountry.name);
    if (countryInfo) {
      setCurrency(countryInfo.currency);
    }
  };

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
          width: "90%",
          flex: 1,
          alignItems: "center",
          marginTop: -400,
        }}
      >
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setItem(text)}
          value={item}
          placeholder="Item"
        />

        {/* <TextInput
          style={styles.textInput}
          value={country}  // Use the 'country' state here
          placeholder="Country"
          editable={false} // To make it non-editable
        /> */}

        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setPrice(text)}
          value={price}
          placeholder="Opening Price"
        />
        <View style={styles.textInput}>
          <CountryPicker
            withFilter={true}
            withFlag={true}
            withCountryNameButton={true}
            withAlphaFilter={true}
            withCurrency={true}
            withEmoji={true}
            onSelect={onSelect}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={[styles.button, { marginHorizontal: 5 }]}
          >
            <Text style={[styles.text, { color: "#35465c" }, { fontSize: 25 }]}>
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              console.log(
                `Item: ${item || "apple"}, Price: ${price || 2}, Country: ${
                  country || "China"
                }, Currency: ${currency || "USD"}`
              );
              navigation.navigate("Negotiate", {
                item: item || "apple",
                price: price || 2,
                country: country || "China",
                currency: currency || "USD",
                low: null,
                medium: null,
                high: null,
                tips: null,
              });
            }}
            style={[styles.button, { marginHorizontal: 5 }]}
          >
            <Text style={[styles.text, { color: "#35465c" }, { fontSize: 25 }]}>
              Continue
            </Text>
          </TouchableOpacity>
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
    marginVertical: 30,
  },

  textInput: {
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#000",
    padding: 5,
    marginVertical: 5,
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 20,
  },

  button: {
    borderRadius: 10, // High value to ensure it's completely round
    width: 130, // Diameter of the circle
    height: 50, // Diameter of the circle
    backgroundColor: "#CCCCCC", // Choose your color
    justifyContent: "center", // Center the text vertically
    alignItems: "center", // Center the text horizontally
    marginVertical: "30%",
  },
});
