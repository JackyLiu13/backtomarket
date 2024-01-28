import React from "react";
import { View, Text} from "react-native";


const EmotionFace = ({ emotion }) => {
  const colorMap = {
    happy: "green",
    sad: "blue",
    angry: "red",
    surprised: "yellow",
  };

  const Emoji = {
    happy: "😊",
    angry: "😡",
    sad: "😢",
    surprised: "😲",
  };

  const faceEmoji = Emoji[emotion] || "😐";
  
  return (
  <View style={{flex:1, backgroundColor:colorMap[emotion], borderWidth:1, borderColor:colorMap[emotion],width: 150, borderRadius: 25, alignItems:"center", justifyContent:"center" }}>
    <Text style={{fontSize: 120}} role="img" aria-label={emotion}>
      {faceEmoji}
    </Text>
  </View>
  );
};

export default EmotionFace;
