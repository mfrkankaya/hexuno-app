import React from 'react'
import { View } from 'react-native'

export default function Background({
  children
}: {
  children: React.ReactNode
}) {
  return <View style={{ flex: 1, backgroundColor: '#09090b' }}>{children}</View>
}
