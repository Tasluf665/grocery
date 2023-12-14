import React from "react";
import { Alert } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../firebase";
import { Web_Clinet_ID } from "@env";

export default function ({ setLoading }) {
  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
    webClientId: Web_Clinet_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
  });

  const handleGoogleSigin = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo?.idToken) {
        const credential = GoogleAuthProvider.credential(userInfo.idToken);
        await signInWithCredential(auth, credential);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert(error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      style={{
        width: "70%",
        height: "10%",
        alignSelf: "center",
        marginTop: 20,
      }}
      onPress={handleGoogleSigin}
    />
  );
}
