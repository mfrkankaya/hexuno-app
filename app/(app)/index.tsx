import React from 'react'
import { View } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import {
  GoogleAuthProvider,
  signInWithCredential,
  signOut
} from 'firebase/auth'
import { Text } from '@/components/ui/text'
import { auth } from '@/lib/firebase'

export default function IndexPage() {
  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
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

        <Text
          className="p-4"
          onPress={async () => {
            await signOut(auth)
          }}>
          Sign out
        </Text>
      </View>
    </>
  )
}
