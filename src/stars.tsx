import { useEffect } from 'react'

export default function Stars() {
    useEffect(() => {
        const starsContainer = document.getElementById('stars')
        if (!starsContainer) {
            return
        }

        const handleResize = () => {
            starsContainer.innerHTML = ''
            const newNumStars = Math.floor((window.innerWidth * window.innerHeight) / 1200)
            for (let i = 0; i < newNumStars; i++) {
                const star = document.createElement('div')
                const size = Math.random() * 1.5 + 0.5
                star.style.position = 'absolute'
                star.style.top = `${Math.random() * 100}%`
                star.style.left = `${Math.random() * 100}%`
                star.style.width = `${size}px`
                star.style.height = `${size}px`
                star.style.background = '#fff'
                star.style.borderRadius = '50%'
                star.style.opacity = String(Math.random() * 0.5 + 0.5)
                starsContainer.appendChild(star)
            }
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return <div id="stars" className="fixed inset-0 -z-10" />
}
