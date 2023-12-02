import React from 'react'
import { View } from 'react-native'

export default function Background({
  children
}: {
  children: React.ReactNode
}) {
  return <View className="bg-black flex-1">{children}</View>
}
