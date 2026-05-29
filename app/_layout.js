import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { useTheme } from "../lib/theme";

export default function Layout() {
  const { isDark, colors } = useTheme();

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(colors.navBg);
    NavigationBar.setButtonStyleAsync(isDark ? "light" : "dark");
  }, [isDark]);

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />

      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Posts" }} />
        <Stack.Screen name="post/[id]" options={{ title: "Post" }} />
        <Stack.Screen name="new" options={{ title: "Nuevo post" }} />
        <Stack.Screen name="edit/[id]" options={{ title: "Editar post" }} />
      </Stack>
    </>
  );
}
