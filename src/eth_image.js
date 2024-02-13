import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

function EthImageDisplay() {
  // State hooks to store image hashes
  const [imageHash1, setImageHash1] = useState('');
  const [imageHash2, setImageHash2] = useState('');

  useEffect(() => {
    // This code will run when the component mounts

    // Initialize web3 and connect to the blockchain
    const web3 = new Web3(Web3.givenProvider || 'https://sepolia.infura.io/v3/c52c88b513814deb93e4ecd8f3fe8d24');
    const contractABI =  [
        {
          "inputs": [],
          "name": "imageHash1",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [],
          "name": "imageHash2",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_imageHash1",
              "type": "string"
            }
          ],
          "name": "setImageHash1",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_imageHash2",
              "type": "string"
            }
          ],
          "name": "setImageHash2",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]; // Your contract's ABI
    const contractAddress = '0x4027102668986091033687F7AEb0d8BfdFDD2982'; // Your contract's address

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Define functions to fetch hashes from the contract
    const getImageHashes = async () => {
      const imageHash1FromContract = await contract.methods.imageHash1().call();
      const imageHash2FromContract = await contract.methods.imageHash2().call();
      
      setImageHash1(imageHash1FromContract);
      setImageHash2(imageHash2FromContract);
    };

    // Call the function to fetch hashes
    getImageHashes();
  }, []);

  // Render the images using the hashes
  return (
    <div>
      {imageHash1 && <img src={`https://ipfs.infura.io/ipfs/${imageHash1}`} alt="Image 1" />}
      {imageHash2 && <img src={`https://ipfs.infura.io/ipfs/${imageHash2}`} alt="Image 2" />}
    </div>
  );
}

export default EthImageDisplay;
