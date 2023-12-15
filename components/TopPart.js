import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import * as ImagePicker from "expo-image-picker";

import CustomeFonts from "../constant/CustomeFonts";

export default function TopPart(props) {
  const [image, setImage] = React.useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true,
        selectionLimit: 5,
        orderedSelection: true,
      });

      if (result?.assets[0]?.uri) {
        setImage(result.assets);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const imageArray = () => {
    return image.map((item) => {
      return (
        <TouchableWithoutFeedback key={item.uri} onPress={pickImage}>
          <Image
            style={styles.image}
            source={{
              uri: item.uri,
            }}
          />
        </TouchableWithoutFeedback>
      );
    });
  };

  return (
    <View style={styles.container}>
      {image ? (
        <>{imageArray()}</>
      ) : (
        <TouchableWithoutFeedback onPress={pickImage}>
          <Image
            style={styles.image}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/9073/9073292.png",
            }}
          />
        </TouchableWithoutFeedback>
      )}

      {image?.length > 1 ? null : (
        <View>
          <Text style={styles.text}>{props.name}</Text>
          <Text style={styles.text}>{props.email}</Text>
        </View>
      )}
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    marginLeft: "18@s",
    marginTop: "18@vs",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    marginRight: "16@s",
    borderRadius: 12,
  },
  text: {
    fontFamily: CustomeFonts.Gilroy_Light,
    fontWeight: "bold",
    fontSize: "13.5@ms",
  },
});
