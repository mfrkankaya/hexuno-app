import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore"

import { INote, INoteData } from "@/definitions/note"
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
  return { ...payload, id: result.id } as INote
}

export async function getNotes() {
  const user = auth.currentUser
  if (!user) throw new Error("No user logged in.")

  const snaps = await getDocs(
    query(collection(firestore, "notes"), where("userId", "==", user.uid))
  )

  return snaps.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as INote[]
}

export async function getNoteById(id: string) {
  const snap = await getDoc(doc(firestore, "notes", id))
  return { ...snap.data(), id: snap.id } as INote
}

export async function updateNoteById(id: string, note: INoteData) {
  const user = auth.currentUser
  if (!user) throw new Error("No user logged in.")

  const payload = {
    ...note,
    userId: user.uid,
    updatedAt: new Date().getTime(),
  }

  await updateDoc(doc(firestore, "notes", id), payload)

  return { ...payload, id } as INote
}

export async function deleteNoteById(id: string) {
  await deleteDoc(doc(firestore, "notes", id))
}
