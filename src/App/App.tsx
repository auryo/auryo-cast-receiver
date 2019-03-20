import React, { Component, RefObject } from 'react';
import styles from './App.module.scss';
import { withCastContext, WithCastContext } from '../castContext';
import { Splash } from '../Splash/Splash';
import Spinner from '../Spinner/Spinner';
import { RequestEvent } from 'chromecast-caf-receiver/cast.framework.events';
import { LoadRequestData, MediaInformation } from 'chromecast-caf-receiver/cast.framework.messages';
import { Player } from '../Player/Player';

interface AppProps extends WithCastContext {

}

interface AppState {
  splash: boolean;
  loading: boolean;
  mediaInfo?: MediaInformation;

  currentTime: number;
}

class App extends Component<AppProps, AppState> {

  public readonly state: AppState = {
    splash: true,
    loading: false,
    currentTime: 0
  }

  audio: RefObject<HTMLAudioElement> = React.createRef();
  private listenTracker: NodeJS.Timer | null = null;

  componentDidMount() {
    const { castContext } = this.props;

    if (castContext) {
      castContext.castReceiverContext.addEventListener('VISIBILITY_CHANGED', (event) => {
        const visibility = castContext.castReceiverContext.getVisibilityState();

        console.log("VISIBILITY_CHANGED", visibility);

        // if (event.data) { // It is visible
        //   window.mediaElement.play(); // Resume media playback
        //   window.clearTimeout(window.timeout); // Turn off the timeout
        //   window.timeout = null;
        // } else {
        //   window.mediaElement.pause(); // Pause playback
        //   window.timeout = window.setTimeout(function () { window.close(); }, 10000); // 10 Minute timeout
        // }
      })

      document.addEventListener('webkitvisibilitychange', () => {
        const visibility = castContext.castReceiverContext.getVisibilityState();

        console.log("webkitvisibilitychange", visibility);

      });

      castContext.castReceiverContext.getPlayerManager().setMediaElement(this.audio.current)

      castContext.castReceiverContext.getPlayerManager().addEventListener('REQUEST_LOAD', (event: RequestEvent) => {
        if (event.requestData && (event.requestData as LoadRequestData).media) {
          this.setState({
            mediaInfo: (event.requestData as LoadRequestData).media
          })
        }

        this.setState({
          splash: false,
          loading: true
        })
      })

      castContext.castReceiverContext.getPlayerManager().addEventListener('LOADED_DATA', (event) => {
        this.setState({
          splash: false,
          loading: false
        })
      })

      if (this.audio.current) {

        // Get currentTime 
        this.audio.current.addEventListener('play', (e) => {
          if (!this.listenTracker) {
            this.getTime();
            this.listenTracker = setInterval(() => {
              this.getTime();
            }, 900);
          }
        });
      }

    }
  }

  private getTime() {
    if (this.audio.current && this.props.castContext) {
      this.setState({
        currentTime: this.props.castContext.castReceiverContext.getPlayerManager().getCurrentTimeSec()
      })
    }
  }

  render() {
    return (
      <div className={styles.App}>
        {
          this.state.splash && <Splash />
        }
        {
          !this.state.mediaInfo && this.state.loading && <Spinner />
        }
        <audio ref={this.audio} autoPlay></audio>

        {
          this.state.mediaInfo && (
            <Player
              mediaInfo={this.state.mediaInfo}
              currentTime={this.state.currentTime}
            />
          )
        }
      </div>
    );
  }
}

export default withCastContext(App);
