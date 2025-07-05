'use client';
import { useReadContract } from 'wagmi';
import { ABI_CONTRATO, DIRECCION_CONTRATO } from '@/configuracion/contrato';
import { formatEther } from 'viem';

// Componente reutilizable para mostrar un dato específico
function Dato({ etiqueta, valor, cargando }: { etiqueta: string; valor?: bigint; cargando: boolean }) {
    const valorFormateado = valor ? parseFloat(formatEther(valor)).toFixed(4) : '0.00';
    return (
        <div> {/* Ya no necesita clases, las hereda del contenedor */}
            <span>{etiqueta}</span>
            {cargando ? (
                <div className="cargando-esqueleto"></div>
            ) : (
                <h3 className="valor-dato">{valorFormateado} ETH</h3>
            )}
        </div>
    );
}

// Componente principal que lee y muestra la información del contrato
export function PanelInfo() {
    const { data: totalDonado, isLoading: cargandoTotal } = useReadContract({
        address: DIRECCION_CONTRATO,
        abi: ABI_CONTRATO,
        functionName: 'totalDonado',
        query: {
            refetchInterval: 2000,
        }
    });

    return (
        <div className="panel-info">
            <Dato etiqueta="Total Recaudado" valor={totalDonado} cargando={cargandoTotal} />
        </div>
    );
}