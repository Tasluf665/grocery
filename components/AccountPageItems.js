import React from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default [
  {
    text: "Order",
    icon: <Feather name="shopping-bag" size={25} color="black" />,
    onPress: () => {},
  },
  {
    text: "My Details",
    icon: (
      <MaterialCommunityIcons
        name="card-account-details-outline"
        size={25}
        color="black"
      />
    ),
    onPress: () => {},
  },
  {
    text: "Delivery Address",
    icon: <Feather name="map-pin" size={25} color="black" />,
    onPress: () => {},
  },
  {
    text: "Payment Methods",
    icon: <MaterialIcons name="payment" size={25} color="black" />,
    onPress: () => {},
  },
  {
    text: "Promo Code",
    icon: <Foundation name="ticket" size={25} color="black" />,
    onPress: () => {},
  },
  {
    text: "Notifications",
    icon: <MaterialIcons name="notifications-none" size={25} color="black" />,
    onPress: () => {},
  },
  {
    text: "Help",
    icon: (
      <MaterialCommunityIcons
        name="help-circle-outline"
        size={25}
        color="black"
      />
    ),
    onPress: () => {},
  },
  {
    text: "About",
    icon: <AntDesign name="exclamationcircleo" size={24} color="black" />,
    onPress: () => {},
  },
];
