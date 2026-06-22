const { ethers } = require("hardhat");

async function main() {

    // Deploy Token
    const Token =
        await ethers.getContractFactory(
            "MyToken"
        );

    const token =
        await Token.deploy();

    await token.waitForDeployment();

    const tokenAddress =
        await token.getAddress();

    console.log(
        "Token deployed to:",
        tokenAddress
    );

    // Deploy Staking
    const Staking =
        await ethers.getContractFactory(
            "Staking"
        );

    const staking =
        await Staking.deploy(
            tokenAddress
        );

    await staking.waitForDeployment();

    console.log(
        "Staking deployed to:",
        await staking.getAddress()
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});