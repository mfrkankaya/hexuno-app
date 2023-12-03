import React from "react"
import { FlatList, View } from "react-native"

import { Text } from "@/components/ui/text"

const ARRAY = Array.from({ length: 1000 }, (_, i) => i)

export default function IndexPage() {
  return (
    <>
      <View style={{ flex: 1 }}>
        <FlatList
          data={ARRAY}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
              }}
            >
              <Text>{item}</Text>
            </View>
          )}
        />
      </View>
    </>
  )
}
