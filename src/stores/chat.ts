import { defineStore } from 'pinia'
import type { Message, ChatHistory, RecommendationResponse } from '@/types'

interface ChatState {
  messages: Message[]
  chatHistory: ChatHistory[]
  isTyping: boolean
  attachedFile: File | null
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export const useChatStore = defineStore('chat', {
  state: (): ChatState => ({
    messages: [],
    chatHistory: [
      { id: '1', preview: 'Best card for dining out', timestamp: new Date() },
      { id: '2', preview: 'Compare Maybank vs CIMB', timestamp: new Date() },
    ],
    isTyping: false,
    attachedFile: null,
  }),

  actions: {
    async sendMessage(text: string, file: File | null): Promise<void> {
      if (!text.trim() && !file) return

      this.messages.push({
        role: 'user',
        text: text || 'Here is my expense file.',
        file,
        typing: false,
      })

      this.messages.push({ role: 'ai', text: '', file: null, typing: true })
      this.isTyping = true

      try {
        let response

        if (file) {
          // File upload → /api/recommend
          const formData = new FormData()
          formData.append('file', file)

          const res = await fetch(`${API_URL}/api/recommend`, {
            method: 'POST',
            body: formData,
          })
          response = await res.json()
        } else {
          // Text message → /api/chat
          const res = await fetch(`${API_URL}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text }),
          })
          response = await res.json()
        }

        const last = this.messages[this.messages.length - 1]
        if (!last) return
        last.typing = false

        if (response.success) {
          last.text = response.recommendation
        } else {
          last.text = response.error || 'Something went wrong.'
        }
      } catch (err) {
        const last = this.messages[this.messages.length - 1]
        if (!last) return
        last.typing = false
        last.text = 'Could not connect to backend. Make sure it is running at localhost:8080.'
      } finally {
        this.isTyping = false
      }
    },

    resetChat(): void {
      if (this.messages.length > 0) {
        this.chatHistory.unshift({
          id: Date.now().toString(),
          preview: (this.messages[0]?.text || 'New chat').slice(0, 32) + '...',
          timestamp: new Date(),
        })
      }
      this.messages = []
      this.attachedFile = null
    },

    setAttachedFile(file: File): void {
      this.attachedFile = file
    },

    clearAttachedFile(): void {
      this.attachedFile = null
    },
  },
})
