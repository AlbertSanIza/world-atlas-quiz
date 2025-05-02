import Map from './map'

export default function App() {
    return (
        <main className="fixed inset-0 bg-radial from-slate-700 from-40% to-slate-950 p-6">
            <div id="stars"></div>
            <Map />
        </main>
    )
}
