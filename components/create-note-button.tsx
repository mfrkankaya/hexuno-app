import React from "react"
import { TouchableOpacity, View } from "react-native"
import FontAwesome5 from "@expo/vector-icons/FontAwesome"
import { useAtom } from "jotai"

import { noteFormSheetAtom } from "@/store/atoms"

export default function CreateNoteButton() {
  const [, setNoteFormSheet] = useAtom(noteFormSheetAtom)

  return (
    <TouchableOpacity
      onPress={() => setNoteFormSheet(true)}
      className="absolute z-20 right-6 bottom-12 w-16 h-16 justify-center items-center bg-zinc-950 dark:bg-white rounded-full"
    >
      <View className="dark:hidden">
        <FontAwesome5 name="plus" size={32} color="white" />
      </View>
      <View className="hidden dark:flex">
        <FontAwesome5 name="plus" size={32} color="black" />
      </View>
    </TouchableOpacity>
  )
}
