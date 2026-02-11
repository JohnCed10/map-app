import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Animated,
    Dimensions,
    ImageBackground,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import buildings from "../app/buildings";

export default function InteractiveMapScreen({ navigation }) {
  const [selected, setSelected] = useState(null);
  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const { width, height } = Dimensions.get("window");

  const MIN_SCALE = 1;
  const MAX_SCALE = 3;

  const handleZoomIn = () => {
    if (scale < MAX_SCALE) {
      setScale(scale + 0.3);
    }
  };

  const handleZoomOut = () => {
    if (scale > MIN_SCALE) {
      const newScale = Math.max(MIN_SCALE, scale - 0.3);
      setScale(newScale);
      // Reset position when zoomed out completely
      if (newScale === MIN_SCALE) {
        setOffsetX(0);
        setOffsetY(0);
      }
    }
  };

  const handleMapPress = (e) => {
    // Calculate offset adjustment based on scale
    const scaledX = (e.nativeEvent.locationX - width / 2) / scale;
    const scaledY = (e.nativeEvent.locationY - height / 2) / scale;
    
    // Smooth pan to tapped location
    const newOffsetX = -scaledX + width / 2 / scale;
    const newOffsetY = -scaledY + height / 2 / scale;

    // Constrain offsets
    const maxOffsetX = (width * (scale - 1)) / 2 / scale;
    const maxOffsetY = ((height - 64) * (scale - 1)) / 2 / scale;

    setOffsetX(Math.max(-maxOffsetX, Math.min(maxOffsetX, newOffsetX)));
    setOffsetY(Math.max(-maxOffsetY, Math.min(maxOffsetY, newOffsetY)));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Campus Map</Text>
        <View style={styles.headerSpacer} />
      </View>

      <TouchableOpacity
        activeOpacity={1}
        onPress={handleMapPress}
        style={{
          width,
          height: height - 64 - 64,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={[
            {
              transform: [
                { scale: scale },
                { translateX: offsetX },
                { translateY: offsetY },
              ],
            },
            styles.mapContainer,
          ]}
        >
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
        </Animated.View>
      </TouchableOpacity>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleZoomIn}
          disabled={scale >= MAX_SCALE}
        >
          <MaterialCommunityIcons name="plus" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.scaleText}>{Math.round(scale * 100)}%</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleZoomOut}
          disabled={scale <= MIN_SCALE}
        >
          <MaterialCommunityIcons name="minus" size={24} color="white" />
        </TouchableOpacity>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f7f9fc" 
  },
  header: {
    height: 64,
    backgroundColor: "#1f6feb",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: { 
    color: "white", 
    fontSize: 18, 
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
  },
  mapContainer: {
    width: "100%",
    height: "100%",
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
  pinEmoji: { 
    color: "white", 
    fontSize: 18, 
    zIndex: 2 
  },
  controlsContainer: {
    height: 64,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingBottom: 8,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1f6feb",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  scaleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f6feb",
    minWidth: 50,
    textAlign: "center",
  },
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
  modalTitle: { 
    fontSize: 18, 
    fontWeight: "600", 
    marginBottom: 12 
  },
  modalButtons: { 
    flexDirection: "row", 
    justifyContent: "flex-end" 
  },
  modalButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#1f6feb",
    borderRadius: 6,
    marginLeft: 8,
  },
  closeButton: { 
    backgroundColor: "#999" 
  },
  modalButtonText: { 
    color: "white", 
    fontWeight: "600" 
  },
});
