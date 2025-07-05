import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  DonacionRecibida,
  OwnershipTransferred,
  Paused,
  Unpaused
} from "../generated/Clinica/Clinica"

export function createDonacionRecibidaEvent(
  donacionId: BigInt,
  donante: Address,
  cantidad: BigInt,
  fecha: BigInt,
  mensaje: string
): DonacionRecibida {
  let donacionRecibidaEvent = changetype<DonacionRecibida>(newMockEvent())

  donacionRecibidaEvent.parameters = new Array()

  donacionRecibidaEvent.parameters.push(
    new ethereum.EventParam(
      "donacionId",
      ethereum.Value.fromUnsignedBigInt(donacionId)
    )
  )
  donacionRecibidaEvent.parameters.push(
    new ethereum.EventParam("donante", ethereum.Value.fromAddress(donante))
  )
  donacionRecibidaEvent.parameters.push(
    new ethereum.EventParam(
      "cantidad",
      ethereum.Value.fromUnsignedBigInt(cantidad)
    )
  )
  donacionRecibidaEvent.parameters.push(
    new ethereum.EventParam("fecha", ethereum.Value.fromUnsignedBigInt(fecha))
  )
  donacionRecibidaEvent.parameters.push(
    new ethereum.EventParam("mensaje", ethereum.Value.fromString(mensaje))
  )

  return donacionRecibidaEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}
