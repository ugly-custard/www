import type { CommandHandler } from '../types'
import { getRandomLainQuote } from '@/utils/lain-quotes'

export const fastfetchHandler: CommandHandler = () => {
  // Generate a new quote each time fastfetch is called
  const quote = getRandomLainQuote()
  
  // Return a marker with the quote data
  return {
    output: '__FASTFETCH__',
    type: 'info',
    metadata: { quote }
  }
}
