import React from "react"
import { TouchableOpacity, View } from "react-native"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAtom } from "jotai"

import { INote } from "@/definitions/note"
import useDisclose from "@/hooks/use-disclose"
import { activeOptionsNoteIdAtom, noteFormSheetAtom } from "@/store/atoms"
import { deleteNoteById } from "@/api/notes"

import BottomSheet from "./ui/bottom-sheet"
import { Button } from "./ui/button"
import Dialog from "./ui/dialog"
import { Text } from "./ui/text"

export default function NoteOptionsSheet() {
  const queryClient = useQueryClient()
  const [activeNoteId, setActiveNoteId] = useAtom(activeOptionsNoteIdAtom)
  const [, setFormNoteId] = useAtom(noteFormSheetAtom)
  const deleteDisclose = useDisclose()
  const deleteMutation = useMutation({
    mutationFn: deleteNoteById,
    onSuccess: async (_, id) => {
      deleteDisclose.onClose()
      setActiveNoteId(null)
      await queryClient.cancelQueries({ queryKey: ["notes"] })
      queryClient.setQueryData(["notes"], (oldData: INote[]) => {
        return oldData.filter((note) => note.id !== id)
      })
    },
  })

  return (
    <>
      <BottomSheet
        isOpen={!!activeNoteId}
        onClose={() => setActiveNoteId(null)}
      >
        <View className="p-6">
          <Text className="font-lato-black font-black text-2xl mb-6">
            Note options
          </Text>

          <View className="space-y-2">
            <TouchableOpacity
              onPress={() => {
                setActiveNoteId(null)
                setFormNoteId(activeNoteId!)
              }}
              className="p-2 px-4 rounded-lg bg-zinc-50 dark:bg-zinc-800"
            >
              <Text className="font-lato-bold font-bold text-lg">Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={deleteDisclose.onOpen}
              className="p-2 px-4 rounded-lg bg-zinc-50 dark:bg-zinc-800"
            >
              <Text className="font-lato-bold font-bold text-lg text-red-500">
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>

      <Dialog {...deleteDisclose}>
        <View className="p-6">
          <Text className="font-lato-black font-black text-2xl mb-4">
            Deleting note
          </Text>
          <Text>
            Are you sure you want to delete this note? This action cannot be
            undone.
          </Text>

          <View className="space-x-2 flex-row items-center mt-6">
            <Button
              text="Cancel"
              className="flex-1"
              variant="secondary"
              onPress={deleteDisclose.onClose}
              disabled={deleteMutation.isPending}
            />
            <Button
              text="Delete"
              className="flex-1"
              variant="destructive"
              disabled={deleteMutation.isPending}
              onPress={() => deleteMutation.mutate(activeNoteId!)}
            />
          </View>
        </View>
      </Dialog>
    </>
  )
}
