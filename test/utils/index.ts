import { Address } from 'hardhat-deploy/types';

const { ethers } = require('hardhat');

interface Contracts {
    key: keyof contract;
}

export const setupUser = async function (
    address: Address,
    contracts: Contracts
) {
    //TODO find proper contract type
    const user = { address };
    for (const key of Object.keys(contracts)) {
        user[key] = contracts[key].connect(await ethers.getSigner(address));
    }
    return user;
};
