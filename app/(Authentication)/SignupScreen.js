import React from "react";
import {
  View,
  Text,
  StyleSheet,
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
import CustomeActivityIndicator from "../../components/CustomeActivityIndicator";
import CustomeTextInput from "../../components/CustomeTextInput";
import CustomeImageContainer from "../../components/CustomeImageContainer";

export default function SignupScreen() {
  const [password, setPassword] = React.useState();
  const [email, setEmail] = React.useState();
  const [displayName, setDisplayName] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      await sendEmailVerification(auth.currentUser);
      await signOut(auth);
      setLoading(false);
      Alert.alert(
        "An email is send for verification. Verify your email and log in into your account"
      );
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <CustomeActivityIndicator />
      ) : (
        <KeyboardAvoidingView
          style={{
            flex: 1,
            marginTop: StatusBar.currentHeight,
            backgroundColor: Colors.LightWhite,
          }}
          behavior={"padding"}
          keyboardVerticalOffset={120}
        >
          <View style={styles.container}>
            <CustomeImageContainer />
            <View style={styles.itemContainer}>
              <Text style={styles.title}>Sign Up</Text>
              <Text style={[styles.text, { marginBottom: 40 }]}>
                Enter your name, emails and password
              </Text>
              <CustomeTextInput
                setState={setDisplayName}
                name="Name"
                keyboardType="default"
              />
              <CustomeTextInput setState={setEmail} />
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
      )}
    </View>
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
