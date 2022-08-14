import { TNetworkNames } from './types/TNetworkNames';

type TChain = TNetworkNames | number;
type TAccountName = 'deployer' | 'user1' | 'user2' | 'owner' | 'governance';

/**
 * The default account to use for hardhat.  For example 0 will take by default take the first account of hardhat
 */
type TDefaultAccount = {
    ['default']: number | string;
};

/**
 * Named accounts to be used by hardaht.  See docs: https://github.com/wighawag/hardhat-deploy#1-namedaccounts-ability-to-name-addresses
 *
 * the values are account addresses, or account number in hardhat
 */
export const hardhatNamedAccounts: {
    [name in TAccountName]: Readonly<
        Partial<{ [network in TChain]: number | string }> & TDefaultAccount
    >;
} = {
    deployer: {
        default: 0, // first account as deployer for local
        1: 0, // mainnet will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        4: '0xD526c7b5876db70b91Cbd29Cd30d861DbfdEaE9C', // for rinkeby it will be a specific address
        testnetBSC: '0xC7dB20f6Ec3155C86E24da1d2956e2efB0cd185D' // specific network name (specified in hardhat.config.js)
    },
    user1: {
        default: 1
    },
    user2: {
        default: 2
    },
    owner: {
        default: 3
    },
    governance: {
        default: 10
    }
} as const;
