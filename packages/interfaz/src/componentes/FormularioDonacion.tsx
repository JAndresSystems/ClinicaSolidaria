'use client';
import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { ABI_CONTRATO, DIRECCION_CONTRATO } from '@/configuracion/contrato';

export function FormularioDonacion() {
    const [monto, setMonto] = useState('');
    const [mensaje, setMensaje] = useState('');
    
    const { data: hash, writeContract } = useWriteContract();
    
    async function enviarDonacion(evento: React.FormEvent) {
        evento.preventDefault();
        if (!monto || parseFloat(monto) <= 0) {
            alert("Por favor, ingresa un monto válido.");
            return;
        }
        writeContract({
            address: DIRECCION_CONTRATO,
            abi: ABI_CONTRATO,
            functionName: 'donar',
            args: [mensaje],
            value: parseEther(monto as `${number}`),
        });
    }

    const { isLoading: estaProcesando, isSuccess: fueExitoso } = useWaitForTransactionReceipt({ 
        hash, 
    });

    return (
        <div className="panel-formulario">
            <h3>Haz tu Aporte</h3>
            <form onSubmit={enviarDonacion}>
                <div>
                    <label htmlFor="monto">Monto en ETH</label>
                    <input
                        id="monto"
                        type="text"
                        value={monto}
                        onChange={(e) => setMonto(e.target.value)}
                        placeholder="0.01"
                    />
                </div>
                <div>
                    <label htmlFor="mensaje">Mensaje (opcional)</label>
                    <input
                        id="mensaje"
                        type="text"
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                        placeholder="¡Para las clínicas!"
                        maxLength={100}
                    />
                </div>
                <button type="submit" disabled={!monto || estaProcesando}>
                    {estaProcesando ? 'Donando...' : 'Enviar Donación'}
                </button>
                {fueExitoso && (
                    <div className="mensaje-exito">
                        ¡Donación exitosa! Gracias por tu apoyo.
                    </div>
                )}
            </form>
        </div>
    );
    
}