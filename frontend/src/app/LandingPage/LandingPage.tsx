'use client';
import styles from './LandingPage.module.css';
//import { ButtonOutlineSm } from './ButtonOutlineSm';
//import { PropertyDefault } from './PropertyDefault';
import vector from './vector.svg';
import Image from 'next/image';

export const LandingPage = () => {
  return (
    <div className={styles['landing-page']}>
      <div className={styles['overlap-group']}>
        <div className={styles['cover']} />
        <div className={styles['sign-up-today']}>SIGN UP TODAY</div>
        <div className={styles['or']}>OR</div>
        <div className={styles['login']}>LOGIN</div>
        <p className={styles['track-players-stats']}>
          TRACK PLAYERS STATS
          <br />
          IN LOCAL LEAGUES
        </p>
        <div className={styles['sync']}>Sync</div>
        <div className={styles['score']}>Score</div>
      </div>

      <div className={styles['navbar']}>
        <div className={styles['logo']}>ScoreSync</div>
        <div className={styles['nav-links']}>
          <div>Home</div>
          <div>About us</div>
          <div className={styles['services']}>
            <span>Services</span>
            <Image src={vector} alt="dropdown" className={styles['vector']} />
          </div>
          <div>Testimonials</div>
        </div>
        
        <div className={styles['buttons']}>
            
          
            className={styles['button-fill-rounded']}
            divClassName={styles['property-1-default']}
            text="Register"
         
          
            className={styles['button-outline-sm-instance']}
            divClassName={styles['design-component-instance-node']}
            text="Sign in"
            
          
        </div>
        
      </div>
    </div>
  );
};
