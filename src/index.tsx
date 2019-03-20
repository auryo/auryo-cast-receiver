import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import { CastContextInterface, CastContextProvider } from './castContext';
import './index.css';
import * as serviceWorker from './serviceWorker';

const castContext: CastContextInterface = {
    castReceiverContext: cast.framework.CastReceiverContext.getInstance()
}

/**
 * Application config
 **/
const appConfig = new cast.framework.CastReceiverOptions();

/**
 * Text that represents the application status. It should meet
 * internationalization rules as may be displayed by the sender application.
 * @type {string|undefined}
 **/
appConfig.statusText = 'Ready to play';

/**
 * Maximum time in seconds before closing an idle
 * sender connection. Setting this value enables a heartbeat message to keep
 * the connection alive. Used to detect unresponsive senders faster than
 * typical TCP timeouts. The minimum value is 5 seconds, there is no upper
 * bound enforced but practically it's minutes before platform TCP timeouts
 * come into play. Default value is 10 seconds.
 * @type {number|undefined}
 **/
if (process.env.NODE_ENV !== "development") {
    appConfig.maxInactivity = 6000;
}

/**
 * Initializes the system manager. The application should call this method when
 * it is ready to start receiving messages, typically after registering
 * to listen for the events it is interested on.
 */
castContext.castReceiverContext.start(appConfig);

ReactDOM.render(
    <CastContextProvider value={castContext}>
        <App />
    </CastContextProvider>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
