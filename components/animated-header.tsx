import React from "react"
import { Animated, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export function AnimatedHeader({ offset }: { offset: Animated.Value }) {
  const insets = useSafeAreaInsets()
  const titleFontSize = offset.interpolate({
    inputRange: [0, 50],
    outputRange: [24, 0],
    extrapolate: "clamp",
  })

  const titleOpacity = offset.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: "clamp",
  })

  return (
    <Animated.View
      className="bg-white dark:bg-zinc-950 px-6"
      style={{ paddingTop: insets.top }}
    >
      <Animated.Text
        className="font-lato-black text-zinc-950 dark:text-white font-black"
        style={{
          fontSize: titleFontSize,
          lineHeight: titleFontSize,
          opacity: titleOpacity,
        }}
      >
        My notes
      </Animated.Text>
      <View className="bg-zinc-50 dark:bg-zinc-900  rounded-xl h-10 w-full my-3"></View>
    </Animated.View>
  )
}
