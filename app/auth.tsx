import React, { useEffect } from "react"
import { TouchableOpacity, View } from "react-native"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { useMutation } from "@tanstack/react-query"
import { router } from "expo-router"
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithCredential,
} from "firebase/auth"

import { auth } from "@/lib/firebase"
import { cn } from "@/lib/utils"
import { Text } from "@/components/ui/text"
import Logo from "@/svg/Logo.svg"

export default function AuthPage() {
  const googleSignInMutation = useMutation({
    mutationFn: async () => {
      GoogleSignin.configure({
        webClientId:
          "863791832999-6950mla0i12ocop4fu2l9d8o1udks5hb.apps.googleusercontent.com",
      })

      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      await signInWithCredential(
        auth,
        GoogleAuthProvider.credential(userInfo.idToken)
      )
    },
  })

  const anonymousSignInMutation = useMutation({
    mutationFn: async () => {
      await signInAnonymously(auth)
    },
  })

  const isPending =
    googleSignInMutation.isPending || anonymousSignInMutation.isPending

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/")
      }
    })

    return () => unsubscribe()
  })

  return (
    <View className="flex-1 justify-center items-center">
      <View className="px-6 w-full">
        <View className="hidden dark:flex mx-auto mb-4">
          <Logo width={128} height={128} className="text-white" />
        </View>
        <View className="dark:hidden mx-auto mb-4">
          <Logo width={128} height={128} className="text-zinc-950" />
        </View>
        <Text className="text-center font-lato-black text-4xl leading-none">
          HEXUNO
        </Text>
        <Text className="text-center mt-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
          dolorem officiis quia nam sapiente sunt eveniet.
        </Text>

        <TouchableOpacity
          onPress={() => googleSignInMutation.mutate()}
          disabled={isPending}
          className={cn(
            "w-full items-center justify-center mt-8 h-16 rounded-2xl bg-zinc-950 dark:bg-white",
            {
              "opacity-50": isPending,
            }
          )}
        >
          <Text className="text-white font-bold dark:text-zinc-950">
            Sign in with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => anonymousSignInMutation.mutate()}
          disabled={isPending}
          className={cn("mt-2 w-fit mx-auto p-2", {
            "opacity-50": isPending,
          })}
        >
          <Text>Continue anonymously</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
