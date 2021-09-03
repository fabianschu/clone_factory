import { use, expect } from "chai";
import { solidity } from "ethereum-waffle";
import { artifacts, deployments, ethers } from "hardhat";
import { Contract } from "ethers";

use(solidity);

export const setupTest = deployments.createFixture(
  async ({ deployments, ethers }, options: any) => {
    await deployments.fixture();
    const { f1, f2 } = await ethers.getNamedSigners();
    const factoryInstance = await ethers.getContract("Factory", f1);
    return { factoryInstance, f1, f2 };
  }
);

describe.only("Factory", () => {
  let f1: any, f2: any;
  let factoryInstance: Contract;

  beforeEach(async () => {
    ({ factoryInstance, f1, f2 } = await setupTest());
  });

  describe("#createClone", () => {
    let cloneInstance: Contract;

    beforeEach(async () => {
      const createCloneTx = await factoryInstance.createClone();
      const receipt = await createCloneTx.wait();
      const eventSignature = "CloneCreated(address)";

      // TMP
      // const { abi } = await artifacts.readArtifact("Clone");
      // const cloneInterface = new ethers.utils.Interface(abi);
      // receipt.events.forEach((log: any) => {
      //   console.log(cloneInterface.parseLog(log));
      // });
      // TMP

      console.log(receipt.events);

      const cloneCreationEvent = receipt.events.find(
        (log: any) => log.eventSignature === eventSignature
      );
      const [cloneAddress] = cloneCreationEvent.args;

      cloneInstance = await ethers.getContractAt("Clone", cloneAddress);
    });

    it("emits an event CloneCreated", async () => {
      await expect(await factoryInstance.createClone()).to.emit(
        factoryInstance,
        "CloneCreated"
      );
    });

    it("sets owner to be the factory", async () => {
      const cloneOwner = await cloneInstance.owner();
      expect(cloneOwner).to.eq(factoryInstance.address);
    });
  });

  describe("#createInitializableClone", () => {
    let cloneInstance: Contract;

    beforeEach(async () => {
      const createCloneTx = await factoryInstance.createInitializableClone();
      const receipt = await createCloneTx.wait();
      const eventSignature = "CloneCreated(address)";
      const cloneCreationEvent = receipt.events.find(
        (log: any) => log.eventSignature === eventSignature
      );
      const [cloneAddress] = cloneCreationEvent.args;

      cloneInstance = await ethers.getContractAt("InitClone", cloneAddress);

      await cloneInstance.initialize();
    });

    it("sets owner to be EOA", async () => {
      const cloneOwner = await cloneInstance.owner();

      expect(cloneOwner).to.eq(f1.address);
    });
  });
});
