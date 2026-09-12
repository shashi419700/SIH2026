import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

/* ============================================================
   NORTH EAST DUMMY DATA
============================================================ */

const NER_DUMMY_DATA = [
  {
    id: "NER-TRK-001",
    vehicleNumber: "AS01-TR-1024",
    name: "Guwahati Cargo",
    latitude: 26.1445,
    longitude: 91.7362,
    route: "Guwahati → Shillong",
    state: "Assam",
    status: "Moving",
  },
  {
    id: "NER-TRK-002",
    vehicleNumber: "AS01-TR-2048",
    name: "Kamrup Logistics",
    latitude: 26.1158,
    longitude: 91.7086,
    route: "Guwahati → Siliguri",
    state: "Assam",
    status: "In Transit",
  },
  {
    id: "NER-TRK-003",
    vehicleNumber: "ML05-TR-3312",
    name: "Shillong Express",
    latitude: 25.5788,
    longitude: 91.8933,
    route: "Shillong → Guwahati",
    state: "Meghalaya",
    status: "Moving",
  },
  {
    id: "NER-TRK-004",
    vehicleNumber: "TR01-TR-4589",
    name: "Agartala Cargo",
    latitude: 23.8315,
    longitude: 91.2868,
    route: "Agartala → Guwahati",
    state: "Tripura",
    status: "Moving",
  },
  {
    id: "NER-TRK-005",
    vehicleNumber: "MN01-TR-5621",
    name: "Imphal Transport",
    latitude: 24.817,
    longitude: 93.9368,
    route: "Imphal → Dimapur",
    state: "Manipur",
    status: "In Transit",
  },
  {
    id: "NER-TRK-006",
    vehicleNumber: "NL01-TR-6782",
    name: "Dimapur Freight",
    latitude: 25.5788,
    longitude: 93.9368,
    route: "Dimapur → Kohima",
    state: "Nagaland",
    status: "Moving",
  },
  {
    id: "NER-TRK-007",
    vehicleNumber: "AR01-TR-7814",
    name: "Itanagar Supply",
    latitude: 27.0844,
    longitude: 93.6053,
    route: "Itanagar → Guwahati",
    state: "Arunachal Pradesh",
    status: "Idle",
  },
  {
    id: "NER-TRK-008",
    vehicleNumber: "MZ01-TR-8945",
    name: "Aizawl Logistics",
    latitude: 23.7271,
    longitude: 92.7176,
    route: "Aizawl → Silchar",
    state: "Mizoram",
    status: "Moving",
  },
  {
    id: "NER-TRK-009",
    vehicleNumber: "SK01-TR-9156",
    name: "Gangtok Cargo",
    latitude: 27.3389,
    longitude: 88.6065,
    route: "Gangtok → Siliguri",
    state: "Sikkim",
    status: "In Transit",
  },
];

/* ============================================================
   MAIN SCREEN
============================================================ */

