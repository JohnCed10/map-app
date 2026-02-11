import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type BuildingPos = { name: string; x: string; y: string };

/* ---------------- BUILDING IMAGES ---------------- */
const buildingImages: Record<string, any> = {
  "Main Gate": require("../assets/buildings/gate.jpg"),
  "ICT 12": require("../assets/buildings/ict12.jpg"),
  "ICT 11": require("../assets/buildings/ict11.jpg"),
  "EIM 12": require("../assets/buildings/gate.jpg"),
  "Multimedia Room": require("../assets/buildings/gate.jpg"),
  "Library": require("../assets/buildings/gate.jpg"),
  "Computer Laboratory": require("../assets/buildings/gate.jpg"),
  "Science Laboratory": require("../assets/buildings/gate.jpg"),
  "Principal Office": require("../assets/buildings/gate.jpg"),
  "Canteen A": require("../assets/buildings/gate.jpg"),
  "Canteen B": require("../assets/buildings/gate.jpg"),
  "HE Laboratory": require("../assets/buildings/gate.jpg"),
  "Guidance Office": require("../assets/buildings/gate.jpg"),
  "Faculty": require("../assets/buildings/gate.jpg"),
  "Hall & Ground": require("../assets/buildings/gate.jpg"),
  "Stage": require("../assets/buildings/gate.jpg"),
  "EIM 11": require("../assets/buildings/gate.jpg"),
  "SMAW 11": require("../assets/buildings/gate.jpg"),
  "SMAW 12": require("../assets/buildings/gate.jpg"),
  "HE 11": require("../assets/buildings/gate.jpg"),
  "HE 12": require("../assets/buildings/gate.jpg"),

  
};

const buildingDescriptions: Record<string, string> = {
  "Library": "A quiet place for reading, research, and studying. Contains books, references, and study tables.",
  "Computer Laboratory": "Used for ICT classes, programming, and computer-based activities.",
  "Science Laboratory": "Used for science experiments, practical activities, and demonstrations.",
  "ICT 11": "Classroom for Grade 11 ICT students.",
  "ICT 12": "Classroom for Grade 12 ICT students.",
  "Main Gate": "Main entrance and exit point of the school campus.",
};


