import React from 'react'
import { Text } from 'react-native'
import Background from '../../components/background'

export default function IndexPage() {
  return (
    <>
      <Background>
        <Text style={{ color: 'red' }}>Hello World!</Text>
      </Background>
    </>
  )
}
