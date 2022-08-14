// This adds support for typescript paths mappings
import 'tsconfig-paths/register';

import './helpers/hardhat-imports';

import path from 'path';

import { config as envConfig } from 'dotenv';
import glob from 'glob';
import { removeConsoleLog } from 'hardhat-preprocessor';
import { HardhatUserConfig } from 'hardhat/config';

import { hardhatNamedAccounts } from 'helpers/hardhat-named-accounts';
import { getNetworks } from 'helpers/getNetworks';
import { getMnemonic } from './tasks/functions/mnemonic';

envConfig({ path: '.env' });
if (process.env.BUILDING !== 'true') {
    glob.sync('./tasks/**/*.ts').forEach((file: string) => {
        require(path.resolve(file));
    });
}

console.log('HARDHAT_TARGET_NETWORK: ', process.env.HARDHAT_TARGET_NETWORK);

const networks = {
    ...getNetworks({
        accounts: {
            mnemonic: getMnemonic()
        }
    }),
    localhost: {
        url: 'http://localhost:8545',
        accounts: {
            mnemonic: getMnemonic()
        }
    },
    hardhat: {
        accounts: {
            mnemonic: getMnemonic()
        }
    }
};
const namedAccounts = hardhatNamedAccounts as {
    [name: string]:
        | string
        | number
        | { [network: string]: null | number | string };
};

export const config: HardhatUserConfig = {
    preprocess: {
        eachLine: removeConsoleLog(
            (hre) =>
                hre.network.name !== 'hardhat' &&
                hre.network.name !== 'localhost'
        )
    },
    defaultNetwork: process.env.HARDHAT_TARGET_NETWORK,
    namedAccounts: namedAccounts,
    networks: networks,
    abiExporter: {
        path: './abi',
        runOnCompile: true,
        clear: true,
        spacing: 2,
        pretty: true
    },
    solidity: {
        compilers: [
            {
                version: '0.8.14',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 250
                    },
                    outputSelection: {
                        '*': {
                            '*': ['storageLayout']
                        }
                    }
                }
            }
        ]
    },
    mocha: {
        bail: false,
        allowUncaught: false,
        require: ['ts-node/register'],
        timeout: 30000,
        slow: 9900,
        reporter:
            process.env.GITHUB_ACTIONS === 'true'
                ? 'mocha-junit-reporter'
                : 'spec',
        reporterOptions: {
            mochaFile: 'testresult.xml',
            toConsole: true
        }
    },
    watcher: {
        'auto-compile': {
            tasks: ['compile'],
            files: ['./contracts'],
            verbose: false
        }
    },
    gasReporter: {
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
        currency: 'USD'
    },
    dodoc: {
        runOnCompile: false,
        debugMode: false,
        keepFileStructure: true,
        freshOutput: true,
        outputDir: './generated/docs',
        include: ['contracts']
    },
    paths: {
        cache: './generated/cache',
        artifacts: './generated/artifacts',
        deployments: './generated/deployments'
    },
    typechain: {
        outDir: './generated/contract-types',
        discriminateTypes: true
    }
};
export default config;
