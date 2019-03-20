import React from 'react';
import styles from './Splash.module.scss';
import logo from "../assets/img/auryo-dark.png"
import { strings } from '../localization';

interface Props {

}
export const Splash: React.FunctionComponent<Props> = () => (
  <div className={styles.Splash}>
    <div>
      <img src={logo} />
      <div className={styles.bottomMessage}>
        <div className={styles.iconWrapper}>
          <i className="icon icon-cast"></i>
        </div>
        {strings["chromecast.ready"]}
      </div>
    </div>
  </div>
);
