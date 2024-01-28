import React from "react";
import { Button, View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View 
      style={{ 
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center", 
        backgroundColor: "#35465c" 
      }}
    >
      <Text style = {styles.titleText}>Back to the Market</Text>

      <View 
        style = {{
          flex: 2, 
          width: '100%', 
          alignItems: "center", 
          justifyContent: "center"
        }}
      > 
      
        <TouchableOpacity
          onPress={() => navigation.navigate("Info")}
          style={styles.button}
        >
          <Text style={styles.text}>Negotiate</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}>
        <Button
            title="Go to Test page"
            onPress={() => navigation.navigate("TestPage")}
          />      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    marginVertical:30
  },
  
  button: {
    borderRadius: 200, // High value to ensure it's completely round
    width: 200, // Diameter of the circle
    height: 200, // Diameter of the circle
    backgroundColor: "#021A35", // Choose your color
    justifyContent: "center", // Center the text vertically
    alignItems: "center", // Center the text horizontally
    
  },

  text: {
    color: "white",
    fontSize: 35, // Adjust as needed
  },

  textInput: {
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#000',
    padding: 5,
    marginVertical: 5, 
    width: '100%',
  }
});
