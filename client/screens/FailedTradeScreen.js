import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
// const Failimg = {
//   uri: "https://i.postimg.cc/GmkqQjvf/negotiation-Fail.png",
// };

// const UnsuccessScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Unsuccessful Trade</Text>
//       <Image source={Failimg} style={styles.image} />
//     </View>
//   );
// };

const styles = StyleSheet.create({
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    marginVertical: 30
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#35465c", // You can change the background color
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
    // Add more styling for the text as needed
  },
  image: {
    width: 50, // Adjust the width as needed
    height: 50, // Adjust the height as needed
    // Add more styling for the image as needed
  },
});

export default function FailedTradeScreen({ navigation }) {
  return (
    <View style={styles.container}>
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
          flex: 2,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <Image source={.client/assets/Fail.png} /> */}
        <Text style={styles.text}>Unsuccessful Trade</Text>
        {/* <Image source={require('https://discord.com/channels/@me/1200574557090758749/1200997968761868318')}/>
        style={styles.image} */}

        <Button
          title="Back to Home Screen"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </View>
  );
}
