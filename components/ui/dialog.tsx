import React, { useCallback, useEffect, useRef, useState } from "react"
import { Animated, BackHandler, Easing, Pressable, View } from "react-native"

interface Props {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
}

export default function Dialog({ isOpen, onClose, children }: Props) {
  const animValue = useRef(new Animated.Value(0)).current
  const [isOpenLocal, setIsOpenLocal] = useState(isOpen)

  const open = useCallback(() => {
    Animated.timing(animValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.out(Easing.exp),
    }).start()
  }, [])

  const close = useCallback(() => {
    Animated.timing(animValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.out(Easing.exp),
    }).start()
  }, [])

  useEffect(() => {
    if (isOpen) {
      setIsOpenLocal(true)
    } else {
      setTimeout(() => {
        setIsOpenLocal(false)
      }, 300)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      open()
    } else {
      close()
    }
  }, [isOpen])

  useEffect(() => {
    const listener = BackHandler.addEventListener("hardwareBackPress", () => {
      if (isOpen) {
        onClose()
        return true
      }
      return false
    })

    return () => listener.remove()
  }, [isOpenLocal])

  if (!isOpenLocal) return null

  return (
    <>
      <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center z-50">
        <Animated.View
          className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-50"
          style={{
            opacity: animValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          }}
        >
          <Pressable className="w-full h-full" onPress={onClose} />
        </Animated.View>

        <View className="px-6 absolute w-full">
          <Animated.View
            style={{
              opacity: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              transform: [
                {
                  translateY: animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            }}
            className="bg-white dark:bg-zinc-900 rounded-xl z-50 w-full"
          >
            {children}
          </Animated.View>
        </View>
      </View>
    </>
  )
}
