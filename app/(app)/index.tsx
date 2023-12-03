import React, { useRef } from "react"
import { Animated } from "react-native"

import { AnimatedHeader } from "@/components/animated-header"
import CreateNoteButton from "@/components/create-note-button"
import NoteFormSheet from "@/components/note-form-sheet"
import NoteList from "@/components/note-list"
import NoteOptionsSheet from "@/components/note-options-sheet"
import SettingsSheet from "@/components/settings-sheet"

export default function IndexPage() {
  const offset = useRef(new Animated.Value(0)).current

  return (
    <>
      <AnimatedHeader offset={offset} />
      <NoteList offset={offset} />
      <CreateNoteButton />
      <NoteOptionsSheet />
      <NoteFormSheet />
      <SettingsSheet />
    </>
  )
}
