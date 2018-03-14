pragma solidity^0.4.17;

import 'zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract SctMint is MintableToken {
  string public name = "SCT Mint";
  string public symbol = "SCTM";
  uint8 public decimals = 0;
}
