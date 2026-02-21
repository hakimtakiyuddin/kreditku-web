<template>
    <div class="messages">
      <div
        v-for="(msg, i) in store.messages"
        :key="i"
        class="message"
        :class="msg.role"
      >
        <div class="avatar" :class="msg.role">
          <svg v-if="msg.role === 'ai'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <rect x="1" y="4" width="22" height="16" rx="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
          <span v-else style="font-size: 10px;">You</span>
        </div>
  
        <div class="bubble" :class="msg.role">
          <div v-if="msg.typing" class="typing">
            <span></span><span></span><span></span>
          </div>
          <span v-else>{{ msg.text }}</span>
  
          <div v-if="msg.file" class="file-attach">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3dba7e" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <span class="file-name">{{ msg.file.name }}</span>
            <span class="file-size">{{ formatSize(msg.file.size) }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useChatStore } from '@/stores/chat'
  
  const store = useChatStore()
  
  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }
  </script>
  
  <style scoped>
  .messages { width: 100%; max-width: 680px; display: flex; flex-direction: column; gap: 24px; }
  .message { display: flex; gap: 14px; animation: fadeUp 0.3s ease forwards; }
  .message.user { flex-direction: row-reverse; }
  .avatar {
    width: 32px; height: 32px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .avatar.ai { background: #1a2e25; color: #3dba7e; }
  .avatar.user { background: #1e1e1e; color: #888; }
  .bubble { max-width: 80%; padding: 12px 16px; border-radius: 12px; font-size: 14px; line-height: 1.6; }
  .bubble.ai { background: #161616; border: 1px solid #222; color: #d4d4d4; }
  .bubble.user { background: #1a2e25; border: 1px solid #224433; color: #e8e8e8; }
  .file-attach {
    display: flex; align-items: center; gap: 10px;
    background: #0d0d0d; border: 1px solid #2a2a2a;
    border-radius: 8px; padding: 10px 12px; margin-top: 8px;
  }
  .file-name { font-size: 12px; color: #888; }
  .file-size { font-size: 11px; color: #444; margin-left: auto; }
  .typing { display: flex; gap: 4px; align-items: center; padding: 4px 0; }
  .typing span { width: 6px; height: 6px; background: #3dba7e; border-radius: 50%; animation: bounce 1.2s infinite; }
  .typing span:nth-child(2) { animation-delay: 0.2s; }
  .typing span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes bounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-5px); opacity: 1; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  </style>