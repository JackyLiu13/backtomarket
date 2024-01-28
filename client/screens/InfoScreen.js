import React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

export default function InfoScreen({ navigation }) {
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
          justifyContent: "flex-start" 
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
        <TextInput placeholder="Item" style={styles.textInput} />
        <TextInput placeholder="Starting Price" style={styles.textInput} />
        <TextInput placeholder="Desired Price" style={styles.textInput} />


        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            margintop: 20
          }}
        >
          <Button 
            title="Back" 
            onPress={() => navigation.navigate("Home")} 
          />
          <Button
            title="Continue"
            onPress={() => navigation.navigate("Negotiate")}
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
