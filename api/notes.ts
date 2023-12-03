import { addDoc, collection } from "firebase/firestore"

import { INoteData } from "@/definitions/note"
import { auth, firestore } from "@/lib/firebase"

export async function createNote(note: INoteData) {
  const user = auth.currentUser
  if (!user) throw new Error("No user logged in.")

  const payload = {
    ...note,
    userId: user.uid,
    updatedAt: new Date().getTime(),
  }

  const result = await addDoc(collection(firestore, "notes"), payload)
  return { ...payload, id: result.id }
}