export default function SmartRouteScreen() {
  const mapRef = useRef(null);

  const [searchVisible, setSearchVisible] = useState(false);
  const [query, setQuery] = useState("");

  const [selectedTruck, setSelectedTruck] = useState(null);
  const [navigationStarted, setNavigationStarted] = useState(false);

  /*
   * Demo current location.
   * Isko baad mein actual GPS location se replace kar sakte ho.
   */
  const currentLocation = {
    latitude: 26.1445,
    longitude: 91.7362,
  };

  /* ============================================================
     SEARCH
  ============================================================ */

  const filteredTrucks = NER_DUMMY_DATA.filter((truck) => {
    const search = query.toLowerCase();

    return (
      truck.name.toLowerCase().includes(search) ||
      truck.vehicleNumber.toLowerCase().includes(search) ||
      truck.state.toLowerCase().includes(search) ||
      truck.route.toLowerCase().includes(search)
    );
  });

  /* ============================================================
     SELECT TRUCK
  ============================================================ */

  const selectTruck = (truck) => {
    setSelectedTruck(truck);
    setSearchVisible(false);
    setQuery("");
    setNavigationStarted(false);

    setTimeout(() => {
      mapRef.current?.animateToRegion(
        {
          latitude: truck.latitude,
          longitude: truck.longitude,
          latitudeDelta: 3,
          longitudeDelta: 3,
        },
        700
      );
    }, 300);
  };

  /* ============================================================
     START NAVIGATION
  ============================================================ */

  const startNavigation = () => {
    if (!selectedTruck) {
      Alert.alert("Select Truck", "Please select a truck first.");
      return;
    }

    setNavigationStarted(true);

    setTimeout(() => {
      mapRef.current?.fitToCoordinates(
        [
          currentLocation,
          {
            latitude: selectedTruck.latitude,
            longitude: selectedTruck.longitude,
          },
        ],
        {
          edgePadding: {
            top: 120,
            right: 50,
            bottom: 220,
            left: 50,
          },
          animated: true,
        }
      );
    }, 200);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ======================================================
          HEADER
      ====================================================== */}

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Smart Route</Text>
          <Text style={styles.subtitle}>North East Vehicle Tracking</Text>
        </View>

        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      {/* ======================================================
          SEARCH BAR
      ====================================================== */}

      <Pressable
        style={styles.searchBar}
        onPress={() => setSearchVisible(true)}
      >
        <Ionicons name="search" size={20} color="#64748B" />

        <View style={{ flex: 1 }}>
          <Text style={styles.searchLabel}>SEARCH VEHICLE / ROUTE</Text>

          <Text
            style={[
              styles.searchValue,
              !selectedTruck && styles.placeholder,
            ]}
          >
            {selectedTruck
              ? `${selectedTruck.name} · ${selectedTruck.vehicleNumber}`
              : "Search North East vehicle"}
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#64748B" />
      </Pressable>

      {/* ======================================================
          MAP
      ====================================================== */}

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={{
            latitude: 25.8,
            longitude: 91.8,
            latitudeDelta: 8,
            longitudeDelta: 7,
          }}
          showsCompass
          showsUserLocation={false}
        >
          {/* CURRENT LOCATION */}

          <Marker
            coordinate={currentLocation}
            title="Current Location"
          >
            <View style={styles.currentMarker}>
              <View style={styles.currentMarkerInner} />
            </View>
          </Marker>

          {/* NORTH EAST VEHICLES */}

          {NER_DUMMY_DATA.map((truck) => {
            const selected = selectedTruck?.id === truck.id;

            return (
              <Marker
                key={truck.id}
                coordinate={{
                  latitude: truck.latitude,
                  longitude: truck.longitude,
                }}
                title={truck.name}
                description={`${truck.vehicleNumber} · ${truck.status}`}
                onPress={() => selectTruck(truck)}
              >
                <View
                  style={[
                    styles.truckMarker,
                    selected && styles.selectedTruckMarker,
                    truck.status === "Idle" && styles.idleMarker,
                  ]}
                >
                  <Ionicons
                    name="car"
                    size={17}
                    color="#FFFFFF"
                  />
                </View>
              </Marker>
            );
          })}

          {/* ==================================================
              ROUTE
          ================================================== */}

          {navigationStarted && selectedTruck && (
            <Polyline
              coordinates={[
                currentLocation,
                {
                  latitude: selectedTruck.latitude,
                  longitude: selectedTruck.longitude,
                },
              ]}
              strokeColor="#2563EB"
              strokeWidth={6}
            />
          )}
        </MapView>

        {/* MAP INFO */}

        <View style={styles.mapInfo}>
          <View style={styles.mapInfoRow}>
            <View
              style={[
                styles.legendDot,
                { backgroundColor: "#2563EB" },
              ]}
            />

            <Text style={styles.mapInfoText}>
              Your Location
            </Text>
          </View>

          <View style={styles.mapInfoRow}>
            <View
              style={[
                styles.legendDot,
                { backgroundColor: "#16A34A" },
              ]}
            />

            <Text style={styles.mapInfoText}>
              North East Vehicles
            </Text>
          </View>
        </View>
      </View>

      {/* ======================================================
          SELECTED VEHICLE CARD
      ====================================================== */}

      {selectedTruck && (
        <View style={styles.vehicleCard}>
          <View style={styles.vehicleHeader}>
            <View style={styles.vehicleIcon}>
              <Ionicons
                name="car"
                size={22}
                color="#2563EB"
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.vehicleName}>
                {selectedTruck.name}
              </Text>

              <Text style={styles.vehicleNumber}>
                {selectedTruck.vehicleNumber}
              </Text>
            </View>

            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>
                {selectedTruck.status}
              </Text>
            </View>
          </View>

          <View style={styles.routeInfo}>
            <Ionicons
              name="navigate-outline"
              size={18}
              color="#2563EB"
            />

            <Text style={styles.routeText}>
              {selectedTruck.route}
            </Text>
          </View>

          <View style={styles.locationInfo}>
            <Ionicons
              name="location-outline"
              size={17}
              color="#64748B"
            />

            <Text style={styles.coordinates}>
              {selectedTruck.latitude.toFixed(4)},{" "}
              {selectedTruck.longitude.toFixed(4)}
            </Text>
          </View>

          {/* START NAVIGATION */}

          <Pressable
            style={styles.navigationButton}
            onPress={startNavigation}
          >
            <Ionicons
              name="navigate"
              size={20}
              color="#FFFFFF"
            />

            <Text style={styles.navigationText}>
              {navigationStarted
                ? "Route Showing"
                : "Start Navigation"}
            </Text>
          </Pressable>
        </View>
      )}

      {/* ======================================================
          SEARCH MODAL
      ====================================================== */}

      <Modal
        visible={searchVisible}
        animationType="slide"
        onRequestClose={() => setSearchVisible(false)}
      >
        <SafeAreaView style={styles.modal}>
          {/* HEADER */}

          <View style={styles.modalHeader}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setSearchVisible(false)}
            >
              <Ionicons
                name="close"
                size={24}
                color="#0F172A"
              />
            </Pressable>

            <Text style={styles.modalTitle}>
              Search Vehicle
            </Text>
          </View>

          {/* SEARCH */}

          <View style={styles.modalSearch}>
            <Ionicons
              name="search"
              size={20}
              color="#64748B"
            />

            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Vehicle, route or state"
              placeholderTextColor="#94A3B8"
              style={styles.input}
              autoFocus
            />
          </View>

          <Text style={styles.resultLabel}>
            NORTH EAST VEHICLES
          </Text>

          {/* RESULTS */}

          <ScrollView>
            {filteredTrucks.map((truck) => (
              <Pressable
                key={truck.id}
                style={styles.resultCard}
                onPress={() => selectTruck(truck)}
              >
                <View style={styles.resultIcon}>
                  <Ionicons
                    name="car"
                    size={20}
                    color="#2563EB"
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.resultName}>
                    {truck.name}
                  </Text>

                  <Text style={styles.resultVehicle}>
                    {truck.vehicleNumber}
                  </Text>

                  <Text style={styles.resultRoute}>
                    {truck.route}
                  </Text>

                  <Text style={styles.resultState}>
                    {truck.state}
                  </Text>
                </View>

                <View
                  style={[
                    styles.resultStatus,
                    truck.status === "Idle" &&
                      styles.idleStatus,
                  ]}
                >
                  <Text
                    style={[
                      styles.resultStatusText,
                      truck.status === "Idle" &&
                        styles.idleStatusText,
                    ]}
                  >
                    {truck.status}
                  </Text>
                </View>
              </Pressable>
            ))}

            {filteredTrucks.length === 0 && (
              <View style={styles.empty}>
                <Ionicons
                  name="search-outline"
                  size={40}
                  color="#94A3B8"
                />

                <Text style={styles.emptyText}>
                  No vehicle found
                </Text>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

/* ============================================================
   STYLES
============================================================ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    height: 68,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  title: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0F172A",
  },

  subtitle: {
    fontSize: 10,
    color: "#64748B",
    marginTop: 2,
  },

  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
  },

  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#16A34A",
    marginRight: 5,
  },

  liveText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#15803D",
  },

  searchBar: {
    margin: 14,
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  searchLabel: {
    fontSize: 8,
    fontWeight: "900",
    color: "#64748B",
    letterSpacing: 0.7,
  },

  searchValue: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 3,
  },

  placeholder: {
    color: "#94A3B8",
  },

  mapContainer: {
    flex: 1,
    marginHorizontal: 14,
    marginBottom: 10,
    borderRadius: 22,
    overflow: "hidden",
  },

  currentMarker: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(37,99,235,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },

  currentMarkerInner: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: "#2563EB",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  truckMarker: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  selectedTruckMarker: {
    backgroundColor: "#2563EB",
    width: 42,
    height: 42,
    borderRadius: 21,
  },

  idleMarker: {
    backgroundColor: "#64748B",
  },

  mapInfo: {
    position: "absolute",
    left: 12,
    bottom: 12,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 12,
    padding: 10,
  },

  mapInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },

  legendDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 7,
  },

  mapInfoText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#334155",
  },

  vehicleCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 14,
    marginBottom: 10,
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  vehicleHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  vehicleIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  vehicleName: {
    fontSize: 14,
    fontWeight: "900",
    color: "#0F172A",
  },

  vehicleNumber: {
    fontSize: 10,
    color: "#64748B",
    marginTop: 3,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#16A34A",
    marginRight: 5,
  },

  statusText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#15803D",
  },

  routeInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 13,
  },

  routeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#334155",
    marginLeft: 7,
  },

  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  coordinates: {
    fontSize: 9,
    color: "#64748B",
    marginLeft: 7,
  },

  navigationButton: {
    height: 50,
    borderRadius: 14,
    backgroundColor: "#2563EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },

  navigationText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
    marginLeft: 7,
  },

  modal: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  modalHeader: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  closeButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  modalTitle: {
    fontSize: 19,
    fontWeight: "900",
    color: "#0F172A",
  },

  modalSearch: {
    height: 52,
    marginHorizontal: 16,
    paddingHorizontal: 14,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  input: {
    flex: 1,
    height: "100%",
    marginLeft: 9,
    fontSize: 14,
    color: "#0F172A",
  },

  resultLabel: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
    fontSize: 10,
    fontWeight: "900",
    color: "#64748B",
    letterSpacing: 1,
  },

  resultCard: {
    marginHorizontal: 14,
    padding: 13,
    minHeight: 90,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  resultIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  resultName: {
    fontSize: 13,
    fontWeight: "900",
    color: "#0F172A",
  },

  resultVehicle: {
    fontSize: 10,
    fontWeight: "700",
    color: "#64748B",
    marginTop: 2,
  },

  resultRoute: {
    fontSize: 10,
    color: "#334155",
    marginTop: 5,
  },

  resultState: {
    fontSize: 9,
    color: "#94A3B8",
    marginTop: 2,
  },

  resultStatus: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  resultStatusText: {
    fontSize: 8,
    fontWeight: "900",
    color: "#15803D",
  },

  idleStatus: {
    backgroundColor: "#F1F5F9",
  },

  idleStatusText: {
    color: "#64748B",
  },

  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },

  emptyText: {
    marginTop: 10,
    color: "#64748B",
    fontSize: 13,
    fontWeight: "700",
  },
});
