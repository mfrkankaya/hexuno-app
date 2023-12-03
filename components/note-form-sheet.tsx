import React, { useRef } from "react"
import { TextInput, TouchableOpacity, View } from "react-native"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { Controller, useForm } from "react-hook-form"

import { INote, INoteData, NoteDataSchema } from "@/definitions/note"
import { cn } from "@/lib/utils"
import { noteFormSheetAtom } from "@/store/atoms"
import { createNote } from "@/api/notes"

import BottomSheet from "./ui/bottom-sheet"
import { Button } from "./ui/button"
import Input from "./ui/input"
import { Text } from "./ui/text"

export default function NoteFormSheet() {
  const queryClient = useQueryClient()
  const contentInputRef = useRef<TextInput>(null)
  const [isOpen, setIsOpen] = useAtom(noteFormSheetAtom)
  const { control, reset, handleSubmit } = useForm<INoteData>({
    values: { title: "", content: "" },
    resolver: zodResolver(NoteDataSchema),
  })

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: async (data) => {
      setIsOpen(false)
      reset({ title: "", content: "" })
      await queryClient.cancelQueries({ queryKey: ["notes"] })
      queryClient.setQueryData(["notes"], (oldData: INote[]) => {
        return [...oldData, data]
      })
    },
  })

  function onSubmit() {
    handleSubmit((data) => {
      createNoteMutation.mutate(data)
    })()
  }

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

        <Button
          disabled={createNoteMutation.isPending}
          text="Save"
          onPress={onSubmit}
          className="mt-3"
          size="lg"
        />
      </View>
    </BottomSheet>
  )
}
