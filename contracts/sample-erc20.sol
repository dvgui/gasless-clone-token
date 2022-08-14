//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Token is Ownable, ERC20 {
    // constructor
    constructor() ERC20('Sample Token', 'TOK') {
        _mint(msg.sender, 200000000 * 10**decimals());
    }
}
