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
                    <h1 className="w-fit rounded-xl bg-black/10 px-2 py-1 text-6xl font-semibold tracking-tight text-white backdrop-blur-sm text-shadow-lg">
                        World Atlas
                    </h1>
                    {started && !finished && (
                        <div className="mt-2 rounded-r-xl rounded-b-xl bg-black/10 px-2 py-0 font-mono text-lg font-semibold text-white backdrop-blur-sm text-shadow-lg">
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
            {started && !finished && current && (
                <div className="pointer-events-none absolute bottom-0 flex w-full justify-center pb-2">
                    <div className="rounded-lg bg-black/20 px-2 pb-1 text-2xl font-semibold tracking-tight text-white backdrop-blur-sm text-shadow-lg">
                        Find: <span className="text-4xl underline">{current}</span>
                    </div>
                </div>
            )}
            {finished && (
                <div className="fixed inset-0 flex items-center justify-center bg-zinc-950/80 text-white">
                    <div className="flex flex-col items-start gap-4 rounded-lg p-6">
                        <h2 className="f text-4xl font-semibold">Results:</h2>
                        <div className="text-6xl font-bold">
                            Found: {Object.values(answered).filter((value) => value === 'correct').length}/{countries.length}, Time: <ElapsedTime />
                        </div>
                        <button className="hover:cursor-pointer hover:underline" onClick={resetGame}>
                            Reset
                        </button>
                    </div>
                </div>
            )}
            <Map />
        </main>
    )
}
