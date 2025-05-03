import { drag, geoOrthographic, GeoPath, geoPath, GeoPermissibleObjects, GeoProjection, select } from 'd3'
import { Feature, GeoJsonProperties } from 'geojson'
import { useEffect, useRef, useState } from 'react'
import { feature } from 'topojson-client'
import { Topology } from 'topojson-specification'

import { useGameStore } from './lib/store'

const WIDTH = 1000
const HEIGHT = 1000
const INSET = 24

export default function Map() {
    const ref = useRef<SVGSVGElement>(null)
    const projectionRef = useRef<GeoProjection>(null)
    const pathRef = useRef<GeoPath<any, GeoPermissibleObjects>>(null)
    const [features, setFeatures] = useState<Feature[]>()
    const { updateCountries } = useGameStore()

    useEffect(() => {
        fetch('https://unpkg.com/world-atlas@2.0.2/countries-110m.json')
            .then((response) => response.json() as Promise<Topology>)
            .then((topology) => {
                const geoJsonProperties: GeoJsonProperties = feature(topology, topology.objects.countries)
                updateCountries(geoJsonProperties.features.map((feature: { properties: { name: string } }) => feature.properties.name))
                setFeatures(geoJsonProperties?.features)
            })
    }, [])

    useEffect(() => {
        if (!features) {
            return
        }
        projectionRef.current = geoOrthographic().fitExtent(
            [
                [INSET, INSET],
                [WIDTH - INSET, HEIGHT - INSET]
            ],
            { type: 'Sphere' }
        )
        projectionRef.current.scale(476)
        pathRef.current = geoPath(projectionRef.current)

        select(ref.current as Element).call(
            drag().on('drag', (event) => {
                const rotation = projectionRef.current?.rotate() || [0, 0, 0]
                projectionRef.current?.rotate([rotation[0] + event.dx / 6, Math.max(-50, Math.min(50, rotation[1] - event.dy / 6)), 0])
                render()
            })
        )

        function onWheel(event: WheelEvent) {
            event.preventDefault()
            let scale = projectionRef.current?.scale() || 476
            scale += event.deltaY * 0.4
            projectionRef.current?.scale(Math.max(476, Math.min(840, scale)))
            render()
        }

        render()

        window.addEventListener('wheel', onWheel, { passive: false })
        return () => {
            window.removeEventListener('wheel', onWheel)
        }
    }, [features])

    function render() {
        if (!ref.current || !projectionRef.current || !pathRef.current || !features) {
            return
        }
        const svg = select(ref.current)
        svg.selectAll('*').remove()
        svg.append('circle')
            .attr('cx', WIDTH / 2)
            .attr('cy', HEIGHT / 2)
            .attr('r', projectionRef.current.scale() + 1)
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
        svg.append('circle')
            .attr('cx', WIDTH / 2)
            .attr('cy', HEIGHT / 2)
            .attr('r', projectionRef.current.scale())
            .attr('fill', '#98DCFF')
        svg.append('g')
            .selectAll('path')
            .data(features)
            .join('path')
            .attr('d', pathRef.current)
            .attr('fill', '#BEE7B6')
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
    }

    return <svg className="size-full" ref={ref} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} />
}
