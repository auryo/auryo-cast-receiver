import * as React from 'react';
import styles from './NextUp.module.scss';
import { strings } from '../localization';
import NanoClamp from 'nanoclamp';

export interface NextTrackData {
    title: string;
    artist: string;
    images: {
        url: string
    }[]
}

interface Props {
    nextTrack?: NextTrackData;
}


export const NextUp = React.memo<Props>(({ nextTrack }) => {
    if (!nextTrack) {
        return null;
    }

    const smallImage = nextTrack.images[0].url;
    const largeImage = nextTrack.images[1].url;

    // Preload large image
    const img = new Image();
    img.src = largeImage;

    return (
        <div>
            <div className={styles.nextUpText}>{strings["track.nextup"]} <i className="icon-skip-forward" /></div>
            <div className={styles.nextUp}>
                <div className={styles.imgWrapper}><img src={smallImage} /></div>
                <div className={styles.trackInfo}>
                    <NanoClamp
                        className={styles.trackTitle}
                        key={nextTrack.title}
                        is="div"
                        lines={1}
                        text={nextTrack.title}
                    />
                    <div className={styles.trackArtist}>{nextTrack.artist}</div>
                </div>
            </div>
        </div>
    )
});