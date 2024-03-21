import React, { useContext } from "react";
import { UserCard } from "../Components";
import Style from  "../styles/alluser.module.css";
import { ChatAppContext } from "../Context/ChatAppContext";
import 'bootstrap/dist/css/bootstrap.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';

const alluser = () => {

  const { userLists, addFriends } = useContext(ChatAppContext);

  return (<div className={Style.all}>
            <div class="input-group flex-nowrap">
              <div className={Style.alluser_info}>
                <h1> List Friends </h1>
              </div>
              <div className={Style.search}>
                <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping"/>
                <button type="button" class="btn btn-outline-dark"><span>Search</span><i class="bi bi-search"></i></button>
              </div>
            </div>
            <div className={Style.alluser}>
              {userLists.map((el, i)=>
                <UserCard key ={i+1} el={el} i = {i} addFriends = {addFriends}/>)}            
            </div>
          </div>
  )
};

export default alluser;
