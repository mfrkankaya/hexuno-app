import React, { useMemo } from "react"
import { Animated, FlatList, TouchableOpacity, View } from "react-native"
import { filterAndSortNotes } from "@/utils/notes"
import * as Clipboard from "expo-clipboard"
import { useAtom, useAtomValue } from "jotai"

import { INote } from "@/definitions/note"
import useDebounce from "@/hooks/use-debounce"
import { activeOptionsNoteIdAtom, searchTextAtom } from "@/store/atoms"
import { useNotes } from "@/store/notes"

import Skeleton from "./ui/skeleton"
import { Text } from "./ui/text"

export default function NoteList({ offset }: { offset: Animated.Value }) {
  const notes = useNotes()
  const searchText = useAtomValue(searchTextAtom)
  const debouncedSearchText = useDebounce(searchText)
  const data = useMemo(
    () => filterAndSortNotes(notes.data, debouncedSearchText),
    [notes.data, debouncedSearchText]
  )

  if (notes.isLoading)
    return (
      <FlatList
        className="px-6"
        contentContainerStyle={{ paddingBottom: 64 }}
        data={Array.from({ length: 100 })}
        keyExtractor={(_, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false }
        )}
        renderItem={() => (
          <Skeleton className="p-5">
            <Skeleton className="mb-1 h-7 w-24 rounded-lg" />
            <Skeleton className="h-6 rounded-lg" />
          </Skeleton>
        )}
        ItemSeparatorComponent={() => <View className="h-2" />}
      />
    )

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 64 }}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: offset } } }],
        { useNativeDriver: false }
      )}
      renderItem={({ item }) => <NoteListItem {...item} />}
      ItemSeparatorComponent={() => <View className="h-2" />}
    />
  )
}

function NoteListItem({ id, title, content }: INote) {
  const [, setActiveNoteId] = useAtom(activeOptionsNoteIdAtom)

  return (
    <>
      <TouchableOpacity
        className="px-6"
        onLongPress={() => setActiveNoteId(id)}
        onPress={() => Clipboard.setStringAsync(content)}
      >
        <View className="bg-zinc-50 dark:bg-zinc-900 p-5 rounded-xl">
          <Text className="text-xl font-bold mb-1">{title}</Text>
          <Text>{content}</Text>
        </View>
      </TouchableOpacity>
    </>
  )
}
