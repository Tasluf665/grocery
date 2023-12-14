//https://medium.com/@adityasinghrathore360/implementing-firebase-authentication-in-react-native-app-with-expo-a-detailed-explanation-cea4d1113501
//https://blog.logrocket.com/integrating-firebase-authentication-expo-mobile-app/
//https://www.youtube.com/watch?v=ql4J6SpLXZA&t=1188s
//https://ibjects.medium.com/google-signin-tutorial-for-react-native-81a57fb67b18
//--------------------------------------------------------

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
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

export default function LoginScreen() {
  const [password, setPassword] = React.useState();
  const [email, setEmail] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
      Alert.alert("Email has beed send");
    } catch (err) {
      setLoading(false);
      if (err.code === "auth/user-not-found") {
        Alert.alert("No user is found");
      } else if (err.code === "auth/missing-email") {
        Alert.alert("Please Enter a email address");
      } else {
        console.log(err.message);
      }
    }
  };

  const handleSigin = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      if (!auth.currentUser.emailVerified) {
        await sendEmailVerification(auth);
        Alert.alert(
          "Your Email is not verified. Please verify your email first"
        );
        await signOut(auth);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
        >
          <View style={styles.container}>
            <CustomeImageContainer />
            <View style={styles.itemContainer}>
              <Text style={styles.title}>Loging</Text>
              <Text style={[styles.text, { marginBottom: 40 }]}>
                Enter your emails and password
              </Text>

              <CustomeTextInput setState={setEmail} />
              <PasswordTextInput title="Password" setPassword={setPassword} />

              <View style={styles.forgotContainer}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => router.push("/SignupScreen")}
                >
                  <Text style={styles.text}>New Account?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={handleForgotPassword}
                >
                  <Text style={styles.text}>Forgot Password ?</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableNativeFeedback onPress={handleSigin}>
                  <View style={styles.button}>
                    <Text style={[styles.titelText]}>Log in</Text>
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
    backgroundColor: Colors.LightWhite,
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
