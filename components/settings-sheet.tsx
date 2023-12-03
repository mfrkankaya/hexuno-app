import React from "react"
import { TouchableOpacity, View } from "react-native"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { signOut } from "firebase/auth"
import { useAtom } from "jotai"

import { auth } from "@/lib/firebase"
import { settingsSheetAtom } from "@/store/atoms"

import BottomSheet from "./ui/bottom-sheet"
import { Text } from "./ui/text"

export default function SettingsSheet() {
  const [isOpen, setIsOpen] = useAtom(settingsSheetAtom)

  return (
    <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <View className="p-6">
        <Text className="font-lato-black font-black text-2xl mb-6">
          Settings
        </Text>

        <View className="space-y-2">
          <TouchableOpacity
            onPress={async () => {
              try {
                const isSignedIn = await GoogleSignin.isSignedIn()
                if (isSignedIn) await GoogleSignin.revokeAccess()
              } catch (error) {
                console.log(error)
              }
              setIsOpen(false)
              signOut(auth)
            }}
            className="p-2 px-4 rounded-lg bg-zinc-50 dark:bg-zinc-800"
          >
            <Text className="font-bold font-lato-bold">Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  )
}
