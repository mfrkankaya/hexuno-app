import React from 'react'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Lato_400Regular, Lato_900Black } from '@expo-google-fonts/lato'
import { View } from 'react-native'
import { useFonts } from 'expo-font'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'lato-regular': Lato_400Regular,
    'lato-black': Lato_900Black
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
