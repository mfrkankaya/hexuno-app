import React from 'react'
import { Text, View } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { Deneme } from '@/components/deneme'

export default function IndexPage() {
  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          className="text-white text-2xl"
          style={{ fontFamily: 'Lato_900Black' }}
          onPress={async () => {
            GoogleSignin.configure({
              webClientId:
                '863791832999-6950mla0i12ocop4fu2l9d8o1udks5hb.apps.googleusercontent.com'
            })

            try {
              await GoogleSignin.hasPlayServices()
              const userInfo = await GoogleSignin.signIn()
              const res = await signInWithCredential(
                auth,
                GoogleAuthProvider.credential(userInfo.idToken)
              )

              console.log(res.user)
            } catch (error) {
              console.log(error)
            }
          }}>
          Hello World!
        </Text>
        <Deneme />
      </View>
    </>
  )
}
