import React from "react"
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { Text } from "./text"

const buttonStyle = cva("w-full justify-center items-center relative", {
  variants: {
    variant: {
      primary: "bg-zinc-950 dark:bg-white",
      secondary: "bg-zinc-50 dark:bg-zinc-800",
      ghost: "",
      destructive: "bg-red-500",
    },
    size: {
      sm: "h-6 rounded-md",
      md: "h-10 rounded-md",
      lg: "h-14 rounded-xl",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
})

const buttonTextStyle = cva("text-center font-bold font-lato-bold", {
  variants: {
    variant: {
      primary: "text-white dark:text-zinc-950",
      secondary: "text-zinc-950 dark:text-white",
      ghost: "text-zinc-950 dark:text-white font-normal font-lato-regular",
      destructive: "text-white",
    },
    size: {
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
})

interface Props
  extends Omit<TouchableOpacityProps, "children">,
    VariantProps<typeof buttonStyle> {
  text: string
  _text?: string
}

export function Button({
  className,
  text,
  activeOpacity = 0.5,
  variant,
  size,
  disabled,
  _text,
  ...props
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={disabled}
      {...props}
      className={cn(
        buttonStyle({ variant, size }),
        { "opacity-50": disabled },
        className
      )}
    >
      <Text className={cn(buttonTextStyle({ variant, size }), _text)}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}
