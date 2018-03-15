/*
* TEST COVERAGE
* Test is done on Ganache CLI
* the contract should:
* x 1) Have a correct symbol
* x 2) Have a correct public name
* x 3) Have a correct decimal place
* x 5) should mint the right amount
* 6) Unable to mint more, after the stopMinting function is called
* 7) Be transferrable by owner after minted
* 8) Show the transfer event
* x 9) Have the right balance after minted
* x 10) Set owner as sender
* x 11) only owner can && other account cannot CALL MINT function
* 12) test approval function
* 13) owner can call finish minting function
* 14) Check for total supply
* 15) How it handles random ETH sending (223 fallback feature)
* x 16) Other people cannot call finish minting function
*/

import expectThrow from 'zeppelin-solidity/test/helpers/expectThrow.js';
var SctMint = artifacts.require('./SctMint.sol');

contract('SctMint', async (accounts) => {

  it('should set the sender account to owner', async () => {
    let instance = await SctMint.deployed();
    let senderAccount = web3.eth.accounts[0];
    let owner = await instance.owner();

    assert.equal(senderAccount, owner, "sender is not set to owner");
  })

  it('should have SCT Mint as a name', async() => {
    let instance = await SctMint.deployed();
    let correctName = "SCT Mint";
    let checkName = await instance.name();

    assert.equal(correctName, checkName, "name is not correct");
  })

  it('should have 0 decimal place', async() => {
    let instance = await SctMint.deployed();

    let correctDecimalPlace = 0;
    let checkDecimalPlace = await instance.decimals();

    assert.equal(correctDecimalPlace, checkDecimalPlace, "decimal places are not correct")
  })

  it('should have SCTM as symbol', async ()=> {
    let instance = await SctMint.deployed();
    let correctSymbol = "SCTM";
    let checkSymbol = await instance.symbol();

    assert.equal(correctSymbol, checkSymbol, "Symbols are not correct")
  })

  it('should not allow other accounts beside owner to call mint function', async () => {
    let instance = await SctMint.deployed();
    let correctAccount = web3.eth.accounts[0];
    let notCorrectAccount = web3.eth.accounts[1];
    let funding = 100;

    let correctMinting = await instance.mint(correctAccount, funding, {from: correctAccount});
    let notCorrectMinting = await expectThrow(instance.mint(notCorrectAccount, funding, {from: notCorrectAccount}));

    let checkCorrectBalance = await instance.balanceOf(correctAccount);
    let checkNotCorrectBalance = await instance.balanceOf(notCorrectAccount);

    assert.equal(checkCorrectBalance, funding, "owner account can't mint")
    assert.notEqual(checkNotCorrectBalance, funding, "none owner account can Mint")
  })

  it('should mint the right amount', async () => {

    let instance = await SctMint.deployed();
    let amount = 100;

    await instance.mint(web3.eth.accounts[1], amount);
    let checkAmountAfterMint = await instance.balanceOf(web3.eth.accounts[1]);
    let accountBalance = checkAmountAfterMint.toNumber();

    assert.equal(amount, accountBalance, "Amount of minted token doesn't match")
  })

  it('should not allow non-owner to call finishMinting', async () => {
    let instance = await SctMint.deployed();
    let nonOwner = web3.eth.accounts[1];

    //should throw
    await expectThrow(instance.finishMinting({from: nonOwner}));
  })

  it('should not allow minting after calling FinishMinting', async () => {
    let instance = await SctMint.deployed();
    let ownerAccount = web3.eth.accounts[0];

    let amount = 100;
    //owner can still mint
    await instance.mint(ownerAccount, amount, {from: ownerAccount});
    //check if minting works
    let checkAmountAfterMint = await instance.balanceOf(ownerAccount);
    let balanceBefore = checkAmountAfterMint.toNumber();

    //call finish minting function
    await instance.finishMinting();
    //try minting, expecting throw
    await expectThrow(instance.mint(ownerAccount, amount, {from: ownerAccount}));
    //check amount after minting and calling finishminting
    let checkAmountAfterFinishMinting = await instance.balanceOf(ownerAccount)
    let balanceAfter = checkAmountAfterFinishMinting.toNumber();

    //Balance should not change
    assert.equal(balanceBefore, balanceAfter, 'minting still possible')
  })


})
