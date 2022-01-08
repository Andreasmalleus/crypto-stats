import React from "react";
import styles from "../styles/navbar.module.scss";
import { GlobalStats } from "./GlobalStats";

export const NavBar: React.FC = () => {
  return (
    <div>
      <GlobalStats />
      <header className={styles.header}>
        <div className={styles.left}>
          <div className={styles.title}>CryptoMarketStats</div>
          <div className={styles.options}>
            <div>Cyptocurrencies</div>
            <div>Exchanges</div>
            <div>Favorites</div>
          </div>
        </div>
        <div className={styles.right}>
          <button className={styles.loginButton}>Log in</button>
          <button className={styles.signupButton}>Sign up</button>
          <input className={styles.searchButton} placeholder="Search" />
        </div>
      </header>
    </div>
  );
};
