import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto } from "@expo/vector-icons";

import { theme } from "./colors";

const STORAGE_KEY = "@toDos";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  useEffect(() => {
    loadToDos();
  }, []);

  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);

  const saveToDos = async (dataToSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  };

  const loadToDos = async () => {
    const str = await AsyncStorage.getItem(STORAGE_KEY);
    if (str !== null) {
      setToDos(JSON.parse(str));
    }
  };
  const addToDo = async () => {
    if (text === "") {
      return;
    }
    const newToDos = { ...toDos, [Date.now()]: { text, working } };
    setToDos(newToDos);
    saveToDos(newToDos);
    setText("");
  };

  const deleteToDo = (key) => {
    if (Platform.OS === "web") {
      const ok = confirm("정말로 삭제하시겠습니까?");
      if (ok) {
        const newToDos = { ...toDos };
        // 위 객체는 아직 state 에 집어넣지 않았기 때문에, 아래와 같이 delete 연산자를 사용하여 직접 수정 가능함
        delete newToDos[key];
        setToDos(newToDos);
        saveToDos(newToDos);
      }
    } else {
      Alert.alert("해당 내용 삭제하기", "정말로 삭제하시겠습니까?", [
        { text: "아니오", style: "destructive" },
        {
          text: "예",
          onPress: () => {
            const newToDos = { ...toDos };
            // 위 객체는 아직 state 에 집어넣지 않았기 때문에, 아래와 같이 delete 연산자를 사용하여 직접 수정 가능함
            delete newToDos[key];
            setToDos(newToDos);
            saveToDos(newToDos);
          },
        },
      ]);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{
              color: theme.white,
              fontSize: 40,
              fontWeight: "600",
              marginRight: 12,
              color: working ? theme.white : theme.gray500,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              color: theme.white,
              fontSize: 40,
              fontWeight: "600",
              marginRight: 12,
              color: !working ? theme.white : theme.gray500,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        returnKeyType="done" //   : 엔터키 이름 변경 (returnKeyLabel : Android)
        // secureTextEntry        : 비밀번호 input
        // multiline              : 여러줄 입력
        keyboardType="default"
        style={styles.input}
        placeholder={working ? "Add a To Do" : "Where do you want to go?"}
        placeholderTextColor="#555"
        onChangeText={onChangeText}
        value={text}
        onSubmitEditing={addToDo}
      />
      <ScrollView style={styles.scrollContainer}>
        {Object.keys(toDos).map((key) =>
          toDos[key].working === working ? (
            <View key={key} style={styles.toDo}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>

              <TouchableOpacity
                onPress={() => deleteToDo(key)}
                style={styles.btnIcon}
              >
                <Text>
                  <Fontisto name="trash" size={20} color={theme.gray700} />
                </Text>
              </TouchableOpacity>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.gray100,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    marginTop: 100,
  },
  input: {
    backgroundColor: theme.gray200,
    color: "#ccc",
    padding: 16,
    borderRadius: 8,
    fontSize: 20,
    marginVertical: 20,
  },
  scrollContainer: {
    borderTopWidth: 1,
    borderTopColor: theme.gray300,
    paddingTop: 20,
  },
  toDo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.gray300,
    marginBottom: 12,
    paddingVertical: 4,
    paddingLeft: 20,
    paddingRight: 6,
    borderRadius: 8,
    minHeight: 40,
  },
  toDoText: {
    flex: 6,
    color: theme.white,
    fontSize: 18,
    fontWeight: "500",
  },
  btnIcon: {
    width: 48,
    height: 48,
    flex: 1,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
});
