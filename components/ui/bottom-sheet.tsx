import React, { useCallback, useEffect, useRef, useState } from "react"
import { Animated, BackHandler, Easing, Pressable, View } from "react-native"

interface Props {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
}

export default function BottomSheet({ isOpen, onClose, children }: Props) {
  const animValue = useRef(new Animated.Value(0)).current
  const [sheetHeight, setSheetHeight] = useState(0)
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
      <Animated.View
        className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-30"
        style={{
          opacity: animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        }}
        pointerEvents={isOpen ? "auto" : "none"}
      >
        <Pressable className="w-full h-full" onPress={onClose} />
      </Animated.View>

      <Animated.View
        onLayout={(e) => setSheetHeight(e.nativeEvent.layout.height)}
        style={{
          transform: [
            {
              translateY: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [sheetHeight, 0],
              }),
            },
          ],
        }}
        className="absolute bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 rounded-t-2xl z-40"
      >
        {children}
      </Animated.View>
    </>
  )
}
