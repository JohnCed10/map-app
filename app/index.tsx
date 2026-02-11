import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Map Guide</Text>
        <Text style={styles.subtitle}>
          Guinayangan Senior High School
        </Text>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push("/map")}
        >
          <MaterialCommunityIcons
            name="map"
            size={80}
            color="#e8f413"
          />
        </TouchableOpacity>

        <Text style={styles.instructionText}>
          Tap the map icon to explore our campus
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#624aec",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 40,
    textAlign: "center",
    fontWeight: "500",
  },
  iconButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#db3a3a",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    shadowColor: "#1f6feb",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  instructionText: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    marginTop: 20,
  },
});
