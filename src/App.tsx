import Map from './map'

export default function App() {
    return (
        <main className="fixed inset-0 bg-radial from-slate-700 from-40% to-slate-950">
            <div id="stars"></div>
            <h1 className="absolute top-6 left-6 flex flex-col rounded-xl bg-black/10 px-2 py-1 text-6xl font-semibold tracking-tight text-white backdrop-blur-xs text-shadow-lg">
                WORLD ATLAS
            </h1>
            <Map />
        </main>
    )
}
