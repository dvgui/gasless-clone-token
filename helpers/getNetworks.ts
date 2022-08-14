import { TNetworkInfo } from 'eth-hooks/models';

import { NETWORKS } from './hardhat-networks';
import { TNetworkNames } from './types/TNetworkNames';

export const getNetworks = (
    additionalFields: Record<string, any>
): Record<string, TNetworkInfo | any> => {
    const result: Record<TNetworkNames, TNetworkInfo | any> = { ...NETWORKS };
    for (const n in NETWORKS) {
        const names = n as TNetworkNames;
        result[names] = { ...NETWORKS[names], ...additionalFields };
    }

    return result;
};
