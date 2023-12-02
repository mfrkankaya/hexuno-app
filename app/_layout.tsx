import React from "react"
import {
  Lato_400Regular,
  Lato_700Bold,
  Lato_900Black,
} from "@expo-google-fonts/lato"
import { useFonts } from "expo-font"
import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { View } from "react-native"

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "lato-regular": Lato_400Regular,
    "lato-bold": Lato_700Bold,
    "lato-black": Lato_900Black,
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View className="bg-white dark:bg-zinc-950 flex-1">
      <StatusBar backgroundColor="transparent" />
      <Slot />
    </View>
  )
}
