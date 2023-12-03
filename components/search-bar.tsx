import React from "react"
import { TextInput } from "react-native"
import { useAtom } from "jotai"

import { searchTextAtom } from "@/store/atoms"

export default function SearchBar() {
  const [searchText, setSearchText] = useAtom(searchTextAtom)

  return (
    <TextInput
      className="w-full my-3 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-900 px-3 font-lato-regular text-base leading-none text-zinc-700 dark:text-zinc-200"
      placeholderTextColor="#888"
      placeholder="Search notes"
      autoCapitalize="words"
      returnKeyType="done"
      value={searchText}
      onChangeText={setSearchText}
    />
  )
}
