'use client';
import { useEffect, useState } from 'react';
import { formatEther } from 'viem';


const URL_SUBGRAPH = 'https://api.studio.thegraph.com/...'; 

interface Donacion {
    id: string;
    donante: string;
    cantidad: string;
    fecha: string;
    mensaje: string;
}

export function TablaHistorial() {
    const [donaciones, setDonaciones] = useState<Donacion[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerDonaciones = async () => {
            const consulta = `query { donacions(orderBy: fecha, orderDirection: desc, first: 10) { id donante cantidad fecha mensaje } }`;
            try {
                const respuesta = await fetch(URL_SUBGRAPH, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: consulta }) });
                const datos = await respuesta.json();
                if (datos.data && datos.data.donacions) {
                    setDonaciones(datos.data.donacions);
                }
            } catch (error) {
                console.error("Error al obtener donaciones del subgraph:", error);
            } finally {
                setCargando(false);
            }
        };
        
        obtenerDonaciones();
        const intervalo = setInterval(obtenerDonaciones, 30000);
        return () => clearInterval(intervalo);
    }, []);

    return (
        <div className="historial">
            <h3>Historial de Donaciones</h3>
            <div className="tabla-contenedor">
                <table>
                    <thead>
                        <tr>
                            <th>Donante</th>
                            <th>Cantidad</th>
                            <th>Mensaje</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cargando ? (
                            <tr><td colSpan={4}>Cargando historial...</td></tr>
                        ) : donaciones.length === 0 ? (
                            <tr><td colSpan={4}>Aún no hay donaciones. ¡Sé el primero!</td></tr>
                        ) : (
                            donaciones.map((donacion) => (
                                <tr key={donacion.id}>
                                    <td>{`${donacion.donante.substring(0, 6)}...${donacion.donante.substring(donacion.donante.length - 4)}`}</td>
                                    <td className="cantidad">{parseFloat(formatEther(BigInt(donacion.cantidad))).toFixed(4)} ETH</td>
                                    <td>{donacion.mensaje || '-'}</td>
                                    <td>{new Date(parseInt(donacion.fecha) * 1000).toLocaleString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}