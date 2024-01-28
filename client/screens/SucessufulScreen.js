import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

/*const SuccessScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Successful Trade</Text>
      <Image 
       // source={require('./C:\Users\khang\Downloads\checkmark.png')}  <--need jackie or someone to download this image
        style={styles.image}
      />

      <Button
        title="Back to Home Screen"
        onPress={() => navigation.navigate("HomeScreen")}
      />

    </View>
  );
};*/

const styles = StyleSheet.create({
  
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#35465c", // You can change the background color
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white'
    // Add more styling for the text as needed
  },
  image: {
    width: 50,  // Adjust the width as needed
    height: 50, // Adjust the height as needed
    // Add more styling for the image as needed
  }
});

export default function SuccessScreen ( {navigation} ){
  return (
    <View style={styles.container}>

      <View 
        style={{ 
          flex: 1, 
          alignItems: "center", 
          justifyContent: "flex-start" 
        }}
      >
        <Text style = {styles.titleText}>Back to the Market</Text>
      </View>

      <View 
        style = {{
          flex: 2, 
          width: '100%', 
          alignItems: "center", 
          justifyContent: "center"
        }}
      > 
        <Text style={styles.text}>Successful Trade</Text>
        <Image 
        // source={require('./C:\Users\khang\Downloads\checkmark.png')}  <--need jackie or someone to download this image
          style={styles.image}
        />

        <Button
          title="Back to Home Screen"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </View>
  );
}
