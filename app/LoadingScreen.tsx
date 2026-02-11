import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GUIDE MAP FOR GUINAYANGAN{"\n"}SENIOR HIGH SCHOOL</Text>
      <ActivityIndicator size="large" color="#0066cc" style={styles.spinner} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    color: "#0a3d62",
    lineHeight: 28,
  },
  spinner: {
    marginTop: 20,
  },
});
