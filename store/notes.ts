import { useQuery } from "@tanstack/react-query"

import { auth } from "@/lib/firebase"
import { getNotes } from "@/api/notes"

export function useNotes() {
  return useQuery({
    queryKey: ["notes", auth.currentUser?.uid],
    queryFn: getNotes,
    enabled: !!auth.currentUser?.uid,
  })
}
