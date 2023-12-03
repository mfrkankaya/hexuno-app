import React, { useState } from "react"

export default function useDisclose(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue)

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  const onToggle = () => setIsOpen((v) => !v)

  return { isOpen, onOpen, onClose, onToggle }
}
