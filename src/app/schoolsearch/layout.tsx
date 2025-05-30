"use client"
import { MetricsCards } from "@/components/ui/homepage/MetricsCards"
import React from "react"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="bg-white dark:bg-gray-925">
        <div className="p-4 sm:p-6">
          <MetricsCards />
        </div>
        <>{children}</>
      </div>
    </>
  )
}
