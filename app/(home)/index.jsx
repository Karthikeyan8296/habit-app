import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { dayNames } from "../../constants";
import {
  BottomModal,
  ModalTitle,
  SlideAnimation,
  ModalContent,
} from "react-native-modals";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const index = () => {
  const router = useRouter();
  const [Option, setOption] = useState("Today");
  const [habits, sethabits] = useState([]);
  const [isModelVisible, setisModelVisible] = useState(false);
  const [selectedHabit, setselectedHabit] = useState();

  //getting the current day//
  const currentDay = new Date()
    .toLocaleDateString("en-US", {
      weekday: "short",
    })
    .slice(0, 3);

  console.log(currentDay);

  //We are fetching the data from backend using useEffect//
  const fetchHabits = async () => {
    try {
      const response = await axios.get("http://192.168.1.59:3000/habitsList");
      sethabits(response.data);
    } catch (error) {
      console.log("Error in fetching the habits", error);
    }
  };

  //long press event//
  const handleLongPress = (habitId) => {
    const selectedHabit = habits?.find((habit) => habit._id == habitId);
    setselectedHabit(selectedHabit);
    setisModelVisible(true);
  };

  //handling the completion in the backend//
  const handleCompletion = async () => {
    try {
      const habitId = selectedHabit?._id;
      const updatedCompletion = {
        ...selectedHabit?.completed,
        [currentDay]: true,
      };
      await axios.put(`http://192.168.1.59:3000/habits/${habitId}/completed`, {
        completed: updatedCompletion,
      });
      await fetchHabits();
      setisModelVisible(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  //filtering the completed habits//
  const filteredHabits = habits?.filter((habit) => {
    return !habit.completed || !habit.completed[currentDay];
  });
  console.log("filtered habits are: ", habits);

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <>
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
        {Option === "Today" &&
          (filteredHabits?.length > 0 ? (
            <View>
              {filteredHabits.map((value, index) => (
                <Pressable
                  onLongPress={() => handleLongPress(value._id)}
                  style={{
                    marginVertical: 10,
                    backgroundColor: value.color,
                    borderRadius: 8,
                    padding: 10,
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <Text
                    style={{ fontSize: 16, color: "white", fontWeight: "600" }}
                  >
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
          ))}

        {Option == "weekly" && (
          <View>
            {habits.map((habit, index) => (
              <Pressable
                style={{
                  marginVertical: 10,
                  backgroundColor: habit.color,
                  padding: 15,
                  borderRadius: 16,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 16, color: "white", fontWeight: "500" }}
                  >
                    {habit.title}
                  </Text>
                  <Text
                    style={{ fontSize: 16, color: "white", fontWeight: "500" }}
                  >
                    {habit.repeatMode}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    paddingTop: 20,
                  }}
                >
                  {dayNames.map((day, item) => {
                    const isCompleted = habit.completed && habit.completed[day];
                    return (
                      <Pressable>
                        <Text
                          style={{
                            color: day === currentDay ? "red" : "white",
                          }}
                        >
                          {day}
                        </Text>
                        {isCompleted ? (
                          <FontAwesome
                            name="circle"
                            size={24}
                            color="white"
                          ></FontAwesome>
                        ) : (
                          <Feather
                            name="circle"
                            size={24}
                            color="white"
                          ></Feather>
                        )}
                      </Pressable>
                    );
                  })}
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>

      <BottomModal
        onBackdropPress={() => setisModelVisible(!isModelVisible)}
        onHardwareBackPress={() => setisModelVisible(!isModelVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Choose Option" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        visible={isModelVisible}
        onTouchOutside={() => setisModelVisible(!isModelVisible)}
      >
        <ModalContent style={{ width: "100%", height: 280 }}>
          <View style={{ marginVertical: 10, gap: 5 }}>
            <Text>Options</Text>
            <Pressable
              onPress={handleCompletion}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                marginTop: 10,
              }}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={24}
                color="black"
              />
              <Text>Completed</Text>
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                marginTop: 10,
              }}
            >
              <Feather name="skip-forward" size={24} color="black" />
              <Text>Skip</Text>
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                marginTop: 12,
              }}
            >
              <Feather name="edit-2" size={24} color="black" />
              <Text>Edit</Text>
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                marginTop: 12,
              }}
            >
              <Feather name="archive" size={24} color="black" />
              <Text>Archive</Text>
            </Pressable>

            <Pressable
              onPress={""}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                marginTop: 12,
              }}
            >
              <AntDesign name="delete" size={24} color="black" />
              <Text>Delete</Text>
            </Pressable>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
