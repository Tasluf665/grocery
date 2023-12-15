import React from "react";
import { View, Text, TouchableNativeFeedback } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import { Feather } from "@expo/vector-icons";

import Colors from "../constant/Colors";
import CustomeFonts from "../constant/CustomeFonts";

export default function LogoutButton(props) {
  return (
    <View style={styles.touchContainer}>
      <TouchableNativeFeedback
        onPress={props.onPress}
        background={TouchableNativeFeedback.Ripple(Colors.LightGray)}
      >
        <View style={styles.container}>
          <Feather name="log-out" size={24} color={Colors.Primary} />
          <Text style={styles.text}>Log out</Text>
          <View></View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = ScaledSheet.create({
  touchContainer: {
    borderRadius: 15,
    marginTop: "5@vs",
    width: "50%",
    alignSelf: "center",
  },
  container: {
    height: "55@vs",
    width: "100%",
    backgroundColor: Colors.Gray,
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text: {
    fontFamily: CustomeFonts.Gilroy_Light,
    fontSize: "17@ms",
    color: Colors.Primary,
    fontWeight: "bold",
  },
});
