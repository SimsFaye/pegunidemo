"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface AuthResponse {
  authenticated: boolean
  message: string
}

export function Auth({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("https://college-demo.peguni.com/authme", {
          credentials: "include", // 包含cookies以便服务器识别用户
        })
        
        const data: AuthResponse = await response.json()
        
        if (!data.authenticated) {
          // 如果未认证，重定向到登录页面
          window.location.href = "https://college-demo.peguni.com/login"
          return
        }
      } catch (error) {
        // 出错时重定向到登录页面
        window.location.href = "https://college-demo.peguni.com/login"
        return
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (isLoading) {
    // 加载状态，可以自定义加载指示器
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    )
  }

  // 已认证，渲染子组件
  return <>{children}</>
} 