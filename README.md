# ERC20 Gasless Bridge Token

ERC20 contract that mints an identical token by depositing the source token.
Users receive minted tokens that can be transferred without paying gas, even if the source token does not support it.
In order to pay for gas, the source token is traded against liquidity by the referrer against a liquidity pool.
The new token leverages [EIP-2612](https://eips.ethereum.org/EIPS/eip-2612) which uses a signed message by the owner to handle allowance as well as [EIP-2771](https://eips.ethereum.org/EIPS/eip-2771) to allow a third-party to pay for fees.
