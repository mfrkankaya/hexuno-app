import React from "react"
import { Animated, TouchableOpacity, View } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useAtom } from "jotai"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { settingsSheetAtom } from "@/store/atoms"

import SearchBar from "./search-bar"
import { Text } from "./ui/text"

export function AnimatedHeader({ offset }: { offset: Animated.Value }) {
  const insets = useSafeAreaInsets()
  const [, setIsSettingsOpen] = useAtom(settingsSheetAtom)

  return (
    <Animated.View
      className="bg-white dark:bg-zinc-950 px-6"
      style={{ paddingTop: insets.top }}
    >
      <Animated.View
        className="overflow-y-hidden flex flex-row items-center justify-between"
        style={{
          opacity: offset.interpolate({
            inputRange: [0, 25],
            outputRange: [1, 0],
            extrapolate: "clamp",
          }),
          height: offset.interpolate({
            inputRange: [0, 50],
            outputRange: [48, 0],
            extrapolate: "clamp",
          }),
          paddingTop: offset.interpolate({
            inputRange: [0, 50],
            outputRange: [16, 0],
            extrapolate: "clamp",
          }),
        }}
      >
        <Text className="font-lato-black text-zinc-950 dark:text-white font-black text-2xl leading-none">
          My notes
        </Text>

        <TouchableOpacity
          onPress={() => setIsSettingsOpen(true)}
          className="w-8 h-8 items-end justify-center"
        >
          <View className="dark:hidden">
            <Ionicons name="ios-settings" size={24} color="#09090b" />
          </View>
          <View className="hidden dark:flex">
            <Ionicons name="ios-settings" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </Animated.View>

      <SearchBar />
    </Animated.View>
  )
}
