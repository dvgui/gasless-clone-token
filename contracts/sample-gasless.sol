//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Address.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';

import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

contract SampleGasless is Ownable, ERC20Burnable {
    using SafeERC20 for IERC20;
    using Address for address;
    address _originToken;

    // constructor
    constructor(address token) ERC20('Sample Gasless', 'GTOK') {
        _originToken = token;
    }

    function deposit(uint256 value) public {
        require(value > 0, 'cannot deposit 0 tokens');
        IERC20 sourceToken = IERC20(_originToken);
        sourceToken.safeTransferFrom(msg.sender, address(this), value);
    }
}
