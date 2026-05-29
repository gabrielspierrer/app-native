import { useCallback, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { getPosts } from "../lib/storage";
import { useTheme } from "../lib/theme";

export default function Index() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const { colors } = useTheme();

  const loadPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  // 🔥 CLAVE: recarga cada vez que entras a esta pantalla
  useFocusEffect(
    useCallback(() => {
      loadPosts();
    }, [])
  );

  const Empty = () => (
    <View style={{ marginTop: 80, alignItems: "center" }}>
      <Text style={{ color: colors.text, fontSize: 16 }}>
        No hay posts todavía
      </Text>
      <Text style={{ color: colors.subtext, marginTop: 6 }}>
        Crea tu primer post
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: colors.bg }}>
      <Pressable
        onPress={() => router.push("/new")}
        style={{
          backgroundColor: colors.primary,
          padding: 12,
          borderRadius: 10,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          + Crear post
        </Text>
      </Pressable>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={Empty}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/post/${item.id}`)}
            style={{
              backgroundColor: colors.card,
              padding: 14,
              borderRadius: 12,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: colors.text, fontWeight: "600" }}>
              {item.title}
            </Text>
            <Text style={{ color: colors.subtext }} numberOfLines={2}>
              {item.content}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}
