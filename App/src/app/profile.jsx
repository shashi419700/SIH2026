import React, { memo, useState } from "react";
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";


const Icon = memo(function Icon({
  name,
  size = 22,
  color = "#0F172A",
  library = "ion",
}) {
  if (library === "material") {
    return (
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={color}
      />
    );
  }

  return (
    <Ionicons
      name={name}
      size={size}
      color={color}
    />
  );
});


/* ============================================================
   PROFILE CARD
============================================================ */

function ProfileCard({ dark, onEdit }) { 
  return (
    <View
      style={[
        styles.profileCard,
        dark && styles.darkSurface,
      ]}
    >
      <View style={styles.profileTop}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>SK</Text>

          <View style={styles.onlineDot} />
        </View>

        <View style={styles.profileIdentity}>
          <Text
            style={[
              styles.profileName,
              dark && styles.darkText,
            ]}
          >
           Shashi kumar
          </Text>

          <Text
            style={[
              styles.profileEmail,
              dark && styles.darkMutedText,
            ]}
          >
            codewithshashi009@gmail.com
          </Text>

          <View style={styles.memberBadge}>
            <Icon
              name="shield-checkmark"
              size={13}
              color="#2563EB"
            />

            <Text style={styles.memberBadgeText}>
              Smart Route Member
            </Text>
          </View>
        </View>

        <Pressable
          style={styles.editButton}
          onPress={onEdit}
        >
          <Icon
            name="create-outline"
            size={18}
            color="#2563EB"
          />
        </Pressable>
      </View>

      <View style={styles.profileDivider} />

      <View style={styles.profileStats}>
        <ProfileStat
          icon="navigate"
          value="128"
          label="Trips"
        />

        <ProfileStat
          icon="map"
          value="2,486"
          label="KM Travelled"
        />

        <ProfileStat
          icon="leaf"
          value="18.4"
          label="KG CO₂ Saved"
        />
      </View>
    </View>
  );
}

function ProfileStat({ icon, value, label }) {
  return (
    <View style={styles.profileStat}>
      <View style={styles.profileStatIcon}>
        <Icon
          name={icon}
          size={17}
          color="#2563EB"
        />
      </View>

      <Text style={styles.profileStatValue}>
        {value}
      </Text>

      <Text style={styles.profileStatLabel}>
        {label}
      </Text>
    </View>
  );
}

/* ============================================================
   PREFERENCE CARD
============================================================ */

