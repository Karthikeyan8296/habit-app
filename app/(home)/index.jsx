import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";

const index = () => {
  const [Option, setOption] = useState("Today");
  const router = useRouter();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 8,
        }}
      >
        <Ionicons name="logo-bitbucket" size={30} color="black" />
        <AntDesign
          onPress={() => router.push("/(home)/create")}
          name="plus"
          size={24}
          color="black"
        />
      </View>

      <Text
        style={{
          marginTop: 6,
          fontSize: 26,
          fontWeight: "500",
          paddingHorizontal: 8,
        }}
      >
        Habits
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginVertical: 10,
        }}
      >
        <Pressable
          onPress={() => setOption("Today")}
          style={{
            backgroundColor: Option == "Today" ? "#DBDBDB" : "transparent",
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 20,
          }}
        >
          <Text style={{ textAlign: "center", color: "grey", fontSize: 14 }}>
            Today
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setOption("weekly")}
          style={{
            backgroundColor: Option == "weekly" ? "#E0E0E0" : "transparent",
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 20,
          }}
        >
          <Text style={{ textAlign: "center", color: "grey", fontSize: 14 }}>
            Weekly
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setOption("Over all")}
          style={{
            backgroundColor: Option == "Over all" ? "#E0E0E0" : "transparent",
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 20,
          }}
        >
          <Text style={{ textAlign: "center", color: "grey", fontSize: 14 }}>
            Over all
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
