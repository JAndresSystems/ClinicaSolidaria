import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { DonacionRecibida } from "../generated/schema"
import { DonacionRecibida as DonacionRecibidaEvent } from "../generated/Clinica/Clinica"
import { handleDonacionRecibida } from "../src/clinica"
import { createDonacionRecibidaEvent } from "./clinica-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let donacionId = BigInt.fromI32(234)
    let donante = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let cantidad = BigInt.fromI32(234)
    let fecha = BigInt.fromI32(234)
    let mensaje = "Example string value"
    let newDonacionRecibidaEvent = createDonacionRecibidaEvent(
      donacionId,
      donante,
      cantidad,
      fecha,
      mensaje
    )
    handleDonacionRecibida(newDonacionRecibidaEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("DonacionRecibida created and stored", () => {
    assert.entityCount("DonacionRecibida", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "DonacionRecibida",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "donacionId",
      "234"
    )
    assert.fieldEquals(
      "DonacionRecibida",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "donante",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "DonacionRecibida",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "cantidad",
      "234"
    )
    assert.fieldEquals(
      "DonacionRecibida",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "fecha",
      "234"
    )
    assert.fieldEquals(
      "DonacionRecibida",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "mensaje",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
