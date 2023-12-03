import * as z from "zod"

export const NoteDataSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character."),
  content: z.string().min(1, "Content must be at least 1 character."),
})

export type INoteData = z.infer<typeof NoteDataSchema>
