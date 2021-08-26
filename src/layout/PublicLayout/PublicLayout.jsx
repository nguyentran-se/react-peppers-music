import React, { useEffect, useRef, useState } from "react";
import Sidebar from "common/Navigation/Sidebar/Sidebar";
import Header from "common/Header/Header";
import Player from "common/PLayer/Player";
import "./PublicLayout.scss";
import Queue from "common/Queue/Queue";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "selectors";
import userApi from "api/userApi";
import { useCallback } from "react";
const PublicLayout = (props) => {
   const [toggleQueue, setToogleQueue] = useState(false);
   const [navPlaylists, setNavPlaylists] = useState();

   const layoutRightRef = useRef(null);
   const headerRef = useRef(null);

   const isLoggedIn = useSelector(selectIsLoggedIn);

   //scroll then justify header style
   useEffect(() => {
      const layoutRight = layoutRightRef.current;
      const onscrollHandler = () => {
         const positionScroll = layoutRight.scrollTop;
         if (headerRef) {
            if (positionScroll === 0) {
               headerRef.current.style.boxShadow = "none";
               headerRef.current.style.backgroundColor = "transparent";
            } else {
               headerRef.current.style.boxShadow =
                  "0 3px 5px rgba(0, 0, 0, 0.1)";
               headerRef.current.style.backgroundColor = "inherit";
            }
         }
      };
      layoutRight.addEventListener("scroll", onscrollHandler);
      return () => {
         layoutRight.removeEventListener("scroll", onscrollHandler);
      };
   }, []);

   // get playlists render to sidebar
   useEffect(() => {
      const requestGetUserPlaylists = async () => {
         const { items } = await userApi.getUserPlaylists();
         const updatedNavPlaylists = items.map(({ id, name }) => ({
            title: name,
            link: `/playlist/${id}`,
         }));
         setNavPlaylists(updatedNavPlaylists);
      };
      if (isLoggedIn) {
         requestGetUserPlaylists();
      }
   }, [isLoggedIn]);

   const clickedHandler = useCallback(() => {
      setToogleQueue((prevOpen) => !prevOpen);
   }, []);

   return (
      <div className="layout">
         <div className="layout-wrapper">
            <div className="layout-left">
               <Sidebar navPlaylists={navPlaylists} />
            </div>
            <div className="layout-right" ref={layoutRightRef}>
               <Header headerRef={headerRef} />
               <main>{props.children}</main>
               <Queue toggleQueue={toggleQueue} />
            </div>
         </div>
         <Player clicked={clickedHandler} toggleQueue={toggleQueue} />
      </div>
   );
};

export default PublicLayout;
