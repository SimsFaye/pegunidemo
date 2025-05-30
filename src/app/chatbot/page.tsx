"use client"

export default function ChatbotPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center p-8 max-w-lg rounded-lg bg-white dark:bg-gray-800 shadow-md">
          <h1 className="text-2xl font-bold mb-4">AI Chatbot</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            欢迎使用AI助手，该功能正在开发中...
          </p>
          <div className="flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 