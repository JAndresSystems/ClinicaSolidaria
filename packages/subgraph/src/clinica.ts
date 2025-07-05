import { DonacionRecibida as DonacionRecibidaEvent } from "../generated/Clinica/Clinica"
import { Donacion } from "../generated/schema"

export function handleDonacionRecibida(event: DonacionRecibidaEvent): void {
  // Creamos una nueva entidad 'Donacion'
  // El ID se convierte a un string hexadecimal para ser compatible.
  let entidad = new Donacion(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString()
  );
  
  // Mapeamos los datos del evento a los campos de nuestra entidad
  entidad.idTransaccion = event.transaction.hash;
  entidad.donante = event.params.donante;
  entidad.cantidad = event.params.cantidad;
  entidad.fecha = event.params.fecha;
  entidad.mensaje = event.params.mensaje;

  // Guardamos la nueva entidad en la base de datos de The Graph
  
  entidad.save();
}