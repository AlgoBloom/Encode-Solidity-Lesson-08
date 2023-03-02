import { ethers } from 'hardhat';

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
      bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

async function main () {
  const args = process.argv;
  const proposals = args.slice(2);
  if (proposals.length <= 0) throw new Error("Missing parameters: proposals");

  const provider = ethers.provider;

  return;
  console.log("Deploying Ballot contract!");
  console.log("Proposals: ");
  proposals.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });
  const ballotContractFactory = await ethers.getContractFactory("Ballot");
  const ballotContract = await ballotContractFactory.deploy(
      convertStringArrayToBytes32(proposals)
  );
  console.log("Deploying contract ...");
  await ballotContract.deployTransaction.wait();
  console.log(`The Ballot contract was deployed at the address ${ballotContract.address}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});