import React, { useRef } from "react"
import { Animated, FlatList, View } from "react-native"
import { useAtom } from "jotai"

import { noteFormSheetAtom } from "@/store/atoms"
import { Text } from "@/components/ui/text"
import { AnimatedHeader } from "@/components/animated-header"
import NoteFormSheet from "@/components/note-form-sheet"

const ARRAY = Array.from({ length: 100 }, (_, i) => i)

export default function IndexPage() {
  const offset = useRef(new Animated.Value(0)).current
  const [, setNoteFormSheet] = useAtom(noteFormSheetAtom)

  return (
    <>
      <AnimatedHeader offset={offset} />

      <View className="flex-1">
        <Text className="p-8" onPress={() => setNoteFormSheet(true)}>
          Create
        </Text>
        <FlatList
          data={ARRAY}
          keyExtractor={(item) => item.toString()}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: offset } } }],
            { useNativeDriver: false }
          )}
          renderItem={() => <View className="px-6 py-4"></View>}
        />
      </View>

      <NoteFormSheet />
    </>
  )
}
