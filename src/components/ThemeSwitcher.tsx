"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Monitor, Moon, Sun } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu"

interface ThemeSwitcherProps {
  children?: React.ReactNode
  align?: "center" | "start" | "end"
}

export function ThemeSwitcher({ 
  children, 
  align = "center" 
}: ThemeSwitcherProps) {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  // 当组件挂载后再显示，避免水合不匹配
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children || (
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            aria-label="切换主题"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) => {
            setTheme(value)
          }}
        >
          <DropdownMenuRadioItem
            aria-label="切换到浅色模式"
            value="light"
            iconType="check"
          >
            <Sun className="size-4 shrink-0 mr-2" aria-hidden="true" />
            浅色
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            aria-label="切换到深色模式"
            value="dark"
            iconType="check"
          >
            <Moon className="size-4 shrink-0 mr-2" aria-hidden="true" />
            深色
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            aria-label="跟随系统设置"
            value="system"
            iconType="check"
          >
            <Monitor className="size-4 shrink-0 mr-2" aria-hidden="true" />
            系统
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 