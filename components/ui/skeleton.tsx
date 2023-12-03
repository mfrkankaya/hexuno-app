import React, { useEffect, useRef } from "react"
import { Animated, ViewProps } from "react-native"

import { cn } from "@/lib/utils"

export default function Skeleton({
  className,
  style = {},
  ...props
}: ViewProps) {
  const animValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start()
  }, [])

  return (
    <Animated.View
      {...props}
      className={cn(
        "bg-zinc-950/10 dark:bg-white/10 rounded-xl w-full",
        className
      )}
      style={[
        style,
        {
          opacity: animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
            extrapolate: "clamp",
          }),
        },
      ]}
    />
  )
}
