import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react"
import { Animated, TextInput, TextInputProps, View } from "react-native"

import { cn } from "@/lib/utils"

interface Props extends TextInputProps {
  _box?: string
}

const Input = forwardRef<TextInput, Props>(
  ({ className, placeholder, onFocus, onBlur, value, _box, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const animValue = useRef(new Animated.Value(0)).current
    const isActive = useMemo(() => isFocused || !!value, [isFocused, value])

    useEffect(() => {
      Animated.timing(animValue, {
        toValue: isActive ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start()
    }, [isActive])

    const handleFocus: typeof onFocus = (e) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur: typeof onBlur = (e) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    return (
      <View className={cn("relative w-full", _box)}>
        <TextInput
          ref={ref}
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          className={cn(
            "bg-zinc-100 dark:bg-white/20 rounded-xl h-14 px-4 pt-[28px] pb-[10px] text-base leading-none text-zinc-700 dark:text-zinc-200 font-lato-regular w-full",
            className
          )}
        />
        <Animated.Text
          className="absolute font-lato-regular text-base text-zinc-500 dark:text-zinc-400 left-4"
          style={{
            top: animValue.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 11],
            }),
            fontSize: animValue.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 12],
            }),
            lineHeight: animValue.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 12],
            }),
          }}
        >
          {placeholder}
        </Animated.Text>
      </View>
    )
  }
)

Input.displayName = "Input"

export default Input
