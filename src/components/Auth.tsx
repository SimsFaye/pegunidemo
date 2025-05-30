"use client"

import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  given_name: string
  family_name: string
  nickname: string
  name: string
  picture: string
  updated_at: string
  email: string
  email_verified: boolean
  iss: string
  aud: string
  sub: string
  iat: number
  exp: number
  sid: string
  nonce: string
}

interface AuthResponse {
  authenticated: boolean
  message?: string
  user?: User
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true
})

export const useAuth = () => useContext(AuthContext)

export function Auth({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
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
        
        if (data.user) {
          setUser(data.user)
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
  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
} 