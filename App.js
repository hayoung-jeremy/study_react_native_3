import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "./colors";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");

  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? theme.white : theme.gray,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? theme.white : theme.gray,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        // returnKeyType="done"   : 엔터키 이름 변경 (returnKeyLabel : Android)
        // secureTextEntry        : 비밀번호 input
        // multiline              : 여러줄 입력
        keyboardType="default"
        style={styles.input}
        placeholder={working ? "Add a To Do" : "Where do you want to go?"}
        placeholderTextColor="#555"
        onChangeText={onChangeText}
        value={text}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    color: "white",
    fontSize: 40,
    fontWeight: "600",
    marginRight: 12,
    borderRightWidth: 1,
    borderRightColor: "white",
  },
  input: {
    backgroundColor: "#151515",
    color: "#ccc",
    padding: 16,
    borderRadius: 8,
    fontSize: 20,
    marginTop: 20,
  },
});
