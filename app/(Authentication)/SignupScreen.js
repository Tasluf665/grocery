import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
  Image,
  Alert,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";

import Colors from "../../constant/Colors";
import CustomeFonts from "../../constant/CustomeFonts";
import PasswordTextInput from "../../components/PasswordTextInput";

export default function SignupScreen() {
  const [password, setPassword] = React.useState();
  const [email, setEmail] = React.useState();
  const [displayName, setDisplayName] = React.useState();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });

      await sendEmailVerification(auth.currentUser);

      Alert.alert(
        "An email is send for verification. Verify your email and log in into your account"
      );
      await signOut(auth);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, marginTop: StatusBar.currentHeight }}
      behavior={"padding"}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/StartupImages/carrot.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={[styles.text, { marginBottom: 40 }]}>
            Enter your name, emails and password
          </Text>
          <Text style={[styles.text, { fontWeight: "bold" }]}>Name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setDisplayName}
            keyboardType="default"
          />
          <Text style={[styles.text, { fontWeight: "bold" }]}>Email</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <PasswordTextInput title="Password" setPassword={setPassword} />

          <View style={styles.buttonContainer}>
            <TouchableNativeFeedback onPress={handleSignup}>
              <View style={styles.button}>
                <Text style={[styles.titelText]}>Sign Up</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    width: "70%",
    height: 60,
    overflow: "hidden",
    borderRadius: 20,
    marginTop: 30,
    alignSelf: "center",
  },
  button: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    backgroundColor: Colors.Primary,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.BorderGray,
    marginBottom: 20,
    fontFamily: CustomeFonts.Gilroy_Light,
    fontSize: 16,
    paddingVertical: 5,
  },
  imageContainer: {
    width: "100%",
    height: "35%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
  },
  itemContainer: {
    marginHorizontal: 20,
  },
  title: {
    fontFamily: CustomeFonts.Gilroy_Light,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontFamily: CustomeFonts.Gilroy_Light,
    fontSize: 16,
    marginBottom: 10,
    color: Colors.DarkGray,
  },
  titelText: {
    fontFamily: CustomeFonts.Gilroy_Light,
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  forgotContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  passwordInputContainer: {
    flexDirection: "row",
  },
});
