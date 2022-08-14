import { expect } from 'chai';
import { ethers, deployments, getNamedAccounts } from 'hardhat';

import { toWei, toEther, toBN } from './utils/testTools';

import { setupUser } from './utils';

const setupTest = deployments.createFixture(
    async ({ deployments, getNamedAccounts, ethers }, options) => {
        await deployments.fixture();
        const { deployer, tokenOwner, user1, user2 } = await getNamedAccounts();

        // it first ensures the deployment is executed and reset (use of evm_snapshot for faster tests)
        await deployments.fixture(['Token']);
        await deployments.fixture(['SampleGasless']);
        const contracts = {
            TOK: await ethers.getContract('Token'),
            GTOK: await ethers.getContract('SampleGasless')
        };

        // we get an instantiated contract in the form of a ethers.js Contract instance:
        const TOK = await ethers.getContract('Token');
        const GTOK = await ethers.getContract('SampleGasless');
        console.log(JSON.stringify(await getNamedAccounts()));

        return {
            ...contracts,
            user1: await setupUser(user1, contracts),
            user2: await setupUser(user2, contracts),
            deployer: await setupUser(deployer, contracts),
            tokenOwner: await setupUser(tokenOwner, contracts)
        };
    }
);

before(async () => {
    const { deployer, user1 } = await setupTest();

    //prefund accounts with 1000 tokens
    await deployer.TOK.transfer(user1, toWei(1000));
    await deployer.GTOK.transfer(user1, toWei(1000));
    describe('Initialization', () => {
        it('Should match owners and admins', async () => {
            expect(await deployer.TOK.owner()).to.equal(deployer);
            expect(await deployer.GTOK.owner()).to.equal(deployer);
        });

        it('initial deposit', async () => {
            const { deploy } = deployments;
        });
    });

    //initialize contract for testing
});

describe('Deposit Tests.', async () => {
    before(async () => {
        const { TOK, GTOK } = await setupTest();
        //initialize contract for testing
    });

    it('Should deposit and emit an event', async () => {
        const { TOK, GTOK } = await setupTest();
        const { testUser, deployer } = await getNamedAccounts();
    });
});
