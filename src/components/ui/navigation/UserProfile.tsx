"use client"

import { Button } from "@/components/Button"
import { useAuth } from "@/components/Auth"
import { cx, focusRing } from "@/lib/utils"
import { ChevronsUpDown } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { DropdownUserProfile } from "./DropdownUserProfile"

export function UserProfile() {
  const { user } = useAuth()
  const [imageError, setImageError] = useState(false)
  
  // 获取用户名首字母作为头像备用显示
  const initials = user?.name 
    ? `${user.name.split(' ')[0][0]}${user.name.split(' ')[1]?.[0] || ''}`
    : 'U'
    
  return (
    <DropdownUserProfile>
      <Button
        aria-label="User settings"
        variant="ghost"
        className={cx(
          "group flex w-full items-center justify-between rounded-md px-1 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200/50 data-[state=open]:bg-gray-200/50 hover:dark:bg-gray-800/50 data-[state=open]:dark:bg-gray-900",
          focusRing,
        )}
      >
        <span className="flex items-center gap-3">
          {user?.picture && !imageError ? (
            <>
              {/* 尝试使用Next.js的Image组件 */}
              <Image 
                src={user.picture}
                alt={user.name || "用户头像"}
                width={32}
                height={32}
                className="size-8 shrink-0 rounded-full"
                onError={() => setImageError(true)}
              />
            </>
          ) : user?.picture ? (
            // 如果Next.js的Image组件失败，使用普通img标签
            <img 
              src={user.picture}
              alt={user.name || "用户头像"}
              className="size-8 shrink-0 rounded-full"
            />
          ) : (
            <span
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
              aria-hidden="true"
            >
              {initials}
            </span>
          )}
          <span>{user?.name || "未登录"}</span>
        </span>
        <ChevronsUpDown
          className="size-4 shrink-0 text-gray-500 group-hover:text-gray-700 group-hover:dark:text-gray-400"
          aria-hidden="true"
        />
      </Button>
    </DropdownUserProfile>
  )
}
