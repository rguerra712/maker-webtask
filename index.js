(function(){
    'use strict';

    const unirest = require('unirest');
    const cron = require('cron');

    exports.run = (webtaskUrl, deviceToListenFor, action) => {
        if (webtaskUrl) {
            var cronJob = cron.job('*/5 * * * * *', 
                () => {
                    unirest.get(webtaskUrl + '&peek=1') // peek first to not consume others
                    .end(response => {
                        if (response.status === 200){
                            let message = response.body;
                            if (message.device === deviceToListenFor) {
                                unirest.get(webtaskUrl)
                                .end(response => {
                                    if (response.status === 200){
                                        let message = response.body;
                                        if (message.device === deviceToListenFor) {
                                            action(message);
                                        }
                                    }
                                });
                            }
                        }
                    });
            });
            cronJob.start();
        }
    };

    
})();