import React, { useEffect, useRef } from "react"
import { TextInput, View } from "react-native"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { Controller, useForm } from "react-hook-form"

import { INote, INoteData, NoteDataSchema } from "@/definitions/note"
import { auth } from "@/lib/firebase"
import { noteFormSheetAtom } from "@/store/atoms"
import { useNotes } from "@/store/notes"
import { createNote, updateNoteById } from "@/api/notes"

import BottomSheet from "./ui/bottom-sheet"
import { Button } from "./ui/button"
import Input from "./ui/input"
import { Text } from "./ui/text"

export default function NoteFormSheet() {
  const { data: notes } = useNotes()
  const queryClient = useQueryClient()
  const contentInputRef = useRef<TextInput>(null)
  const [formNoteId, setFormNoteId] = useAtom(noteFormSheetAtom)
  const { control, reset, handleSubmit } = useForm<INoteData>({
    values: { title: "", content: "" },
    resolver: zodResolver(NoteDataSchema),
  })

  const isEditMode = typeof formNoteId === "string"

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: async (data) => {
      setFormNoteId(false)
      reset({ title: "", content: "" })
      await queryClient.cancelQueries({
        queryKey: ["notes", auth.currentUser?.uid],
      })
      queryClient.setQueryData(
        ["notes", auth.currentUser?.uid],
        (oldData: INote[]) => {
          return [...oldData, data]
        }
      )
    },
  })

  const updateNoteMutation = useMutation({
    mutationFn: async ({ id, ...data }: INoteData & { id: string }) =>
      updateNoteById(id, data),
    onSuccess: async (data) => {
      setFormNoteId(false)
      reset({ title: "", content: "" })
      await queryClient.cancelQueries({
        queryKey: ["notes", auth.currentUser?.uid],
      })
      queryClient.setQueryData(
        ["notes", auth.currentUser?.uid],
        (oldData: INote[]) => {
          return oldData.map((note) => {
            if (note.id === data.id) return data
            return note
          })
        }
      )
    },
  })

  function onSubmit() {
    handleSubmit((data) => {
      if (isEditMode) {
        updateNoteMutation.mutate({ id: formNoteId!, ...data })
      } else {
        createNoteMutation.mutate(data)
      }
    })()
  }

  useEffect(() => {
    if (typeof formNoteId === "string") {
      const note = notes?.find((note) => note.id === formNoteId)
      if (note) {
        reset({ title: note.title, content: note.content })
      }
    }

    if (!formNoteId) {
      reset({ title: "", content: "" })
    }
  }, [formNoteId])

  return (
    <BottomSheet isOpen={!!formNoteId} onClose={() => setFormNoteId(false)}>
      <View className="p-6">
        <Text className="font-lato-black font-black text-2xl mb-6">
          {isEditMode ? "Edit Note" : "New Note"}
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
          disabled={
            createNoteMutation.isPending || updateNoteMutation.isPending
          }
          text="Save"
          onPress={onSubmit}
          className="mt-3"
          size="lg"
        />
      </View>
    </BottomSheet>
  )
}
