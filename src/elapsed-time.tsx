import { useEffect, useRef } from 'react'

import { useGameStore } from './lib/store'
import { formatTime } from './lib/utils'

export default function ElapsedTime() {
    const { started, finished, elapsedTime, updateElapsedTime } = useGameStore()
    const startTimeRef = useRef<number | null>(null)
    const intervalRef = useRef<number | null>(null)

    useEffect(() => {
        if (started && !finished) {
            if (!startTimeRef.current) {
                startTimeRef.current = Date.now()
            }
            intervalRef.current = window.setInterval(() => {
                if (startTimeRef.current) {
                    updateElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000))
                }
            }, 200)
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
            if (!started) {
                updateElapsedTime(0)
                startTimeRef.current = null
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }, [started, finished])

    return <span>{formatTime(elapsedTime)}</span>
}
