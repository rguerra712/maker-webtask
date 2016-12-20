(function(){
    'use strict';

    const unirest = require('unirest');
    const cron = require('cron');
    const settings = require('./config/settings.js');

    let webtaskUrl = settings.makerSettings.webtaskUrlWithKey;

    exports.run = (device, action, pollingInterval) => {
        if (!pollingInterval){
            pollingInterval = 5;
        }
        if (webtaskUrl) {
            var cronJob = cron.job(`*/${pollingInterval} * * * * *`, 
                () => checkWebtaskQueueFor(device,
                        message => checkWebtaskQueueFor(device, action), // on successfult peek, no peek 
                        '&peek=1') // peek first
            );
            cronJob.start();
        }
    };

    function checkWebtaskQueueFor(deviceToListenFor, actionOnFound, appendedQueryString){
        if (!appendedQueryString){
            appendedQueryString = '';
        }
        unirest.get(webtaskUrl + appendedQueryString)
            .end(response => {
                if (response.status === 200){
                    let message = response.body;
                    if (message.device === deviceToListenFor) {
                        actionOnFound(message);
                    }
                }
            });
    }

})();