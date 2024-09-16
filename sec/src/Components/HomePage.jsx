import React from 'react';
import Footer from './Footer';
import styles from "../Styles/Style.module.css";
import AboutUs from './AboutUs';

const Home = () => {
    return (
        <>
        <div className={styles.back}>
            
            </div>
        <div> <AboutUs/></div>
        <div><Footer/></div>
        </>
    );
};

export default Home;
