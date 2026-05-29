import { useState } from "react";
import { View, TextInput, Button, Alert, Text } from "react-native";
import { useRouter } from "expo-router";
import { addPost } from "../lib/storage";
import { useTheme } from "../lib/theme";

export default function NewPost() {
  const router = useRouter();
  const { colors } = useTheme();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const save = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    await addPost({
      id: Date.now().toString(),
      title,
      content,
    });

    router.replace("/");
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: colors.bg }}>
      <Text style={{ color: colors.text }}>Título</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          padding: 10,
          borderRadius: 8,
          color: colors.text,
          marginBottom: 12,
        }}
      />

      <Text style={{ color: colors.text }}>Contenido</Text>

      <TextInput
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          padding: 10,
          borderRadius: 8,
          height: 200,
          color: colors.text,
        }}
      />

      <Button title="Guardar" onPress={save} />
    </View>
  );
}
