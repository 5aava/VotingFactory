import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');


export default function handler(req, res) {
  if(!req.body.sign) {return res.status(403).send(); }
  
  const account = web3.eth.accounts.recover('My Test DAPP', req.body.sign).toLowerCase();

  res.status(200).json({ account: account })
}
