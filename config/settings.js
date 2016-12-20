(function(){
    
    const commandLineArgs = require('command-line-args');
    const appendQuery = require('append-query');
    const optionDefinitions = [
        { name: 'makerwebtaskurl', alias: 'w', type: String },
        { name: 'webtasksecret', alias: 's', type: String },
    ];
    const options = commandLineArgs(optionDefinitions);

    let settings = {};

    settings.makerWebtaskUrl = options.makerwebtaskurl;
    settings.webtaskSecret = options.webtasksecret;

    if (!settings.makerWebtaskUrl && process.env.MAKER_WEBTASK_URL){
        settings.makerWebtaskUrl = process.env.MAKER_WEBTASK_URL; 
    }

    if (!settings.webtaskSecret && process.env.MAKER_WEBTASK_URL){
        settings.webtaskSecret = process.env.MAKER_WEBTASK_URL; 
    }

    let webtaskUrlWithKey = appendQuery(settings.makerWebtaskUrl, settings.webtaskSecret);
    exports.makerSettings = {
        webtaskUrlWithKey: webtaskUrlWithKey
    };

})();