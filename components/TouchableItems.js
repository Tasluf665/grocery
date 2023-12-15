import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import { Entypo } from "@expo/vector-icons";

import CustomeFonts from "../constant/CustomeFonts";
import Colors from "../constant/Colors";

export default function TouchableItems(props) {
  return (
    <>
      <TouchableOpacity
        style={styles.touchContainer}
        activeOpacity={0.5}
        onPress={props.onPress}
      >
        <View style={styles.container}>
          <View style={{ flexDirection: "row" }}>
            {props.icon}
            <Text style={styles.text}>{props.text}</Text>
          </View>
          <View>
            <Entypo name="chevron-right" size={25} color="black" />
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.line}></View>
    </>
  );
}

const styles = ScaledSheet.create({
  touchContainer: {
    maxHeight: "10%",
  },
  container: {
    flexDirection: "row",
    marginTop: "16@vs",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: "18@s",
  },
  text: {
    fontFamily: CustomeFonts.Gilroy_Light,
    fontWeight: "bold",
    fontSize: "16@ms",
    marginLeft: "14@s",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.BorderGray,
    marginTop: "16@vs",
  },
});
