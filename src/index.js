import util from 'util';
import Ext from './twitch-ext';
import Client from './state-client';

export default class MuxyExtensionsSDK {
    constructor(extensionID) {
        this.extensionID = extensionID;

        if (util.inIframe()) {
            console.log('running in iframe');
        }
        else {
            console.log('running as top level');
        }

        if (document.referrer.includes('twitch.tv')) { // https://www.twitch.tv/bux0
            console.log('Running on twitch.tv');
        }

        if (location.hostname.includes('.ext-twitch.tv')) { // ka3y28rrgh2f533mxt9ml37fv6zb8k.ext-twitch.tv
            console.log('Loaded from twitch CDN');
        }
        else  {

        }

        Ext.onAuthorized(this.onAuthorized);
        Ext.onContext(this.onContext);
    }

    onAuthorized(auth) {
        if (!auth) {
            return;
        }

        if (this.client) {
            this.client.updateAuth(auth.token);
        }
        else {
            this.client = new Client(this.extensionID, auth.token.auth.channelId);
        }
    }

    onContext(context) {

    }

    /**
     * Listen for events from MuxyStore
     * @param type Event type to listen for. (Accumulate, Vote, Rank, Store)
     */
    listen(type) {

    }


}