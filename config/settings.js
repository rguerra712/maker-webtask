(function(){
    
    const appendQuery = require('append-query');

    let settings = {};

    if (process.env.MAKER_WEBTASK_URL){
        settings.makerWebtaskUrl = process.env.MAKER_WEBTASK_URL; 
    }

    if (process.env.WEBTASK_SECRET){
        settings.webtaskSecret = process.env.WEBTASK_SECRET; 
    }

    settings.isSupported = settings.makerWebtaskUrl && settings.webtaskSecret;
    if (settings.isSupported) {
        settings.webtaskUrlWithKey = appendQuery(settings.makerWebtaskUrl, 'secret=' + settings.webtaskSecret);
    }
    exports.makerSettings = {
        webtaskUrlWithKey: settings.webtaskUrlWithKey,
        isSupported: settings.isSupported
    };

})();