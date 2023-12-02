import { Text as DefaultText, TextProps } from "react-native"

import { cn } from "@/lib/utils"

export function Text({ className, ...props }: TextProps) {
  return (
    <DefaultText
      {...props}
      className={cn(
        "font-lato-regular text-zinc-950 dark:text-white",
        className
      )}
    />
  )
}
