import React from 'react';
import styles from './Player.module.scss';
import { MediaInformation, MusicTrackMediaMetadata } from 'chromecast-caf-receiver/cast.framework.messages';
import { getReadableTime } from '../utils/getReadableTime';
import logo from "../assets/img/auryo-tray.png";
import { NextUp, NextTrackData } from '../NextUp/NextUp';
import NanoClamp from "nanoclamp";

interface Props {
  mediaInfo: MediaInformation;
  currentTime: number;
  paused: boolean;
}

interface CustomData {
  nextTrack?: NextTrackData
}

export const Player: React.FunctionComponent<Props> = ({ mediaInfo, currentTime, paused }) => {

  if (!mediaInfo.metadata) {
    return null;
  }

  const metadata: MusicTrackMediaMetadata = mediaInfo.metadata as MusicTrackMediaMetadata;
  const customData: CustomData | undefined = mediaInfo.customData;

  const smallImage = metadata.images[0].url;
  const largeImage = metadata.images[1].url;

  const progress = (currentTime / (mediaInfo.duration || 0)) * 100;

  return (
    <div className={styles.Player}>
      <div className={styles.background} style={{ backgroundImage: `url("${smallImage}")` }}></div>
      <div className={styles.foreground}>
        <div className={styles.header}>

          <div><img className={styles.logo} src={logo} /></div>
          <div>
            <NextUp nextTrack={customData ? customData.nextTrack : undefined} />
          </div>
        </div>
        <div className={styles.trackImage}>
          <div className={`${styles.pauseIconWrapper} ${paused ? styles.visible : ''}`}><i className="icon-pause" /></div>
          <img src={largeImage} />
        </div>
        <div className={styles.right}>
          <div className={styles.trackInfo}>
            <div className={styles.trackArtist}>{metadata.artist}</div>
            <NanoClamp
              className={styles.trackTitle}
              key={metadata.title}
              is="div"
              lines={2}
              text={metadata.title}
            />
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progress} style={{ width: `${!isNaN(progress) && progress > 0 ? progress : 0}%` }} />
          </div>
          <div className={styles.time}>
            <div>{getReadableTime(currentTime, false, true)}</div>
            <div>{getReadableTime((mediaInfo.duration || 0), false, true)}</div>
          </div>
        </div>
      </div>
    </div>
  )
};
