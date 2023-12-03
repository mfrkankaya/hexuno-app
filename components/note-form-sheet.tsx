import React, { useRef } from "react"
import { TextInput, View } from "react-native"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAtom } from "jotai"
import { Controller, useForm } from "react-hook-form"

import { INoteData, NoteDataSchema } from "@/definitions/note"
import { noteFormSheetAtom } from "@/store/atoms"

import BottomSheet from "./ui/bottom-sheet"
import Input from "./ui/input"
import { Text } from "./ui/text"

export default function NoteFormSheet() {
  const contentInputRef = useRef<TextInput>(null)
  const [isOpen, setIsOpen] = useAtom(noteFormSheetAtom)
  const { control } = useForm<INoteData>({
    values: { title: "", content: "" },
    resolver: zodResolver(NoteDataSchema),
  })

  return (
    <BottomSheet isOpen={!!isOpen} onClose={() => setIsOpen(false)}>
      <View className="p-6">
        <Text className="font-lato-black font-black text-2xl mb-6">
          Create note
        </Text>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Title"
              autoFocus
              autoCapitalize="words"
              onSubmitEditing={() => contentInputRef.current?.focus()}
              returnKeyType="next"
            />
          )}
        />

        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              ref={contentInputRef}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Note"
              autoCapitalize="sentences"
              _box="mt-3"
              returnKeyType="done"
            />
          )}
        />
      </View>
    </BottomSheet>
  )
}
