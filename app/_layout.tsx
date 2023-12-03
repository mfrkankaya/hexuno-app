import React, { useRef } from "react"
import { View } from "react-native"
import {
  Lato_400Regular,
  Lato_700Bold,
  Lato_900Black,
} from "@expo-google-fonts/lato"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useFonts } from "expo-font"
import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Provider as JotaiProvider } from "jotai"

export default function RootLayout() {
  const queryClient = useRef(new QueryClient()).current
  const [fontsLoaded] = useFonts({
    "lato-regular": Lato_400Regular,
    "lato-bold": Lato_700Bold,
    "lato-black": Lato_900Black,
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <View className="bg-white dark:bg-zinc-950 flex-1">
          <StatusBar backgroundColor="transparent" />
          <Slot />
        </View>
      </JotaiProvider>
    </QueryClientProvider>
  )
}
