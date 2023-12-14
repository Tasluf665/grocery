import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

export default function CustomeImageContainer() {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={require("../assets/StartupImages/vegetable.png")}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: "35%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
