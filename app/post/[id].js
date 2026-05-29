import { useCallback, useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { getPost, deletePost } from "../../lib/storage";
import { useTheme } from "../../lib/theme";

export default function PostScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useTheme();

  const [post, setPost] = useState(null);

  const loadPost = async () => {
    const data = await getPost(id);
    setPost(data);
  };

  // 🔥 se actualiza cada vez que entras
  useFocusEffect(
    useCallback(() => {
      loadPost();
    }, [id])
  );

  const confirmDelete = () => {
    Alert.alert("Eliminar", "¿Seguro que quieres eliminarlo?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          await deletePost(id);
          router.replace("/");
        },
      },
    ]);
  };

  if (!post) return null;

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: colors.bg }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.text }}>
        {post.title}
      </Text>

      <Text style={{ marginTop: 12, color: colors.text }}>
        {post.content}
      </Text>

      <View style={{ flexDirection: "row", marginTop: 30, gap: 10 }}>
        <Pressable
          onPress={() => router.push(`/edit/${id}`)}
          style={{
            flex: 1,
            backgroundColor: colors.card,
            padding: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ textAlign: "center", color: colors.text }}>
            ✏️ Editar
          </Text>
        </Pressable>

        <Pressable
          onPress={confirmDelete}
          style={{
            flex: 1,
            backgroundColor: "#ef4444",
            padding: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>
            🗑️ Eliminar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
