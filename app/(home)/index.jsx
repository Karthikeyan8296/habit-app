import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import axios from "axios";

const index = () => {
  const router = useRouter();
  const [Option, setOption] = useState("Today");
  const [habits, sethabits] = useState([]);
  //We are fetching the data from backend using useEffect//
  const fetchHabits = async () => {
    try {
      const response = await axios.get("http://192.168.1.59:3000/habitsList");
      sethabits(response.data);
    } catch (error) {
      console.log("Error in fetching the habits");
    }
  };
  console.log(habits);
  useEffect(() => {
    fetchHabits();
  }, []);

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

      {/* if the there is habit we will be displaying it here */}
      {Option === "Today" && habits?.length > 0 ? (
        <View>
          {habits.map((value, index) => (
            <Pressable
              style={{
                marginVertical: 10,
                backgroundColor: value.color,
                borderRadius: 8,
                padding: 10,
                alignItems: "center",
              }}
              key={index}
            >
              <Text style={{ fontSize: 16, color: "white", fontWeight: "600" }}>
                {value.title}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : (
        <View>
          <Image
            style={{
              width: 120,
              height: 120,
              resizeMode: "cover",
              marginHorizontal: "auto",
              marginTop: 150,
            }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/10609/10609386.png",
            }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "600",
              marginTop: 50,
            }}
          >
            No habits for today {"\n"}
            Create one?
          </Text>

          <Pressable
            onPress={() => router.push("/(home)/create")}
            style={{
              backgroundColor: "#0071c5",
              marginTop: 10,
              padding: 10,
              marginHorizontal: "auto",
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white" }}>Create</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
