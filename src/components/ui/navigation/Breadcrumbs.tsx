"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Breadcrumbs() {
  const pathname = usePathname();
  
  // 根据当前路径确定面包屑内容
  const isSearch = pathname.includes('/quotes/overview');
  const isChatbot = pathname.includes('/chatbot');
  
  return (
    <>
      <nav aria-label="Breadcrumb" className="ml-2">
        <ol role="list" className="flex items-center space-x-3 text-sm">
          <li className="flex">
            <Link
              href="/"
              className="text-gray-500 transition hover:text-gray-700 dark:text-gray-400 hover:dark:text-gray-300"
            >
              Peguni
            </Link>
          </li>
          <ChevronRight
            className="size-4 shrink-0 text-gray-600 dark:text-gray-400"
            aria-hidden="true"
          />
          <li className="flex">
            <div className="flex items-center">
              <Link
                href={isSearch ? "/quotes/overview" : "/chatbot"}
                aria-current="page"
                className="text-gray-900 dark:text-gray-50"
              >
                {isSearch ? "Search" : "AI Chatbot"}
              </Link>
            </div>
          </li>
        </ol>
      </nav>
    </>
  )
}
