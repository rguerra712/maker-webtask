# maker-webtask
Consume message between IFFT (Maker) and other webtask-queue consumers

# Setup
1. Follow the ![steps to setup a webtask queue](https://github.com/rguerra712/webtask-queue/)
1. Setup your IFTTT Channel to listen for maker commands at the queue output above. You will want it to POST a body similar to the below:
```
{
    "deviceName": "<NAME TO LISTEN FOR>",
    "command": "<SPECIFIC DETAILS TO REACT UPON>"
}
```
1. Add the package as an NPM package reacting to these commands
```
var makerWebtask = require('maker-webtask');
var webtaskUrl = ...; // The url from the first step above
function turnOnLight(message) {
  if (message.command === 'on') {
    // Turn light on
  }
};
makerWebtask.run(webtaskUrl, 'lightbulb', turnLightOn);
```
With the above example, when Maker calls the above URL with the following body:
```
{
    "deviceName": "lightbulb",
    "command": "on"
}
```
The light will turn on.
