export interface Message {
    role: 'user' | 'ai'
    text: string
    file: File | null
    typing: boolean
  }
  
  export interface ChatHistory {
    id: string
    preview: string
    timestamp: Date
  }
  
  export interface ExpenseData {
    category: string
    amount: number
  }
  
  export interface RecommendationResponse {
    recommendation: string
    cards?: CardRecommendation[]
  }
  
  export interface CardRecommendation {
    name: string
    bank: string
    benefits: string
    bestFor: string
    annualFee: string
  }