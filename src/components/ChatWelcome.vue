<template>
    <div class="welcome">
      <div class="icon-wrap">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3dba7e" stroke-width="1.8">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
          <line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
      </div>
  
      <h1>What can I help you find today?</h1>
      <p>Upload your monthly spending data and I will recommend the best credit cards for your lifestyle. Or ask me anything about credit card rewards.</p>
  
      <div class="suggestions">
        <div
          v-for="s in suggestions"
          :key="s.type"
          class="suggestion-card"
          @click="select(s.type)"
        >
          <div class="suggestion-icon" v-html="s.icon" />
          <h3>{{ s.title }}</h3>
          <p>{{ s.desc }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useChatStore } from '@/stores/chat'
  
  const store = useChatStore()
  
  interface Suggestion {
    type: string
    title: string
    desc: string
    icon: string
  }
  
  const suggestions: Suggestion[] = [
    {
      type: 'upload',
      title: 'Upload spending data',
      desc: 'Upload your monthly bank statement or Excel file',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3dba7e" stroke-width="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>`
    },
    {
      type: 'cashback',
      title: 'Compare cashback cards',
      desc: 'Find the best cashback rates for your habits',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3dba7e" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`
    },
    {
      type: 'travel',
      title: 'Travel rewards strategy',
      desc: 'Maximize points for flights and hotels',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3dba7e" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
    }
  ]
  
  const prompts: Record<string, string> = {
    upload: 'I want to upload my monthly spending data to get a card recommendation.',
    cashback: 'Which credit cards have the best cashback rates in Malaysia?',
    travel: 'What is the best travel rewards strategy for flights and hotels?'
  }
  
  const select = (type: string): void => {
    const text = prompts[type]
    if (text) store.sendMessage(text, null)
  }
  </script>
  
  <style scoped>
  .welcome { text-align: center; max-width: 640px; width: 100%; }
  .icon-wrap {
    width: 64px; height: 64px; background: #1a2e25;
    border-radius: 16px; display: flex; align-items: center;
    justify-content: center; margin: 0 auto 28px;
  }
  h1 { font-size: 28px; font-weight: 600; color: #fff; margin-bottom: 14px; letter-spacing: -0.02em; }
  p { font-size: 15px; color: #666; line-height: 1.6; font-weight: 300; margin-bottom: 36px; }
  .suggestions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .suggestion-card {
    background: #161616; border: 1px solid #222;
    border-radius: 12px; padding: 18px; cursor: pointer;
    text-align: left; transition: all 0.2s;
  }
  .suggestion-card:hover { background: #1c1c1c; border-color: #2e2e2e; }
  .suggestion-icon { margin-bottom: 12px; }
  .suggestion-card h3 { font-size: 14px; font-weight: 500; color: #e8e8e8; margin-bottom: 6px; }
  .suggestion-card p { font-size: 12px; color: #555; line-height: 1.5; font-weight: 300; }
  </style>