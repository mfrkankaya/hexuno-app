import React, { useRef } from "react"
import { Animated, FlatList, View } from "react-native"
import { signOut } from "firebase/auth"
import { useAtom } from "jotai"

import { auth } from "@/lib/firebase"
import { noteFormSheetAtom } from "@/store/atoms"
import { Text } from "@/components/ui/text"
import { AnimatedHeader } from "@/components/animated-header"
import CreateNoteButton from "@/components/create-note-button"
import NoteFormSheet from "@/components/note-form-sheet"
import NoteList from "@/components/note-list"

const ARRAY = Array.from({ length: 100 }, (_, i) => i)

export default function IndexPage() {
  const offset = useRef(new Animated.Value(0)).current
  const [, setNoteFormSheet] = useAtom(noteFormSheetAtom)

  return (
    <>
      <AnimatedHeader offset={offset} />
      <NoteList offset={offset} />
      <CreateNoteButton />

      <NoteFormSheet />
    </>
  )
}
