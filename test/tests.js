const { expect } = require("chai");


let contract;
const votingId = 0;


beforeEach(async function () {
  const FactoryContract = await ethers.getContractFactory("VotingFactory");
  contract = await FactoryContract.deploy();
});


describe("Create voting", async function () {
  it("Create voting", async function () {
    const transaction = await contract.createVoting('testVoting');
    const tx = await transaction.wait();

    const event = tx.events[0];
    const value = event.args[1];

    expect(value).to.be.equal('testVoting');
  });

  it("Create voting 2", async function () {
    const transaction = await contract.createVoting('testVoting2');
    const tx = await transaction.wait();

    const event = tx.events[0];
    const value = event.args[1];

    expect(value).to.be.equal('testVoting2');
  });

});


describe("Add 5 candidates", async function () {
  const candidatesArray = [
    '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
    '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720',
    '0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097',
    '0xdD2FD4581271e230360230F9337D5c0430Bf44C0',
  ];

  for(const candidate of candidatesArray){
    it("Add candidate", async function () {

      const transaction = await contract.addCandidate(candidate, votingId);
      const tx = await transaction.wait();
    
      expect(tx.status).to.be.equal(1);
    });
  }
 
  
});
