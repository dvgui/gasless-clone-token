const { ethers, network } = require('hardhat');

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const TOK = network.live
        ? //testnet BUSD - replace with your final token
          '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7'
        : //locally, deploy your own token
          await deploy('Token', {
              from: deployer,
              args: []
          });

    const GTOK = await deploy('SampleGasless', {
        from: deployer,
        args: [TOK.address]
    });

    try {
        if (network.live) {
            console.log('Deployer -> ' + deployer);
            console.log('🚀GTOK deployed to: ' + GTOK.address);
        }
        await ethers.getContractAt('TOK', deployer);
        await ethers.getContractAt('GTOK', deployer);
    } catch (err) {
        console.log('Deployment failed - ' + err);
    }
};
module.exports.tags = ['TOK', 'GTOK'];
