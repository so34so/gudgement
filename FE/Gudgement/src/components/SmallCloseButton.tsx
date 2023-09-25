import React from "react";
import { View, StyleSheet } from "react-native";

const SmallCloseButton = () => {
  return (
    <View className="items-center justify-center" style={styles.closeButton}>
      <View
        className="items-center justify-center"
        style={styles.closeButtonInner}
      >
        <View
          className="items-center justify-center"
          style={styles.closeButtonX}
        >
          <View
            style={{ ...styles.closeButtonLine, ...styles.closeButtonLineLeft }}
          />
          <View
            style={{
              ...styles.closeButtonLine,
              ...styles.closeButtonLineRight,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    width: 40,
    height: 40,
    top: 17,
    right: 17,
    backgroundColor: "#FF0000",
    borderWidth: 4,
    borderColor: "#000000",
    borderRadius: 14,
  },
  closeButtonInner: {
    position: "absolute",
    width: 25,
    height: 25,
    backgroundColor: "#FF0000",
    borderWidth: 2,
    borderColor: "rgba(120, 50, 50, 0.30)",
    borderRadius: 5,
  },
  closeButtonX: {
    position: "absolute",
    width: 5,
    height: 5,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
  },
  closeButtonLine: {
    position: "absolute",
    width: 25,
    height: 0,
    borderWidth: 4,
    borderRadius: 10,

    borderColor: "#FFFFFF",
  },
  closeButtonLineLeft: {
    transform: [{ rotate: "135deg" }],
  },
  closeButtonLineRight: {
    transform: [{ rotate: "-135deg" }],
  },
});

export default SmallCloseButton;
