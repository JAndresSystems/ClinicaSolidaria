async function main() {
  const desplegador = (await hre.ethers.getSigners())[0];
  const Clinica = await hre.ethers.getContractFactory("Clinica");
  const clinica = await Clinica.deploy(desplegador.address);

  // Esperamos a que el despliegue se complete
  await clinica.waitForDeployment();

  // Obtenemos la dirección y el número de bloque
  const direccion = await clinica.getAddress();
  const txDespliegue = clinica.deploymentTransaction();
  const bloque = txDespliegue.blockNumber;

  console.log(`Contrato 'Clinica' desplegado en: ${direccion}`);
  console.log(`Bloque de despliegue: ${bloque}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
