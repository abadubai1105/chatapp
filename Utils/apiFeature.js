import {ethers} from "ethers";
import Web3Modal from "web3modal";
import { ChatAppAddress, ChatAppABI } from "../Context/constants";

export const CheckIfWalletConnected = async() =>{
    try{
        if(!window.ethereum) return console.log("Install MetaMask");

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        const firstAccount = accounts[0];
        return firstAccount;
    } catch(error) {
        console.log("Error");
    }
};


export const ConnectWallet = async () =>{
    try{
        if(!window.ethereum) return console.log("Install MetaMask");

        const accounts = await window.ethereum.request({
            method: "eth_requestAccount",
        });
         
        const firstAccount = accounts[0];
        return firstAccount;
    } catch(error) {
        console.log("Error");
    }
};

const fetchContract = (singerOrProvider) =>
    new ethers.Contract(ChatAppABI, ChatAppAddress, singerOrProvider);


export const connectingWithContract = async () => {
    try{
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.provider.Web3Provider(connection);
        const singer = provider.gerSinger();
        const contract = fetchContract(singer);

        return contract; 
    } catch (error){
        console.log("Error");

    }
}

export const convertTime = (time)=>{
    const newTime = new Date(time.toNumber());

    const realTime = newTime.getHours() + 
    "/"+
    newTime.getMinutes() +
    "/" +
    newTime.getSeconds()+
    "/" +
    newTime.getDate() +
    "/" +
    (newTime.getMonth() + 1) + 
    "/" +
    newTime.getFullYear();

    return realTime;
};