/* ---------------- MAP BUILDING LAYOUT ---------------- */
const mapBuildings = [
  { name: "EIM 11", x: 2, y: 2, w: 7, h: 6, color: "#DBEAFE" },
  { name: "SMAW 12", x: 10, y: 2, w: 8, h: 6, color: "#DBEAFE" },
  { name: "SMAW 11", x: 19, y: 2, w: 8, h: 6, color: "#DBEAFE" },

  { name: "Science Laboratory", x: 2, y: 16, w: 28, h: 13, color: "#E9D5FF" },

  { name: "Canteen B", x: 2, y: 34.9, w: 6, h: 20, color: "#FBCFE8" },
  { name: "HE 11", x: 2, y: 55, w: 6, h: 20, color: "#DBEAFE" },
  { name: "HE 12", x: 2, y: 75, w: 6, h: 20, color: "#DBEAFE" },

  { name: "HE Laboratory", x: 10, y: 55, w: 8, h: 40, color: "#E9D5FF" },

  { name: "Guidance Office", x: 26, y: 56, w: 8, h: 14, color: "#FEF3C7" },
  { name: "Faculty", x: 26, y: 70, w: 8, h: 25, color: "#FEF3C7" },

  { name: "Canteen A", x: 18.5, y: 85, w: 7, h: 10, color: "#FBCFE8" },

  { name: "Principal Office", x: 38, y: 36, w: 18, h: 18, color: "#FEF3C7" },

  { name: "Bench", x: 57, y: 36, w: 6, h: 18, color: "#E5E7EB" },
  { name: "Hall & Ground", x: 64, y: 32, w: 26, h: 40, color: "#E5E7EB" },
  { name: "Stage", x: 90, y: 40, w: 7, h: 24, color: "#FED7AA" },

  { name: "HUMS 11 A", x: 38, y: 2, w: 14, h: 6, color: "#DBEAFE" },
  { name: "STEM 11", x: 53, y: 2, w: 14, h: 6, color: "#DBEAFE" },
  { name: "STEM 12 A", x: 68, y: 2, w: 14, h: 6, color: "#DBEAFE" },
  { name: "STEM 12 B", x: 83, y: 2, w: 14, h: 6, color: "#DBEAFE" },

  { name: "HUMS 11 B", x: 38, y: 9, w: 14, h: 6, color: "#DBEAFE" },
  { name: "HUMS 12 A", x: 53, y: 9, w: 14, h: 6, color: "#DBEAFE" },
  { name: "HUMS 12 B", x: 68, y: 9, w: 14, h: 6, color: "#DBEAFE" },
  { name: "HUMS 12 C", x: 83, y: 9, w: 14, h: 6, color: "#DBEAFE" },

  { name: "HUMS 11 C", x: 38, y: 16, w: 14, h: 6, color: "#DBEAFE" },
  { name: "ABM 11 A", x: 53, y: 16, w: 14, h: 6, color: "#DBEAFE" },
  { name: "ABM 11 B", x: 68, y: 16, w: 14, h: 6, color: "#DBEAFE" },
  { name: "ABM 12", x: 83, y: 16, w: 14, h: 6, color: "#DBEAFE" },

  { name: "ICT 12", x: 45, y: 74, w: 15, h: 8, color: "#DBEAFE" },
  { name: "ICT 11", x: 62, y: 74, w: 18, h: 8, color: "#DBEAFE" },
  { name: "EIM 12", x: 82, y: 74, w: 16, h: 8, color: "#DBEAFE" },

  { name: "Multimedia Room", x: 45, y: 86, w: 15, h: 8, color: "#E9D5FF" },
  { name: "Library", x: 62, y: 86, w: 18, h: 8, color: "#DCFCE7" },
  { name: "Computer Laboratory", x: 82, y: 86, w: 16, h: 8, color: "#E9D5FF" },
];

/* ---------------- BLOCK COMPONENT ---------------- */
function Block({ label, style, color }: any) {
  return (
    <View style={[styles.block, { backgroundColor: color }, style]}>
      <Text style={styles.blockText} numberOfLines={2} adjustsFontSizeToFit>
        {label}
      </Text>
    </View>
  );
}

function SchoolMapLayout() {
  return (
    <View style={styles.mapCanvas}>
      {mapBuildings.map((b) => (
        <Block
          key={b.name}
          label={b.name}
          color={b.color}
          style={{
            position: "absolute",
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: `${b.w}%`,
            height: `${b.h}%`,
          }}
        />
      ))}

      <View style={styles.gate}>
        <Text style={styles.gateText}>GATE</Text>
      </View>
    </View>
  );
}

