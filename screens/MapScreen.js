import { useState } from "react";
import {
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import buildings from "../app/buildings";

  const [selected, setSelected] = useState(null);
  const { width, height } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Campus Map</Text>
      </View>

      <View style={{ width, height: height - 64, position: "relative" }}>
        <ImageBackground
          source={require("../assets/images/school_map.png")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        >
          {buildings.map((b) => (
            <TouchableOpacity
              key={b.id}
              activeOpacity={0.8}
              style={[
                styles.pin,
                {
                  left: b.x,
                  top: b.y,
                  position: "absolute",
                  marginLeft: 0,
                  marginTop: 0,
                  transform: [
                    { translateX: -18 },
                    { translateY: -36 },
                  ],
                },
              ]}
              onPress={() => setSelected(b)}
            >
              <View style={styles.pinOuter} />
              <Text style={styles.pinEmoji}>📍</Text>
            </TouchableOpacity>
          ))}
        </ImageBackground>
      </View>

      <Modal
        visible={!!selected}
        transparent
        animationType="slide"
        onRequestClose={() => setSelected(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{selected?.name}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setSelected(null);
                  navigation.navigate("Building", { name: selected?.name });
                }}
              >
                <Text style={styles.modalButtonText}>Open</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.closeButton]}
                onPress={() => setSelected(null)}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f9fc" },
  header: {
    height: 64,
    backgroundColor: "#1f6feb",
    justifyContent: "center",
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "600" },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  pin: {
    position: "absolute",
    width: 36,
    height: 36,
    marginLeft: -18,
    marginTop: -36,
    alignItems: "center",
    justifyContent: "center",
  },
  pinOuter: {
    position: "absolute",
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "rgba(31,111,235,0.95)",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ scale: 1 }],
  },
  pinEmoji: { color: "white", fontSize: 18, zIndex: 2 },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "80%",
    padding: 18,
    backgroundColor: "white",
    borderRadius: 8,
  },
  modalTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  modalButtons: { flexDirection: "row", justifyContent: "flex-end" },
  modalButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#1f6feb",
    borderRadius: 6,
    marginLeft: 8,
  },
  closeButton: { backgroundColor: "#999" },
  modalButtonText: { color: "white", fontWeight: "600" },
});
