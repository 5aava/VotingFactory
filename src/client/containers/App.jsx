import { Button, Paper, Stack, Typography } from "@mui/material";
import MetaMaskOnboarding from '@metamask/onboarding';
import { useState, useEffect, useRef } from 'react';
import Web3 from 'web3';
import fetcher from '../utils/fetcher';

const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Metamask connect';
const CONNECTED_TEXT = 'Metamask connected';
const DISCONECT_TEXT = 'Metamask disconnect';


export default function OnboardingButton() {
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState(0);
  const [sign, setSign] = useState(null);
  const [accFromServ, setAccFromServ] = useState(null);
  const onboarding = useRef();

  const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');


  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);


  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);


  useEffect(() => {
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleNewAccounts);
      window.ethereum.on('accountsChanged', handleNewAccounts);
      return () => {
        window.ethereum.on('accountsChanged', handleNewAccounts);
      };
    }
  }, []);

  const handleAccountsChanged = async () => {
    // if (!isReturningUser) {
      // Runs only they are brand new, or have hit the disconnect button
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {}
          }
        ]
      });
      
      const wallets = await window.ethereum.request({ method: 'eth_requestAccounts' })
        .catch(error => {
          if (error.code === 4001) {
            // EIP-1193 userRejectedRequest error
            console.log('Please connect to MetaMask.');
          } else {
            console.error(error);
          }
        });


      let ethBalance = await window.ethereum.request({ 
        method: "eth_getBalance",
        params: [
          wallets[0],
          "latest"
        ]
       }).catch(error => {
        console.error(error);
      });

      ethBalance = parseInt(ethBalance, 16) / 1000000000000000000;
      console.log(`Balance: ${ethBalance}`);
      
      console.log(wallets);
      setAccounts(wallets);      
      setBalance(ethBalance);
  }

  const signMessage = async () => {
    
    const myStr = "My Test DAPP"; 
    const t = web3.utils.keccak256("\x19Ethereum Signed Message:\n" + myStr.length + myStr);

    
    const signature = await window.ethereum.request({ 
      method: "eth_sign",
      params: [
        accounts[0],
        t
      ]
     }).catch(error => {
      console.error(error);
    });      

    setSign(signature);
    
    const response = await fetcher({sign: signature});
    
    setAccFromServ(response.account);
  }

  const connect = async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      await handleAccountsChanged();
    } else {
      onboarding.current.startOnboarding();
    };
  };

  const disconnect = async () => {
    setAccounts([]);
    setBalance(null);
    setAccFromServ(null);
  }

  return (
    <center>
      <div style={{width: '50%'}}>
        <br />
        <Paper elevation={3} sx={{ p: 3 }}>
          <Stack spacing={2} >
            <Typography variant="h3">
              Test DAPP 
            </Typography>            
            <Typography variant="h6">
              {accounts.length > 0 && `Account: ${accounts}`}
            </Typography>
            <Typography variant="h6">
              {accounts.length > 0 && `Balance: ${balance}`}
            </Typography>
            <Button disabled={isDisabled} onClick={connect} variant={'contained'}>
              {buttonText}
            </Button>
            {accounts.length ?
              <Button variant={'contained'} color="secondary" onClick={disconnect}>
                {DISCONECT_TEXT}
              </Button> : null
            }

            {accounts.length ?
              <>
                <br />
                  <Button variant={'contained'} color="primary" onClick={signMessage}>
                    Server auth
                  </Button> 
                </>
                  
              : null
            }


            {sign && accFromServ ?
              <>
                <Typography variant="h6">
                  Signature:
                </Typography>              
                <Typography variant="body" noWrap={true}>
                  {sign}
                </Typography>      
              </>                 
              : null
            }  

            {accFromServ ?
              <>
                <Typography variant="h6">
                  Account from server:
                </Typography>              
                <Typography variant="h5">
                  {accFromServ}
                </Typography>      
              </>                 
              : null
            }     
          </Stack>
        </Paper>
      </div>
    </center>
  );

}
