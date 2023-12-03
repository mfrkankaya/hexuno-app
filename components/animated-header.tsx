import React from "react"
import { Animated } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import SearchBar from "./search-bar"

export function AnimatedHeader({ offset }: { offset: Animated.Value }) {
  const insets = useSafeAreaInsets()
  const titleFontSize = offset.interpolate({
    inputRange: [0, 50],
    outputRange: [24, 0],
    extrapolate: "clamp",
  })

  const titleOpacity = offset.interpolate({
    inputRange: [0, 25],
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
          paddingTop: titleFontSize,
        }}
      >
        My notes
      </Animated.Text>
      <SearchBar />
    </Animated.View>
  )
}
