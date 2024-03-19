import React, { useEffect, useContext, useState, isValidElement } from "react";
import Image from "next/image";
import Link from "next/link";

// Internal Import
import Style from "./NavBar.module.css";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Model, Error } from "../index";
import images from "../../assets";
import { useStyleRegistry } from "styled-jsx";

const NavBar = () => {
  const navLinks = [
    {
      id: 1,
      label: "All Users",
      link: "alluser",
    },
    {
      id: 2,
      label: "Chat",
      link: "/",
    },
    {
      id: 3,
      label: "Setting",
      link: "/",
    },
    {
      id: 4,
      label: "Contact",
      link: "/ ",
    },
    {
      id: 5,
      label: "FAQS",
      link: "/",
    },
    {
      id: 6,
      label: "Terms of Use",
      link: "/",
    },
  ];
  //Use state
  const [activeNavLinkItem, setActive] = useState(navLinks[0].id);
  const [openMobileMenu, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { account, userName, connectWallet } = useContext(ChatAppContext);
  return (
    <>
      <nav className={Style.navbar}>
        <div className={Style.navbar_left}>
          <div className={Style.navbar_logo_wrapper}>
            <Image src={images.logo} alt="logo" width={50} height={50} />
          </div>
          <div className={Style.navbar_appTitle}>Chat App</div>
        </div>

        {/* Mobile Navbar Toggle */}
        <div
          onClick={() => setOpen(!openMobileMenu)}
          className={Style.navbar_toggle}
        >
          <Image
            src={images.open}
            alt="navbar toggle"
            width={50}
            height={50}
          ></Image>
        </div>

        {/* Desktop Navbar */}
        <ul className={Style.navbar_links}>
          {navLinks.map((item, i) => (
            <li
              onClick={() => setActive(item.id)}
              className={`${Style.navbar_links_item} ${
                activeNavLinkItem === item.id
                  ? Style.active_navbar_links_item
                  : ""
              }`}
              key={item.id}
            >
              <Link href={item.link}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Mobile menu */}
      {openMobileMenu && (
        <div className={Style.mobile_menu}>
          {navLinks.map((item, i) => (
            <li
              onClick={() => setActive(item.id)}
              key={item.id}
              className={`${Style.mobile_menu_item} ${
                activeNavLinkItem == item.id
                  ? Style.active_mobile_menu_item
                  : ""
              }`}
            >
              <Link href={item.link}>{item.label}</Link>
            </li>
          ))}
          <p className={Style.mobile_menu}>
            <Image
              src={images.close}
              alt="close"
              width={50}
              height={50}
              onClick={() => setOpen(false)}
            />
          </p>
        </div>
      )}
    </>

    //     {/* MOBILE */}
    //     {open && (
    //       <div className={Style.mobile_menu} >
    //       {menuItems.map((el, i) =>(
    //         <div
    //         onClick={()=> setActive(i + 1)}
    //         key = { 1 + 1 }
    //         className ={`${Style.mobile_menu_items} ${active == i + 1 ? Style.active_btn :""}`}
    //         >
    //           <Link className={Style.mobile_menu_items_link }
    //           href={el.link}
    //           >
    //              {el.menu}
    //           </Link>
    //         </div>
    //       ))}
    //       <p className={Style.mobile_menu.btn}>
    //         <Image
    //         src={images.close}
    //         alt="close"
    //         width={50}
    //         height={50}
    //         onClick={() => setOpen(false)}
    //         />
    //       </p>
    //     </div>
    //     )}

    //     {/* CONNECT WALLET */}
    //     <div className={Style.NavBar_box_right_connect}>
    //       {account == "" ?(
    //         <button onClick={()=> connectWallet()}>
    //           {""}
    //           <span>Connect Wallet</span>
    //         </button>
    //       ) : (
    //         <button onClick={()=> setOpenModel(true)}>
    //           {''}
    //           <Image
    //           src = {userName ? images.accountName : images.create2}
    //           alt="Account image"
    //           width = {20}
    //           hight = {20}
    //           />
    //           {''}
    //           <small>{userName || "Create Account"}</small>
    //         </button>
    //       )}
    //     </div>

    //     <div
    //       className={Style.NavBar_box_right_open}
    //       onClick={() => setOpen(true)}
    //     >
    //       <Image src ={images.open} alt="open" width={30} height={30} />
    //     </div>
    //    </div>
    //   </div>
    // </div>
  );
};

export default NavBar;
