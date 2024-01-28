import React, { useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0); // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1, // Animate to opacity: 1 (fully visible)
        duration: 2000, // 2000 milliseconds
        useNativeDriver: true, // Add this line
      }
    ).start();

    // Wait for 3 seconds and navigate to the main screen
    setTimeout(() => {
      navigation.navigate('HomeScreen');
    }, 3000);
  }, [fadeAnim, navigation]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.Text style={{ opacity: fadeAnim, fontSize: 28, fontWeight: 'bold' }}>
        Back to the Market
      </Animated.Text>
    </View>
  );
};

// MainScreen component (Replace this with your main screen component)
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style = {styles.titleText}>Back to the Market</Text>
      <Button
        title="Go to Test page"
        onPress={() => navigation.navigate("TestPage")}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("Negotiate")}
        style={styles.button}
      >
        <Text style={styles.text}>Negotiate</Text>
      </TouchableOpacity>


      <View style = {{flex: 1, width: '100%', alignItems: "Center"}}>
        <TextInput 
          placeholder="Item"
          style={styles.textInput}
        />

        <TextInput 
          placeholder="Starting Price"
          style={styles.textInput}
        />

        <TextInput 
          placeholder="Desired Price"
          style={styles.textInput}
        />
      </View>
    </View>
  );
}

// Navigation setup (assuming you're using React Navigation)
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
