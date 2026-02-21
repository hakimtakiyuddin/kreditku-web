<template>
    <div class="sidebar">
      <div class="sidebar-header">
        <div class="hamburger">
          <span></span><span></span><span></span>
        </div>
        <button class="new-chat-btn" @click="store.resetChat()">New Chat</button>
      </div>
      <div class="history">
        <p class="history-label">Today</p>
        <div
          v-for="item in store.chatHistory"
          :key="item.id"
          class="history-item"
        >
          {{ item.preview }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useChatStore } from '@/stores/chat'
  const store = useChatStore()
  </script>
  
  <style scoped>
  .sidebar {
    width: 260px;
    background: #111;
    border-right: 1px solid #1f1f1f;
    display: flex;
    flex-direction: column;
    height: 100vh;
    flex-shrink: 0;
  }
  .sidebar-header {
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid #1f1f1f;
  }
  .hamburger {
    width: 32px; height: 32px;
    display: flex; flex-direction: column;
    justify-content: center; gap: 5px;
    cursor: pointer; padding: 4px; border-radius: 6px;
    transition: background 0.2s;
  }
  .hamburger:hover { background: #1e1e1e; }
  .hamburger span { display: block; height: 1.5px; background: #888; border-radius: 2px; }
  .new-chat-btn {
    flex: 1; background: transparent; border: none;
    color: #888; font-size: 14px; text-align: left;
    cursor: pointer; padding: 4px 8px; border-radius: 6px;
    font-family: 'Inter', sans-serif; transition: all 0.2s;
  }
  .new-chat-btn:hover { background: #1e1e1e; color: #e8e8e8; }
  .history { flex: 1; padding: 12px 8px; overflow-y: auto; }
  .history-label {
    font-size: 11px; color: #333; padding: 8px;
    text-transform: uppercase; letter-spacing: 0.08em; font-weight: 500;
  }
  .history-item {
    padding: 8px 12px; border-radius: 8px; cursor: pointer;
    font-size: 13px; color: #555; white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis; transition: all 0.15s;
  }
  .history-item:hover { background: #1a1a1a; color: #e8e8e8; }
  </style>