import React, {useState} from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import {
    Program, Provider, web3
} from '@project-serum/anchor';
import { Idl } from '@project-serum/anchor';
import {getPhantomWallet} from '@solana/wallet-adapter-wallets';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
require('@solana/wallet-adapter-react-ui/styles.css');

const wallets = [
    /*view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
]

const {SystemProgram, Keypair} = web3;

/* create an account */
const baseAccount = Keypair.generate();
const opts = {
    preflightCommitment: "processed"
}

const programID = new PublicKey(idl.metadata.address);

function App(){
    const [value, setValue] = useState(null);
    const wallet = useWallet();

    async function getProvider(){
        /*Create Provider and Return To The Caller */
        /*Network Set To Local network for now */
        const network = "http://127.0.0.1:8899";
        const connection = new Connection(network, opts.preflightCommitment);

        const provider = new Provider(
            connection, wallet, opts.preflightCommitment
        );

        return provider;
    }

    async function createCounter(){
        const provider = await getProvider()
        /*create the program interface combining the idl, program ID, and provider */
        const program = new Program(idl, programID, provider);

        try{
          /*Interact with the program via rpc */
          await program.rpc.create({
              accounts: {
                  baseAccount: baseAccount.publicKey,
                  user: provider.wallet.publicKey,
                  systemProgram: SystemProgram.programId,
              },
              signers: [baseAccount]
          });

          const account = program.account.baseAccount.fetch(baseAccount.publicKey);
          console.log('account: ', account);
          setValue(account.count.toString());
        } catch(err){
          console.log("Transaction error: ", err);
        }
    }

    async function increment(){
        const provider = await getProvider();
        const program = new Program(idl, programID, provider);
        await program.rpc.increment({
            accounts: {
                baseAccount: baseAccount.publicKey
            }
        });

        const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
        console.log('account: ', account);
        setValue(account.count.toString());
    }

    if(!wallet.connected){
        /* If the user's wallet is not connected, display connect wallet button. */
        return(
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px'}}>
                <WalletMultiButton />
            </div>
        )
    } else {
        return (
            <div className="App">
                <div>
                    {
                        !value && (<button onClick={createCounter}>Create Counter</button>)
                    }
                    {
                        value && <button onClick={increment}>Increment Counter</button>
                    }
                    {
                        value && value >= Number(0) ? (
                            <h2>{value}</h2>
                        ) : (
                            <h3>Please Create The Counter.</h3>
                        )
                    }
                </div>
            </div>
        );
    }
}
        const AppWithProvider = () => (
            <ConnectionProvider endpoint="http://127.0.0.1:8899">
              <WalletProvider wallets={wallets} autoConnect>
               <WalletModalProvider>
                   <App />
               </WalletModalProvider>
              </WalletProvider>
            </ConnectionProvider>
        )
 export default AppWithProvider;