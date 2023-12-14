import { Button, StyleSheet, Text, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { router } from "expo-router";

// import { GoogleSignin } from "@react-native-google-signin/google-signin";
import CustomeActivityIndicator from "../../components/CustomeActivityIndicator";

const index = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handelLogout = async () => {
    try {
      setLoading(true);
      // await GoogleSignin.signOut();
      await signOut(auth);
      router.replace("/WelcomeScreen");
    } catch (error) {
      Alert.alert("Error during logout:", error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <CustomeActivityIndicator />
      ) : (
        <>
          <Text>User is logged in: {user ? user.email : ""}</Text>
          <Button title="Logout" onPress={handelLogout} />
        </>
      )}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
