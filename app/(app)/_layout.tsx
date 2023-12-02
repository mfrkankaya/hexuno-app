import React, { useEffect, useState } from "react"
import { router, Slot } from "expo-router"
import { onAuthStateChanged } from "firebase/auth"

import { auth } from "@/lib/firebase"

export default function AppLayout() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false)
      if (!user) {
        router.replace("/auth")
      }
    })

    return () => unsubscribe()
  })

  if (loading) return null

  return (
    <>
      <Slot />
    </>
  )
}
