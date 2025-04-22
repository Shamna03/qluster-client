import ChatBot from "@/Components/chatBot/ChatBot"

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-[#1a0d1e] pt-20 pb-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-48">
        <h1 className="text-3xl font-bold text-[#611f69] mb-8">AI Chat Assistant</h1>

        <div className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            How can our Qluster AI assistant help you?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our Qluster AI  assistant can help you with a variety of tasks, including:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-4">
            <li>Answering questions about our platform</li>
            <li>Providing coding assistance and examples</li>
            <li>Helping you find projects to collaborate on</li>
            <li>Offering guidance on using our developer tools</li>
            <li>Connecting you with other developers</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300">
            Click the chat button in the bottom right corner to start a conversation!
          </p>
        </div>
      </div>
      <ChatBot />
    </div>
  )
}
