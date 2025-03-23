import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  initialColors?: { name: string; value: string }[];
  onColorsChange?: (colors: { name: string; value: string }[]) => void;
}

const initialColor = {
  name: "Blue",
  value: "#0000ff",
};

export default function HomeScreen({
  initialColors = [initialColor],
  onColorsChange,
}: Props) {
  const [colors, setColors] = useState(initialColors);
  const [selectedColor, setSelectedColor] = useState<{
    name: string;
    value: string;
  } | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (onColorsChange) {
      onColorsChange(colors);
    }
  }, [colors, onColorsChange]);

  /* Generates random color and adds it to colors */
  const handleAddNewColor = () => {
    const newColor = {
      name: `Color ${colors.length + 1}`,
      value: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    };
    setColors([...colors, newColor]);
  };

  const handleColorPress = (color: { name: string; value: string }) => {
    setSelectedColor(color);
    setInputValue(color.value);
    setModalVisible(true);
  };

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  const handleEditPress = () => {
    const updatedColors = colors.map((color) => {
      if (color === selectedColor) {
        return { ...color, value: inputValue };
      }
      return color;
    });
    setColors(updatedColors);
    setModalVisible(false);
  };

  const handleDeletePress = () => {
    const updatedColors = colors.filter((color) => color !== selectedColor);
    setColors(updatedColors);
    setSelectedColor(null);
    setModalVisible(false);
  };

  const handleCancelPress = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.mainText}>Random Color Generator:</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Pressable style={styles.buttonContainer} onPress={handleAddNewColor}>
            <Text style={styles.buttonText}>Add Color</Text>
          </Pressable>
        </View>
        <View style={styles.boxesContainer}>
          {/* Color boxes map */}
          {colors.map((color, index) => (
            <Pressable
              key={index}
              style={[styles.box, { backgroundColor: color.value }]}
              onPress={() => handleColorPress(color)}
            ></Pressable>
          ))}
        </View>
        {/* Modal on editing color */}
        <Modal visible={modalVisible} animationType="slide">
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: selectedColor?.value },
            ]}
          >
            <Text style={styles.modalTitle}>Edit Color</Text>
            <View style={styles.modalInputContainer}>
              <TextInput
                style={styles.modalInput}
                value={inputValue}
                onChangeText={handleInputChange}
              />
            </View>
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={styles.modalEditButton}
                onPress={handleEditPress}
              >
                <Text style={styles.modalButtonText}>Edit</Text>
              </Pressable>
              <Pressable
                style={styles.modalDeleteButton}
                onPress={handleDeletePress}
              >
                <Text style={styles.modalButtonText}>Delete</Text>
              </Pressable>
              <Pressable
                style={styles.modalCancelButton}
                onPress={handleCancelPress}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    textAlign: "center",
    alignItems: "center",
  },
  mainText: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
  },
  buttonContainer: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
    backgroundColor: "green",
  },
  buttonText: {
    color: "white",
  },
  boxesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  box: {
    width: 50,
    height: 50,
    margin: 2,
  },
  inputContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  inputLabel: {
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    flex: 1,
  },
  inputEditing: {
    borderColor: "blue",
  },
  buttonRow: {
    flexDirection: "row",
  },
  editButton: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "gray",
  },
  editButtonDone: {
    backgroundColor: "green",
  },
  editButtonText: {
    color: "white",
  },
  deleteButton: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "red",
  },
  deleteButtonText: {
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    textShadowColor: "white",
    textShadowRadius: 5,
    textShadowOffset: { width: 0, height: 0 },
  },
  modalInputContainer: {
    marginBottom: 20,
  },
  modalInput: {
    height: 40,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    width: 200,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 200,
  },
  modalEditButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  modalDeleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  modalCancelButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
  },
});
