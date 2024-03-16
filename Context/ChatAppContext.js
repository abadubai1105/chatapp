import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";


//Internal import

import { 
    CheckIfWalletConnected, 
    ConnectWallet, 
    connectingWithContract  
} from "../Utils/apiFeature";


export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({children}) => {
    //useState
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [friendLists, setFriendLists] = useState([]);
    const [friendMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState("false");
    const [userLists, setUserLists] = useState([]);
    const [error, setError] = useState("");
    
    //char user data
    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("");

    const router = useRouter();


    //Fetch data time of page load
    const fetchData = async() => {
        try{
            //get contract
            const contract = await connectingWithContract();

            //get account
            const connectAccount = await ConnectWallet();
            setAccount(connectAccount);
            //get user name
            const userName = await contract.getUsername(connectAccount);
            setUserName(userName);
            //get my friend list
            const friendLists = await contract.getMyFriendList();
            setFriendLists[friendLists];
            //get all app user list
            const userLists = await contract.getAllAppUser();
            setUserLists(userLists);
             

        } catch(error){
            setError("Please Install And Connect Your Wallet");
        }
    };

    useEffect (()=>{
        fetchData();
    }, []);

    //read msg
    const readMessage = async(friendAddress) => {
        try{
            const contract = await connectingWithContract();
            const read = await contract.readMessage(friendAddress);
            setFriendMsg(read);
        } catch(error){
            setError("Currently You Have no Message")
        }
    }

    //create account
    const createAccount = async({name, accountAddress})=>{
        try {
            if(name || accountAddress)
                return setError("Name and AccountAddress, cannot be empty")

            const contract = await connectingWithContract();
            const getCreatedUser = await contract.createAccount(name);
            setLoading(true);
            await getCreatedUser.wait();
            setLoading(false);
            window.location.reload();  
        } catch (error) {
            setError("Error while creating your account. Please reload browser")
        }
    }
    //add ur friends
    const addFriends = async({name, accountAddress}) =>{
        try {
            if(name || accountAddress) return setError("Please provide account")

            const contract = await connectingWithContract();
            const addMyFriend = await contract.addFriend(accountAddress, name);
            setLoading(true)
            await addMyFriend.wait();
            setLoading(false);
            router.push("/");
            window.location.reload();
        } catch (error) {
            setError("Something went wrong while adding friends, try again")
        }
    }

    //send message to friend
    const sendMessage = async({msg, address}) =>{
        try {
            const contract = await connectingWithContract();
            const addMessage = await contract.sendMessage(address, msg)
            setLoading(true)
            await addMessage.wait()
            setLoading(false)
            window.location.reload() 
        } catch (error) {
            setError("Please reload and try again")
        }
    }

    //read info

    const readUser = async(userAddress) =>{
        const contract = await connectingWithContract();
        const userName = await contract.getUsername(userAddress);
        setCurrentUserName(userName);
        setCurrentUserAddress(userAddress); 
    }
    return (
        <ChatAppContext.Provider value ={{
            readMessage, 
            createAccount, 
            addFriends, 
            sendMessage, 
            readUser,
            ConnectWallet,
            CheckIfWalletConnected,  
            account, 
            userName,
            friendLists,
            friendMsg,
            userLists,
            loading,
            error,
            currentUserName,
            currentUserAddress,
            }} >
            {children}
        </ChatAppContext.Provider>
    )
}