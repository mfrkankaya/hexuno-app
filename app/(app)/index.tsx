import React from "react"
import { signOut } from "firebase/auth"
import { View } from "react-native"

import { auth } from "@/lib/firebase"
import { Text } from "@/components/ui/text"

export default function IndexPage() {
  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          className="p-4"
          onPress={async () => {
            await signOut(auth)
          }}
        >
          Sign out
        </Text>
      </View>
    </>
  )
}
