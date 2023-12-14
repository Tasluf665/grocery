import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Colors from "../constant/Colors";
import CustomeFonts from "../constant/CustomeFonts";

export default function PasswordTextInput(props) {
  const [hidePassword, setHidePassword] = React.useState(true);
  return (
    <View style={{ width: "100%" }}>
      <Text style={[styles.text, { fontWeight: "bold" }]}>{props.title}</Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={[styles.textInput, { width: "90%" }]}
          onChangeText={props.setPassword}
          secureTextEntry={hidePassword}
        />
        <Ionicons
          name={hidePassword ? "eye-off-outline" : "eye-outline"}
          size={24}
          color="black"
          onPress={() => setHidePassword((state) => !state)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: CustomeFonts.Gilroy_Light,
    fontSize: 16,
    marginBottom: 10,
    color: Colors.DarkGray,
  },
  passwordInputContainer: {
    flexDirection: "row",
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