/* ---------------- MAIN SCREEN ---------------- */
export default function InteractiveMapScreen() {
  const router = useRouter();

  const positions: BuildingPos[] = [
  // Building pins
  ...mapBuildings.map((b) => ({
    name: b.name,
    x: `${b.x + b.w / 3}%`,
    y: `${b.y + b.h / 2}%`,
  })),

  // Gate pin
  {
    name: "Main Gate",
    x: "35%",
    y: "95%",
  },
];


  const [selected, setSelected] = useState<BuildingPos | null>(null);
  const [query, setQuery] = useState("");

  const { width: screenW, height: screenH } = Dimensions.get("window");
  const MAP_ASPECT_RATIO = 1536 / 1024;

  const maxWidth = screenW - 24;
  const maxHeight = screenH * 0.55;

  let mapWidth = maxWidth;
  let mapHeight = mapWidth / MAP_ASPECT_RATIO;

  if (mapHeight > maxHeight) {
    mapHeight = maxHeight;
    mapWidth = mapHeight * MAP_ASPECT_RATIO;
  }

  const ICON_SIZE = 28;

  const pulse = useSharedValue(1);
  const bounce = useSharedValue(0);

  React.useEffect(() => {
    bounce.value = withRepeat(withTiming(-8, { duration: 600 }), -1, true);
  }, []);

  const startPulse = () => {
    pulse.value = withRepeat(withTiming(1.3, { duration: 700 }), -1, true);
  };
  const stopPulse = () => {
    pulse.value = withTiming(1, { duration: 150 });
  };

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const bounceStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounce.value }],
  }));

  const resetZoom = () => {
    stopPulse();
    setSelected(null);
  };

  return (
    <LinearGradient colors={["#e6f2ff", "#f7f9fc", "#dbeafe"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>

        <View style={styles.mapCard}>
          <View style={[styles.mapWrap, { width: mapWidth, height: mapHeight }]}>
            <SchoolMapLayout />

            {positions.map((b) => {
              const left = (parseFloat(b.x) / 100) * mapWidth;
              const top = (parseFloat(b.y) / 100) * mapHeight;
              const active = selected?.name === b.name;

              return (
                <TouchableOpacity
                  key={b.name}
                  style={[
                    styles.pin,
                    {
                      left,
                      top,
                      transform: [
                        { translateX: -(ICON_SIZE / 2) },
                        { translateY: -ICON_SIZE },
                      ],
                    },
                  ]}
                  onPress={() => {
                    setSelected(b);
                    startPulse();
                  }}
                >
                  {active && (
                    <Animated.View style={[styles.pulseRing, pulseStyle]} />
                  )}

                  <Animated.View style={bounceStyle}>
                    <MaterialCommunityIcons
                      name="map-marker"
                      size={ICON_SIZE}
                      color={active ? "#ef4444" : "#1f6feb"}
                    />
                  </Animated.View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* MODAL WITH IMAGE */}
        <Modal visible={!!selected} transparent animationType="fade">
          <Pressable style={styles.modalBackdrop} onPress={resetZoom}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>{selected?.name}</Text>

              <Image
                source={
                  selected && buildingImages[selected.name]
                    ? buildingImages[selected.name]
                    : require("../assets/buildings/gate.jpg")
                }
                style={styles.modalImage}
                resizeMode="cover"
              />

              <Text style={styles.modalDescription}>
  {selected && buildingDescriptions[selected.name]
    ? buildingDescriptions[selected.name]
    : "No description available for this location."}
</Text>


              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  if (!selected) return;
                  router.push({
                    pathname: "/building",
                    params: { name: selected.name },
                  });
                }}
              >
                <Text style={styles.modalButtonText}>Full Description</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>

      </SafeAreaView>
    </LinearGradient>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1 },

  mapCard: {
    marginHorizontal: 12,
    marginTop: 20,
    borderRadius: 24,
    padding: 10,
    backgroundColor: "transparent",
  },

  mapWrap: {
    borderRadius: 18,
    overflow: "visible",
    alignSelf: "center",
    backgroundColor: "#F8FAFC",
  },

  mapCanvas: {
    width: "100%",
    height: "110%",
    paddingTop: 20,
    position: "relative",
  },

  block: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#0f172a",
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  blockText: {
    fontSize: 9,
    fontWeight: "800",
    textAlign: "center",
  },

  modalDescription: {
  fontSize: 14,
  color: "#334155",
  marginBottom: 16,
  lineHeight: 20,
},


  gate: {
    position: "absolute",
    left: "35%",
    bottom: "10%",
    backgroundColor: "#0F172A",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  gateText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 10,
  },

  pin: {
    position: "absolute",
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },

  pulseRing: {
    position: "absolute",
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(31,111,235,0.18)",
  },

  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  modalCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 10,
  },

  modalImage: {
    width: "100%",
    height: 400,
    borderRadius: 12,
    marginBottom: 14,
  },

  modalButton: {
    backgroundColor: "#1f6feb",
    padding: 12,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "900",
  },
});
