import { StyleSheet, Text, TextInput } from "react-native";
import React from "react";

import CustomeFonts from "../constant/CustomeFonts";
import Colors from "../constant/Colors";

export default function CustomeTextInput({
  setState,
  name = "Email",
  keyboardType = "email-address",
}) {
  return (
    <>
      <Text style={[styles.text, { fontWeight: "bold" }]}>{name}</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setState}
        keyboardType={keyboardType}
      />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: CustomeFonts.Gilroy_Light,
    fontSize: 16,
    marginBottom: 10,
    color: Colors.DarkGray,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.BorderGray,
    marginBottom: 20,
    fontFamily: CustomeFonts.Gilroy_Light,
    fontSize: 16,
    paddingVertical: 5,
  },
});
