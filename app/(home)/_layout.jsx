import { StyleSheet, Text, View } from "react-native";
import { Stack, Stact } from "expo-router";
import React from "react";
import { ModalPortal } from "react-native-modals";

const _layout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="create" options={{ headerShown: false }} />
      </Stack>
      <ModalPortal />
    </>
  );
};

export default _layout;

const styles = StyleSheet.create({});
