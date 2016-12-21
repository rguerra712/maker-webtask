(function(){
    
    const appendQuery = require('append-query');

    let settings = {};

    if (process.env.MAKER_WEBTASK_URL){
        settings.makerWebtaskUrl = process.env.MAKER_WEBTASK_URL; 
    } else {
        throw new Error('MAKER_WEBTASK_URL environment variable is required to be set');
    }

    if (process.env.WEBTASK_SECRET){
        settings.webtaskSecret = process.env.WEBTASK_SECRET; 
    } else {
        throw new Error('WEBTASK_SECRET environment variable is required to be set');
    }

    let webtaskUrlWithKey = appendQuery(settings.makerWebtaskUrl, 'secret=' + settings.webtaskSecret);
    exports.makerSettings = {
        webtaskUrlWithKey: webtaskUrlWithKey
    };

})();