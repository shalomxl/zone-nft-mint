import React from 'react';
import ReactDOM from 'react-dom/client';
import {ethers} from 'ethers';
import './index.css';
import abi from './abi/abi.json';
const abiInterface = new ethers.utils.Interface(abi);

const ethereum = window.ethereum;
const contractAddress = '0xd8d638be21b4101e1858de84d4540aed2d02674d';

ethereum.on('chainChanged', (_chainId) => window.location.reload());

class Mint extends React.Component {
    async handleMintClick() {
        const data = abiInterface.encodeFunctionData('rewardToken', [
            "0xBCcC2073ADfC46421308f62cfD9868dF00D339a8",
            "https://img.seadn.io/files/40dd9773f0af35eff0873817eb1bcf08.png?fit=max&w=600"
        ])

        const transactionParameters = {
            to: contractAddress, // Required except during contract publications.
            from: ethereum.selectedAddress, // must match user's active address.
            data: data,
        };

        // txHash is a hex string
        // As with any RPC call, it may throw an error
        const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });

        console.log('txHash: ',txHash);
    };
    async handleConnectClick() {
        await ethereum.request({ method: 'eth_requestAccounts' });
    };

    render() {
        if (typeof ethereum === 'undefined') {
            window.alert("Please install Metamask!");
        }

        return (
            <div>
                <button onClick={() => this.handleMintClick()}>Mint</button>
                <button onClick={() => this.handleConnectClick()}>Connect</button>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Mint />
);


