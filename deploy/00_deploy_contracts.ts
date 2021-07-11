import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployFunction: DeployFunction = async ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) => {
  const { deploy } = deployments;
  const { f1 } = await getNamedAccounts();

  const { address } = await deploy("Main", {
    from: f1,
    args: [],
    log: true,
  });

  await deploy("Clone", {
    from: f1,
    args: [address],
    log: true,
  });
};

export default deployFunction;
