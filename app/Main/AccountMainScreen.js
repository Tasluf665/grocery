import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { router } from "expo-router";

import TopPart from "../../components/TopPart";
import TouchableItems from "../../components/TouchableItems";
import AccountPageItems from "../../components/AccountPageItems";
import LogoutButton from "../../components/LogoutButton";
import CustomeActivityIndicator from "../../components/CustomeActivityIndicator";

const AccountMainScreen = (props) => {
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
      await signOut(auth);
      router.replace("/WelcomeScreen");
    } catch (error) {
      Alert.alert("Error during logout:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <CustomeActivityIndicator />
      ) : (
        <View style={styles.pageContainer}>
          <TopPart name={user?.displayName} email={user?.email} />
          <View style={styles.line}></View>
          <View style={styles.IconsContainer}>
            {AccountPageItems.map((item) => (
              <TouchableItems
                key={item.text}
                text={item.text}
                icon={item.icon}
                onPress={() => {}}
              />
            ))}
          </View>

          <LogoutButton onPress={handelLogout} />
        </View>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    marginTop: "18@vs",
  },
  IconsContainer: {
    height: "70%",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#E2E2E2",
    marginTop: "20@vs",
  },
});

export default AccountMainScreen;