function PreferenceCard({
  dark,
  icon,
  title,
  subtitle,
  right,
  onPress,
}) {
  return (
    <Pressable
      style={[
        styles.preferenceCard,
        dark && styles.darkSurface,
      ]}
      onPress={onPress}
    >
      <View style={styles.preferenceIcon}>
        <Icon
          name={icon}
          size={20}
          color="#2563EB"
        />
      </View>

      <View style={styles.preferenceContent}>
        <Text
          style={[
            styles.preferenceTitle,
            dark && styles.darkText,
          ]}
        >
          {title}
        </Text>

        {subtitle ? (
          <Text
            style={[
              styles.preferenceSubtitle,
              dark && styles.darkMutedText,
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      {right || (
        <Icon
          name="chevron-forward"
          size={19}
          color="#94A3B8"
        />
      )}
    </Pressable>
  );
}

/* ============================================================
   VEHICLE CARD
============================================================ */

function VehicleProfileCard({
  dark,
  vehicle,
  onChange,
}) {
  return (
    <View
      style={[
        styles.sectionCard,
        dark && styles.darkSurface,
      ]}
    >
      <View style={styles.sectionHeader}>
        <View>
          <Text
            style={[
              styles.sectionTitle,
              dark && styles.darkText,
            ]}
          >
            Travel Profile
          </Text>

          <Text
            style={[
              styles.sectionSubtitle,
              dark && styles.darkMutedText,
            ]}
          >
            Used for route recommendations
          </Text>
        </View>

        <View style={styles.sectionIcon}>
          <Icon
            name="analytics"
            size={18}
            color="#2563EB"
          />
        </View>
      </View>

      <View style={styles.vehicleProfile}>
        <View style={styles.vehicleLargeIcon}>
          <Icon
            name={vehicleIcon(vehicle)}
            size={27}
            color="#2563EB"
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.vehicleTitle,
              dark && styles.darkText,
            ]}
          >
            {vehicle}
          </Text>

          <Text
            style={[
              styles.vehicleSubtitle,
              dark && styles.darkMutedText,
            ]}
          >
            Route scoring is optimized for your
            vehicle type.
          </Text>
        </View>

        <Pressable
          style={styles.changeButton}
          onPress={onChange}
        >
          <Text style={styles.changeText}>
            Change
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function vehicleIcon(vehicle) {
  const icons = {
    Car: "car",
    Bike: "bicycle",
    Scooter: "bicycle",
    EV: "flash",
    Truck: "truck",
    Bicycle: "bicycle",
    Walking: "walk",
  };

  return icons[vehicle] || "car";
}

/* ============================================================
   SMART PREFERENCES
============================================================ */

function SmartPreferences({
  dark,
  preferences,
  setPreferences,
}) {
  const update = (key, value) => {
    setPreferences((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  return (
    <View
      style={[
        styles.sectionCard,
        dark && styles.darkSurface,
      ]}
    >
      <View style={styles.sectionHeader}>
        <View>
          <Text
            style={[
              styles.sectionTitle,
              dark && styles.darkText,
            ]}
          >
            Smart Preferences
          </Text>

          <Text
            style={[
              styles.sectionSubtitle,
              dark && styles.darkMutedText,
            ]}
          >
            Personalize route recommendations
          </Text>
        </View>

        <View style={styles.sectionIcon}>
          <Icon
            name="sparkles"
            size={18}
            color="#2563EB"
          />
        </View>
      </View>

      <PreferenceSwitch
        dark={dark}
        icon="shield-checkmark"
        title="Prioritize Safety"
        subtitle="Prefer safer roads over small time savings"
        value={preferences.safety}
        onChange={(value) =>
          update("safety", value)
        }
      />

      <PreferenceSwitch
        dark={dark}
        icon="cash-outline"
        title="Avoid Toll Roads"
        subtitle="Reduce toll expenses where possible"
        value={preferences.tolls}
        onChange={(value) =>
          update("tolls", value)
        }
      />

      <PreferenceSwitch
        dark={dark}
        icon="water"
        title="Avoid Flood Areas"
        subtitle="Avoid roads with higher waterlogging risk"
        value={preferences.flood}
        onChange={(value) =>
          update("flood", value)
        }
      />

      <PreferenceSwitch
        dark={dark}
        icon="car"
        title="Avoid Heavy Traffic"
        subtitle="Prefer smoother traffic conditions"
        value={preferences.traffic}
        onChange={(value) =>
          update("traffic", value)
        }
      />

      <PreferenceSwitch
        dark={dark}
        icon="leaf"
        title="Minimize CO₂"
        subtitle="Prefer routes with lower emissions"
        value={preferences.co2}
        onChange={(value) =>
          update("co2", value)
        }
      />
    </View>
  );
}

function PreferenceSwitch({
  dark,
  icon,
  title,
  subtitle,
  value,
  onChange,
}) {
  return (
    <View style={styles.switchRow}>
      <View style={styles.switchIcon}>
        <Icon
          name={icon}
          size={18}
          color="#2563EB"
        />
      </View>

      <View style={styles.switchContent}>
        <Text
          style={[
            styles.switchTitle,
            dark && styles.darkText,
          ]}
        >
          {title}
        </Text>

        <Text
          style={[
            styles.switchSubtitle,
            dark && styles.darkMutedText,
          ]}
        >
          {subtitle}
        </Text>
      </View>

      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{
          false: "#CBD5E1",
          true: "#93C5FD",
        }}
        thumbColor={
          value ? "#2563EB" : "#F8FAFC"
        }
      />
    </View>
  );
}

/* ============================================================
   SAVED PLACES
============================================================ */

function SavedPlaces({ dark, onPress }) {
  return (
    <View
      style={[
        styles.sectionCard,
        dark && styles.darkSurface,
      ]}
    >
      <View style={styles.sectionHeader}>
        <View>
          <Text
            style={[
              styles.sectionTitle,
              dark && styles.darkText,
            ]}
          >
            Saved Places
          </Text>

          <Text
            style={[
              styles.sectionSubtitle,
              dark && styles.darkMutedText,
            ]}
          >
            Quickly navigate to your favorites
          </Text>
        </View>

        <Icon
          name="bookmark"
          size={20}
          color="#2563EB"
        />
      </View>

      <SavedPlace
        dark={dark}
        icon="home"
        title="Home"
        address="Add your home address"
        onPress={onPress}
      />

      <SavedPlace
        dark={dark}
        icon="briefcase"
        title="Work"
        address="Add your work address"
        onPress={onPress}
      />

      <SavedPlace
        dark={dark}
        icon="heart"
        title="Favorites"
        address="Manage favorite destinations"
        onPress={onPress}
      />
    </View>
  );
}

function SavedPlace({
  dark,
  icon,
  title,
  address,
  onPress,
}) {
  return (
    <Pressable
      style={styles.savedPlaceRow}
      onPress={onPress}
    >
      <View style={styles.savedPlaceIcon}>
        <Icon
          name={icon}
          size={19}
          color="#2563EB"
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.savedPlaceTitle,
            dark && styles.darkText,
          ]}
        >
          {title}
        </Text>
    
        <Text
          style={[
            styles.savedPlaceAddress,
            dark && styles.darkMutedText,
          ]}
        >
          {address}
        </Text>
      </View>

      <Icon
        name="chevron-forward"
        color="#94A3B8"
        size={18}
      />
    </Pressable>
  );
}

/* ============================================================
   ACCOUNT
============================================================ */

function AccountSection({
  dark,
  onEditProfile,
  onNotifications,
  onPrivacy,
}) {
  return (
    <>
      <View style={styles.sectionHeading}>
        <Text
          style={[
            styles.headingTitle,
            dark && styles.darkText,
          ]}
        >
          Account
        </Text>

        <Text
          style={[
            styles.headingSubtitle,
            dark && styles.darkMutedText,
          ]}
        >
          Manage your Smart Route account
        </Text>
      </View>

      <View style={styles.accountList}>
        <PreferenceCard
          dark={dark}
          icon="person-outline"
          title="Personal Information"
          subtitle="Name, email and profile details"
          onPress={onEditProfile}
        />

        <PreferenceCard
          dark={dark}
          icon="notifications-outline"
          title="Notifications"
          subtitle="Traffic, weather and route alerts"
          onPress={onNotifications}
        />

        <PreferenceCard
          dark={dark}
          icon="lock-closed-outline"
          title="Privacy & Security"
          subtitle="Control your account privacy"
          onPress={onPrivacy}
        />

        <PreferenceCard
          dark={dark}
          icon="language-outline"
          title="Language"
          subtitle="English"
          onPress={() =>
            Alert.alert(
              "Language",
              "Language selection opened."
            )
          }
        />

        <PreferenceCard
          dark={dark}
          icon="help-circle-outline"
          title="Help & Support"
          subtitle="Get help with Smart Route"
          onPress={() =>
            Alert.alert(
              "Help & Support",
              "Support center opened."
            )
          }
        />
      </View>
    </>
  );
}

/* ============================================================
   ABOUT
============================================================ */

function AboutCard({ dark }) {
  return (
    <View
      style={[
        styles.aboutCard,
        dark && styles.darkSurface,
      ]}
    >
      <View style={styles.aboutIcon}>
        <Icon
          name="sparkles"
          size={20}
          color="#2563EB"
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.aboutTitle,
            dark && styles.darkText,
          ]}
        >
          Smart Route
        </Text>

        <Text
          style={[
            styles.aboutText,
            dark && styles.darkMutedText,
          ]}
        >
          Intelligent route recommendations based
          on safety, traffic, weather and road
          conditions.
        </Text>

        <Text style={styles.versionText}>
          Version 1.0.0
        </Text>
      </View>
    </View>
  );
}

/* ============================================================
   EDIT PROFILE MODAL
============================================================ */

function EditProfileModal({
  visible,
  dark,
  onClose,
}) {
  const [name, setName] =
    useState("Shashi Kumar");

  const [email, setEmail] =
    useState("codewithshashi00@gmail.com");

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.editSheet,
            dark && styles.darkSurface,
          ]}
        >
          <View style={styles.sheetHandle} />

          <View style={styles.sheetHeader}>
            <Text
              style={[
                styles.sheetTitle,
                dark && styles.darkText,
              ]}
            >
              Edit Profile
            </Text>

            <Pressable onPress={onClose}>
              <Icon
                name="close"
                color={dark ? "#F8FAFC" : "#0F172A"}
              />
            </Pressable>
          </View>

          <Text
            style={[
              styles.inputLabel,
              dark && styles.darkMutedText,
            ]}
          >
            FULL NAME
          </Text>

          <View
            style={[
              styles.inputBox,
              dark && styles.darkInput,
            ]}
          >
            <Icon
              name="person-outline"
              color="#64748B"
              size={19}
            />

            <TextInput
              value={name}
              onChangeText={setName}
              style={[
                styles.input,
                dark && styles.darkText,
              ]}
              placeholder="Your name"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <Text
            style={[
              styles.inputLabel,
              dark && styles.darkMutedText,
            ]}
          >
            EMAIL
          </Text>

          <View
            style={[
              styles.inputBox,
              dark && styles.darkInput,
            ]}
          >
            <Icon
              name="mail-outline"
              color="#64748B"
              size={19}
            />

            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={[
                styles.input,
                dark && styles.darkText,
              ]}
              placeholder="Email address"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <Pressable
            style={styles.saveButton}
            onPress={() => {
              onClose();

              Alert.alert(
                "Profile updated",
                "Your profile information has been saved."
              );
            }}
          >
            <Icon
              name="checkmark"
              color="#FFFFFF"
              size={20}
            />

            <Text style={styles.saveButtonText}>
              Save Changes
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

/* ============================================================
   MAIN PROFILE SCREEN
============================================================ */

export default function ProfileScreen() {
  const systemTheme = useColorScheme();

  const [dark, setDark] = useState(
    systemTheme === "dark"
  );

  const [editModal, setEditModal] =
    useState(false);

  const [vehicle, setVehicle] =
    useState("Car");

  const [preferences, setPreferences] =
    useState({
      safety: true,
      tolls: true,
      flood: true,
      traffic: false,
      co2: false,
    });

  const showComingSoon = (title) => {
    Alert.alert(
      title,
      `${title} settings opened.`
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        dark && styles.darkBackground,
      ]}
    >
      <StatusBar
        barStyle={
          dark
            ? "light-content"
            : "dark-content"
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }
      >
        {/* PROFILE */}
        <ProfileCard
          dark={dark}
          onEdit={() =>
            setEditModal(true)
          }
        />

        {/* SMART PROFILE */}
        <View style={styles.sectionHeading}>
          <Text
            style={[
              styles.headingTitle,
              dark && styles.darkText,
            ]}
          >
            Your Driving Profile
          </Text>

          <Text
            style={[
              styles.headingSubtitle,
              dark && styles.darkMutedText,
            ]}
          >
            Personalized route intelligence
          </Text>
        </View>

        <VehicleProfileCard
          dark={dark}
          vehicle={vehicle}
          onChange={() => {
            const vehicles = [
              "Car",
              "Bike",
              "Scooter",
              "EV",
              "Truck",
              "Bicycle",
              "Walking",
            ];

            const currentIndex =
              vehicles.indexOf(vehicle);

            const nextVehicle =
              vehicles[
                (currentIndex + 1) %
                  vehicles.length
              ];

            setVehicle(nextVehicle);
          }}
        />

        {/* PREFERENCES */}
        <SmartPreferences
          dark={dark}
          preferences={preferences}
          setPreferences={setPreferences}
        />

        {/* SAVED PLACES */}
        <SavedPlaces
          dark={dark}
          onPress={() =>
            showComingSoon("Saved Places")
          }
        />

        {/* ACCOUNT */}
        <AccountSection
          dark={dark}
          onEditProfile={() =>
            setEditModal(true)
          }
          onNotifications={() =>
            showComingSoon("Notifications")
          }
          onPrivacy={() =>
            showComingSoon(
              "Privacy & Security"
            )
          }
        />

        {/* APPEARANCE */}
        <View style={styles.sectionHeading}>
          <Text
            style={[
              styles.headingTitle,
              dark && styles.darkText,
            ]}
          >
            Appearance
          </Text>

          <Text
            style={[
              styles.headingSubtitle,
              dark && styles.darkMutedText,
            ]}
          >
            Customize your app experience
          </Text>
        </View>


        {/* ABOUT */}
        <AboutCard dark={dark} />

        {/* LOGOUT */}
        <Pressable
          style={[
            styles.logoutButton,
            dark && {
              backgroundColor: "#1F2937",
              borderColor: "#7F1D1D",
            },
          ]}
          onPress={() =>
            Alert.alert(
              "Log out",
              "Are you sure you want to log out?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Log out",
                  style: "destructive",
                  onPress: () =>
                    Alert.alert(
                      "Logged out",
                      "You have been logged out."
                    ),
                },
              ]
            )
          }
        >
          <Icon
            name="log-out-outline"
            color="#DC2626"
            size={20}
          />

          <Text style={styles.logoutText}>
            Log Out
          </Text>
        </Pressable>

        <Text
          style={[
            styles.footerText,
            dark && styles.darkMutedText,
          ]}
        >
          Smart Route • Made for safer journeys
        </Text>

        <View style={{ height: 35 }} />
      </ScrollView>

      {/* EDIT PROFILE */}
      <EditProfileModal
        visible={editModal}
        dark={dark}
        onClose={() =>
          setEditModal(false)
        }
      />
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

  darkBackground: {
    backgroundColor: "#0F172A",
  },

  darkSurface: {
    backgroundColor: "#111827",
  },

  darkText: {
    color: "#F8FAFC",
  },

  darkMutedText: {
    color: "#94A3B8",
  },

  header: {
    height: 68,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomWidth:
      StyleSheet.hairlineWidth,
    borderBottomColor: "#E2E8F0",
  },

  headerCenter: {
    flex: 1,
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },

  headerSubtitle: {
    fontSize: 11,
    marginTop: 2,
    color: "#64748B",
  },

  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },

  scrollContent: {
    paddingTop: 12,
    paddingBottom: 20,
  },

  /* PROFILE */

  profileCard: {
    marginHorizontal: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    shadowColor: "#0F172A",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 2,
  },

  profileTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
  },

  onlineDot: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#16A34A",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    right: 0,
    bottom: 2,
  },

  profileIdentity: {
    flex: 1,
    marginLeft: 13,
  },

  profileName: {
    color: "#0F172A",
    fontSize: 19,
    fontWeight: "900",
  },

  profileEmail: {
    color: "#64748B",
    fontSize: 10,
    marginTop: 3,
  },

  memberBadge: {
    alignSelf: "flex-start",
    marginTop: 8,
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  memberBadgeText: {
    color: "#2563EB",
    fontSize: 9,
    fontWeight: "900",
    marginLeft: 4,
  },

  editButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },

  profileDivider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginTop: 18,
    marginBottom: 15,
  },

  profileStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  profileStat: {
    flex: 1,
    alignItems: "center",
  },

  profileStatIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },

  profileStatValue: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "900",
    marginTop: 7,
  },

  profileStatLabel: {
    color: "#64748B",
    fontSize: 8,
    fontWeight: "700",
    marginTop: 2,
  },

  /* HEADINGS */

  sectionHeading: {
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 9,
  },

  headingTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0F172A",
  },

  headingSubtitle: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 3,
  },

  /* SECTION CARD */

  sectionCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 14,
    marginTop: 3,
    borderRadius: 20,
    padding: 16,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
  },

  sectionTitle: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "900",
  },

  sectionSubtitle: {
    color: "#64748B",
    fontSize: 10,
    marginTop: 3,
  },

  sectionIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },

  /* VEHICLE */

  vehicleProfile: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 15,
    padding: 12,
  },

  vehicleLargeIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  vehicleTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: "#0F172A",
  },

  vehicleSubtitle: {
    fontSize: 9,
    lineHeight: 14,
    color: "#64748B",
    marginTop: 3,
  },

  changeButton: {
    minHeight: 40,
    paddingHorizontal: 10,
    borderRadius: 11,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
  },

  changeText: {
    color: "#2563EB",
    fontSize: 10,
    fontWeight: "900",
  },

  /* SMART PREFERENCES */

  switchRow: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  switchIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },

  switchContent: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
  },

  switchTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#0F172A",
  },

  switchSubtitle: {
    fontSize: 9,
    lineHeight: 13,
    color: "#64748B",
    marginTop: 2,
  },

  /* SAVED PLACES */

  savedPlaceRow: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  savedPlaceIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  savedPlaceTitle: {
    fontSize: 12,
    fontWeight: "850",
    color: "#0F172A",
  },

  savedPlaceAddress: {
    fontSize: 9,
    color: "#64748B",
    marginTop: 3,
  },

  /* ACCOUNT */

  accountList: {
    marginHorizontal: 14,
  },

  preferenceCard: {
    minHeight: 68,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 13,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  preferenceIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  preferenceContent: {
    flex: 1,
  },

  preferenceTitle: {
    fontSize: 12,
    fontWeight: "850",
    color: "#0F172A",
  },

  preferenceSubtitle: {
    fontSize: 9,
    color: "#64748B",
    marginTop: 3,
  },


  appearanceIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  appearanceTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
  },

  appearanceSubtitle: {
    color: "#BFDBFE",
    fontSize: 9,
    marginTop: 3,
  },

  /* ABOUT */

  aboutCard: {
    marginHorizontal: 14,
    marginTop: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
  },

  aboutIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  aboutTitle: {
    color: "#0F172A",
    fontSize: 13,
    fontWeight: "900",
  },

  aboutText: {
    color: "#64748B",
    fontSize: 10,
    lineHeight: 15,
    marginTop: 4,
  },

  versionText: {
    color: "#2563EB",
    fontSize: 9,
    fontWeight: "800",
    marginTop: 7,
  },

  /* LOGOUT */

  logoutButton: {
    marginHorizontal: 14,
    marginTop: 14,
    height: 52,
    borderRadius: 15,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  logoutText: {
    color: "#DC2626",
    fontSize: 12,
    fontWeight: "900",
    marginLeft: 7,
  },

  footerText: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 9,
    marginTop: 16,
  },

  /* MODAL */

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor:
      "rgba(15,23,42,0.5)",
  },

  editSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom:
      Platform.OS === "ios" ? 28 : 18,
  },

  sheetHandle: {
    width: 42,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#CBD5E1",
    alignSelf: "center",
    marginBottom: 13,
  },

  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  sheetTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0F172A",
  },

  inputLabel: {
    fontSize: 9,
    fontWeight: "900",
    color: "#64748B",
    letterSpacing: 1,
    marginTop: 10,
    marginBottom: 7,
  },

  inputBox: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
  },

  darkInput: {
    backgroundColor: "#1E293B",
  },

  input: {
    flex: 1,
    height: "100%",
    marginLeft: 9,
    color: "#0F172A",
    fontSize: 13,
  },

  saveButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 22,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    marginLeft: 7,
  },
});
