<template>
    <div class="input-area">
      <div v-if="store.attachedFile" class="file-preview-bar">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3dba7e" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        <span class="file-name">{{ store.attachedFile.name }}</span>
        <span class="file-size">{{ formatSize(store.attachedFile.size) }}</span>
        <button class="clear-btn" @click="store.clearAttachedFile()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
  
      <div class="input-wrap" :class="{ 'has-file': store.attachedFile }">
        <input type="file" ref="fileInput" accept=".xlsx,.xls,.csv" @change="handleFile" />
  
        <button class="attach-btn" @click="(fileInput as HTMLInputElement).click()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
          </svg>
        </button>
  
        <textarea
          ref="textarea"
          v-model="inputText"
          :placeholder="store.messages.length === 0
            ? 'Upload your spending data or ask about credit cards...'
            : 'Ask a follow-up...'"
          rows="1"
          @keydown.enter.exact.prevent="send"
          @input="autoResize"
        />
  
        <button
          class="send-btn"
          @click="send"
          :disabled="!inputText.trim() && !store.attachedFile"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
            <line x1="12" y1="19" x2="12" y2="5"/>
            <polyline points="5 12 12 5 19 12"/>
          </svg>
        </button>
      </div>
  
      <p class="footer-note">KreditKu AI analyzes spending patterns. Recommendations are for informational purposes only.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useChatStore } from '@/stores/chat'
  
  const store = useChatStore()
  const inputText = ref<string>('')
  const fileInput = ref<HTMLInputElement | null>(null)
  const textarea = ref<HTMLTextAreaElement | null>(null)
  
  const emit = defineEmits<{ 'scroll-bottom': [] }>()
  
  const handleFile = (e: Event): void => {
    const input = e.target as HTMLInputElement
    const file = input.files?.[0]
    if (file) {
      store.setAttachedFile(file)
      input.value = ''
    }
  }
  
  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }
  
  const autoResize = (): void => {
    if (!textarea.value) return
    textarea.value.style.height = 'auto'
    textarea.value.style.height = Math.min(textarea.value.scrollHeight, 120) + 'px'
  }
  
  const send = async (): Promise<void> => {
    const text = inputText.value.trim()
    const file = store.attachedFile
    if (!text && !file) return
  
    inputText.value = ''
    store.clearAttachedFile()
  
    if (textarea.value) textarea.value.style.height = 'auto'
  
    await store.sendMessage(text, file)
    emit('scroll-bottom')
  }
  </script>
  
  <style scoped>
  .input-area { padding: 16px 24px 24px; display: flex; flex-direction: column; align-items: center; }
  .file-preview-bar {
    width: 100%; max-width: 680px; background: #161616;
    border: 1px solid #252525; border-bottom: none;
    border-radius: 14px 14px 0 0; padding: 10px 14px;
    display: flex; align-items: center; gap: 10px;
  }
  .file-name { font-size: 13px; color: #888; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .file-size { font-size: 12px; color: #444; flex-shrink: 0; }
  .clear-btn { background: none; border: none; cursor: pointer; color: #444; margin-left: 8px; display: flex; align-items: center; transition: color 0.2s; }
  .clear-btn:hover { color: #888; }
  .input-wrap {
    width: 100%; max-width: 680px; background: #161616;
    border: 1px solid #252525; border-radius: 14px;
    display: flex; align-items: flex-end; gap: 8px;
    padding: 12px 12px 12px 14px; transition: border-color 0.2s;
  }
  .input-wrap.has-file { border-radius: 0 0 14px 14px; border-top-color: transparent; }
  .input-wrap:focus-within { border-color: rgba(61, 186, 126, 0.27); }
  input[type="file"] { display: none; }
  .attach-btn {
    width: 32px; height: 32px; background: transparent; border: none;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    border-radius: 8px; color: #555; transition: all 0.2s;
    flex-shrink: 0; margin-bottom: 2px;
  }
  .attach-btn:hover { background: #1e1e1e; color: #888; }
  textarea {
    flex: 1; background: transparent; border: none; outline: none;
    color: #e8e8e8; font-family: 'Inter', sans-serif; font-size: 14px;
    resize: none; line-height: 1.5; max-height: 120px; overflow-y: auto;
  }
  textarea::placeholder { color: #444; }
  .send-btn {
    width: 32px; height: 32px; background: #3dba7e; border: none;
    border-radius: 8px; cursor: pointer; display: flex; align-items: center;
    justify-content: center; transition: all 0.2s; flex-shrink: 0; margin-bottom: 2px;
  }
  .send-btn:hover { background: #34a46d; }
  .send-btn:disabled { background: #1e1e1e; cursor: not-allowed; }
  .footer-note { margin-top: 10px; font-size: 11px; color: #333; text-align: center; }
  </style>