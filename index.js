(function(){
    'use strict';

    const unirest = require('unirest');
    const cron = require('cron');
    const settings = require('./config/settings.js');

    exports.run = (device, pollingInterval) => {
        return new Promise((resolve, reject) => {
            if (!pollingInterval){
                pollingInterval = 5;
            }
            if (settings.makerSettings.isSupported) {
                let onError = error => reject(error);
                var cronJob = cron.job(`*/${pollingInterval} * * * * *`, 
                    () => checkWebtaskQueueFor(device,
                            message => checkWebtaskQueueFor(device, resolve, onError), // on successfult peek, no peek
                            onError,
                            '&peek=1') // peek first
                );
                cronJob.start();
            }
        });
    };

    function checkWebtaskQueueFor(deviceToListenFor, actionOnFound, actionOnFailure, appendedQueryString){
        if (!appendedQueryString){
            appendedQueryString = '';
        }
        let webtaskUrl = settings.makerSettings.webtaskUrlWithKey;
        unirest.get(webtaskUrl + appendedQueryString)
            .end(response => {
                if (response.status === 200){
                    let message = response.body;
                    if (message.device === deviceToListenFor) {
                        actionOnFound(message);
                    }
                } else {
                    actionOnFailure('Webtask called failed with status ' + response.status);
                }
            });
    }

})();