import React from "react"
import { TextInput, View } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useAtom } from "jotai"
import { TouchableOpacity } from "react-native-gesture-handler"

import { searchTextAtom } from "@/store/atoms"

export default function SearchBar() {
  const [searchText, setSearchText] = useAtom(searchTextAtom)

  return (
    <View className="relative my-3">
      <TextInput
        className="w-full h-10 rounded-xl bg-zinc-50 dark:bg-zinc-900 pr-3 pl-10 font-lato-regular text-base leading-none text-zinc-700 dark:text-zinc-200"
        placeholderTextColor="#888"
        placeholder="Search notes"
        autoCapitalize="words"
        returnKeyType="done"
        value={searchText}
        onChangeText={setSearchText}
      />

      <View className="absolute top-2.5 left-3" pointerEvents="none">
        <Ionicons name="ios-search" size={20} color="#888" />
      </View>

      {!!searchText && (
        <View className="h-10 w-10 absolute right-0 top-0">
          <TouchableOpacity
            onPress={() => setSearchText("")}
            className="w-full h-full rounded-xl justify-center items-center"
          >
            <Ionicons name="close-circle-outline" size={20} color="#888" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
