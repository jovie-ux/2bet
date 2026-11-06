import { onBeforeUnmount, onMounted, ref } from 'vue'
import usernamesList from '~/data/usernames.json'
import { JACKPOT_WINNERS, type JackpotWinner } from '~/data/jackpot'
import { generateWinnerWinning } from '~/utils/winnerCurrency'

const WINNER_PROVIDER_LOGO = '/images/providers/jdb.webp'

const maskUsername = (name: string): string => {
  if (name.includes('*')) return name
  const clean = name.replace(/[^a-zA-Z0-9]/g, '')
  if (clean.length <= 2) return `${clean[0] || 'u'}******${clean[1] || '8'}`
  const starCount = Math.max(5, Math.min(6, clean.length - 2))
  return `${clean[0]}${'*'.repeat(starCount)}${clean[clean.length - 1]}`
}

const formatDateTime = (date = new Date()): string => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${day}-${month} ${hours}:${minutes}`
}

const generateRandomAmount = (): string => {
  // Focus winning from 100 USD to 1,000 USD, converting to target currency
  return generateWinnerWinning(100, 1000)
}

export const useJackpotWinners = () => {
  const currentWinners = ref<JackpotWinner[]>([...JACKPOT_WINNERS])
  let winnerTimer: ReturnType<typeof setTimeout> | null = null

  const addNewWinner = (): void => {
    const randomUsername = usernamesList[Math.floor(Math.random() * usernamesList.length)] || 'player_99'
    const newWinner: JackpotWinner = {
      id: `winner-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      providerLogo: WINNER_PROVIDER_LOGO,
      username: maskUsername(randomUsername),
      amount: generateRandomAmount(),
      date: formatDateTime(),
    }
    currentWinners.value = [newWinner, ...currentWinners.value.slice(0, 4)]
  }

  const scheduleRandomWinner = (): void => {
    if (!import.meta.client) return
    const delay = Math.floor(Math.random() * (60_000 - 5_000 + 1)) + 5_000
    winnerTimer = setTimeout(() => {
      addNewWinner()
      scheduleRandomWinner()
    }, delay)
  }

  onMounted(scheduleRandomWinner)
  onBeforeUnmount(() => {
    if (winnerTimer) {
      clearTimeout(winnerTimer)
      winnerTimer = null
    }
  })

  return currentWinners
}
