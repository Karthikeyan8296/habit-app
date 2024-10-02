import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { useRouter } from "expo-router";
import { colors } from "../../constants";
import { days } from "../../constants";

const create = () => {
  const router = useRouter();

  return (
    <View style={{ padding: 16 }}>
      <Ionicons
        onPress={() => router.back()}
        name="chevron-back-outline"
        size={24}
        color="black"
      />
      <Text style={{ fontSize: 20, marginTop: 10 }}>
        Create <Text style={{ fontSize: 20, fontWeight: "500" }}>Habit</Text>
      </Text>

      <TextInput
        placeholder="Title"
        style={{
          width: "95%",
          marginTop: 15,
          padding: 15,
          borderRadius: 10,
          backgroundColor: "#E1EBEE",
        }}
      />

      {/* Colors section */}
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>Color</Text>
        <View
          style={{
            marginTop: 5,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          {colors.map((value, index) => (
            <TouchableOpacity key={index} activeOpacity={0.8}>
              <FontAwesome name="square" size={32} color={value} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Repeat section */}
      <Text style={{ fontSize: 18, fontWeight: "500" }}>Repeat</Text>
      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#AFDBF5",
            padding: 10,
            flex: 1,
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <Text>Daily</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#AFDBF5",
            padding: 10,
            flex: 1,
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <Text>Weekly</Text>
        </Pressable>
      </View>

      {/* On these days section */}
      <View style={{ marginTop: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>On These Days</Text>

        <View
          style={{
            marginTop: 6,
            flexDirection: "row",
            gap: 10,
          }}
        >
          {days.map((value, index) => (
            <Pressable
              key={index}
              style={{
                width: 40,
                height: 40,
                borderRadius: 5,
                backgroundColor: "#DBDBDB",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>{value}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Remainder section */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 10,
          marginHorizontal: 5,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>Remaider</Text>
        <Text style={{ fontSize: 16, fontWeight: "500", color: "#3CA6E9" }}>
          Yes
        </Text>
      </View>

      <Pressable
        style={{
          width: "auto",
          backgroundColor: "#003980",
          marginVertical: 10,
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "700" }}>SAVE</Text>
      </Pressable>
    </View>
  );
};

export default create;

const styles = StyleSheet.create({});
