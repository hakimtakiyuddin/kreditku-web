<template>
    <div class="app-layout">
      <ChatSidebar />
      <div class="main">
        <div class="chat-area" ref="chatArea">
          <ChatWelcome v-if="store.messages.length === 0" />
          <ChatMessages v-else />
        </div>
        <ChatInput @scroll-bottom="scrollToBottom" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, nextTick } from 'vue'
  import { useChatStore } from '@/stores/chat'
  import ChatSidebar from '@/components/ChatSideBar.vue'
  import ChatWelcome from '@/components/ChatWelcome.vue'
  import ChatMessages from '@/components/ChatMessages.vue'
  import ChatInput from '@/components/ChatInput.vue'
  
  const store = useChatStore()
  const chatArea = ref<HTMLElement | null>(null)
  
  const scrollToBottom = async (): Promise<void> => {
    await nextTick()
    if (chatArea.value) chatArea.value.scrollTop = chatArea.value.scrollHeight
  }
  
  watch(() => store.messages.length, scrollToBottom)
  </script>
  
  <style scoped>
  .app-layout {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }
  .chat-area {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
  }
  </style>