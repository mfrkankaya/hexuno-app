import { INote } from "@/definitions/note"

export function filterAndSortNotes(
  notes: INote[] | undefined,
  searchText: string
) {
  if (!notes) return []
  if (!searchText) return notes.sort((a, b) => b.updatedAt - a.updatedAt)
  const search = searchText.toLocaleLowerCase()

  return notes
    .filter(
      (note) =>
        note.title.toLocaleLowerCase().includes(search) ||
        note.content.toLocaleLowerCase().includes(search)
    )
    .sort((a, b) => b.updatedAt - a.updatedAt)
}
