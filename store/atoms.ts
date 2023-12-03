import { atom } from "jotai"

export const searchTextAtom = atom<string>("")

// This is a boolean or a string because the string is the id of the note
export const noteFormSheetAtom = atom<boolean | string>(false)
