import React, { useRef } from "react"
import { Animated, FlatList, View } from "react-native"

import { Text } from "@/components/ui/text"
import { AnimatedHeader } from "@/components/animated-header"

const ARRAY = Array.from({ length: 100 }, (_, i) => i)

export default function IndexPage() {
  const offset = useRef(new Animated.Value(0)).current

  return (
    <>
      <AnimatedHeader offset={offset} />

      <View className="flex-1">
        <FlatList
          data={ARRAY}
          keyExtractor={(item) => item.toString()}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: offset } } }],
            { useNativeDriver: false }
          )}
          renderItem={({ item }) => (
            <View className="px-6 py-4">
              <Text>{item}</Text>
            </View>
          )}
        />
      </View>
    </>
  )
}
