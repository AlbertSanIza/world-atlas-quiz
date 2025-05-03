import ElapsedTime from './elapsed-time'
import { useGameStore } from './lib/store'
import Map from './map'

export default function App() {
    const { started, finished, current, answered, countries, startGame, resetGame } = useGameStore()
    const answeredCount = Object.values(answered).length

    return (
        <main className="fixed inset-0 bg-radial from-slate-700 from-40% to-slate-950">
            <div id="stars"></div>
            <div className="pointer-events-none absolute top-0 flex w-full justify-between px-6 pt-6">
                <div>
                    <h1
                        className={`w-fit ${started && !finished ? 'rounded-t-xl' : 'rounded-xl'} bg-black/10 px-2 py-1 text-6xl font-semibold tracking-tight text-white backdrop-blur-sm text-shadow-lg`}
                    >
                        World Atlas
                    </h1>
                    {started && !finished && (
                        <div className="rounded-r-xl rounded-b-xl bg-black/20 px-2 py-0 font-mono text-lg font-semibold text-white backdrop-blur-sm text-shadow-lg">
                            Found: {answeredCount < 10 && <span className="opacity-0">0</span>}
                            {Object.values(answered).filter((value) => value === 'correct').length}/{countries.length}, Remaining:{' '}
                            {countries.length - answeredCount < 10 && <span className="opacity-0">0</span>}
                            {countries.length - answeredCount}, Time: <ElapsedTime />
                        </div>
                    )}
                </div>
                <div className="pointer-events-auto">
                    {!started ? (
                        <button
                            className="flex h-10 w-18 items-center justify-center rounded-lg bg-sky-950 text-white hover:cursor-pointer hover:opacity-80"
                            onClick={startGame}
                        >
                            Start
                        </button>
                    ) : (
                        <button
                            className="flex h-10 w-18 items-center justify-center rounded-lg border-2 border-sky-900 text-white hover:cursor-pointer hover:underline hover:opacity-80"
                            onClick={resetGame}
                        >
                            Reset
                        </button>
                    )}
                </div>
            </div>
            <Map />
        </main>
    )
}
