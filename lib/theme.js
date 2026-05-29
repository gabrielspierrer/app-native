import { useColorScheme } from "react-native";

export function useTheme() {
  const scheme = useColorScheme();

  const isDark = scheme === "dark";

  const colors = {
    bg: isDark ? "#0f172a" : "#ffffff",
    card: isDark ? "#1e293b" : "#f3f4f6",
    text: isDark ? "#f8fafc" : "#111827",
    subtext: isDark ? "#94a3b8" : "#6b7280",
    primary: "#4f46e5",
    danger: "#ef4444",
    border: isDark ? "#334155" : "#e5e7eb",
    navBg: isDark ? "#0f172a" : "#ffffff",
    navIcon: isDark ? "light" : "dark",
  };

  return { isDark, colors };
}
