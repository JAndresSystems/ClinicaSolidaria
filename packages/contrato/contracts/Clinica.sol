// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract Clinica is Ownable, Pausable {
    uint256 public totalDonado;
    uint256 private _proximoIdDonacion;
    struct Donacion { uint256 id; address donante; uint256 cantidad; uint256 fecha; string mensaje; }
    mapping(uint256 => Donacion) public donaciones;
    error MontoDebeSerMayorACero(); error MensajeDemasiadoLargo(); error TransferenciaFallida();
    event DonacionRecibida(uint256 indexed donacionId, address indexed donante, uint256 cantidad, uint256 fecha, string mensaje);
    constructor(address initialOwner) Ownable(initialOwner) {}


    
    function donar(string memory _mensaje) external payable whenNotPaused {
        if (msg.value == 0) revert MontoDebeSerMayorACero();
        if (bytes(_mensaje).length > 100) revert MensajeDemasiadoLargo();
        uint256 id = _proximoIdDonacion;
        totalDonado += msg.value;
        donaciones[id] = Donacion(id, msg.sender, msg.value, block.timestamp, _mensaje);
        emit DonacionRecibida(id, msg.sender, msg.value, block.timestamp, _mensaje);
        _proximoIdDonacion++;
    }
    function reclamarFondos() external onlyOwner {
        (bool exito, ) = owner().call{value: address(this).balance}("");
        if (!exito) revert TransferenciaFallida();
    }
    function pausar() external onlyOwner { _pause(); }
    function reanudar() external onlyOwner { _unpause(); }
}