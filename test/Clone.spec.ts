import { use, expect } from "chai";
import { solidity } from "ethereum-waffle";
import { deployments } from "hardhat";
import { Contract } from "ethers";

use(solidity);

export const setupTest = deployments.createFixture(
  async ({ deployments, ethers }, options: any) => {
    await deployments.fixture();
    const { f1 } = await ethers.getNamedSigners();
    const cloneInstance = await ethers.getContract("Clone", f1);
    const mainInstance = await ethers.getContract("Main", f1);
    return { mainInstance, cloneInstance };
  }
);

describe("Clone", () => {
  let cloneInstance: Contract, mainInstance: Contract;

  beforeEach(async () => {
    ({ cloneInstance, mainInstance } = await setupTest());
  });

  it("saves the main address", async () => {
    const mainAddressState = await cloneInstance.main();
    expect(mainAddressState).to.equal(mainInstance.address);
  });
});
