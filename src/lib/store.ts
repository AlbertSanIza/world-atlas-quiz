import { create } from 'zustand'

type AnswerStatus = 'correct' | 'incorrect'

function getRandomCountry(remaining: string[]) {
    return remaining[Math.floor(Math.random() * remaining.length)]
}

export const useGameStore = create<{
    started: boolean
    finished: boolean
    current: string | null
    answered: Record<string, AnswerStatus>
    elapsedTime: number
    countries: string[]
    startGame: () => void
    resetGame: () => void
    answer: (country: string) => void
    updateElapsedTime: (time: number) => void
}>((set, get) => ({
    started: false,
    finished: false,
    current: null,
    answered: {},
    elapsedTime: 0,
    countries: [],
    startGame: () => {
        set({ started: true, finished: false, current: getRandomCountry(countries), answered: {}, elapsedTime: 0 })
    },
    resetGame: () => {
        set({ started: false, finished: false, current: null, answered: {}, elapsedTime: 0 })
    },
    answer: (country: string) => {
        const { current, answered } = get()
        if (!current) {
            return
        }
        let newAnswered = { ...answered }
        newAnswered[current] = country === current ? 'correct' : 'incorrect'
        const remaining = countries.filter((c) => !newAnswered[c])
        set({ answered: newAnswered, current: remaining.length > 0 ? getRandomCountry(remaining) : null, finished: remaining.length === 0 })
    },
    updateElapsedTime: (time: number) => {
        set({ elapsedTime: time })
    }
}))
