# maker-webtask
Consume message between IFFT (Maker) and other webtask-queue consumers

# Setup
1. Follow the ![steps to setup a webtask queue](https://github.com/rguerra712/webtask-queue/)
1. Setup your IFTTT Channel to listen for maker commands at the queue output above. You will want it to POST a body similar to the below:
```
{
    "device": "<NAME OF DEVICE TO LISTEN FOR>",
    "command": "<SPECIFIC DETAILS TO REACT UPON>"
}
```
1. Set an environment variable for the webtask queue above
  1. Set the environment variable `MAKER_WEBTASK_URL` giving it the above url
  1. Set the environment variable `WEBTASK_SECRET` giving it the secret used in the step above
1. Add the package as an NPM package reacting to these commands
```
var makerWebtask = require('maker-webtask');
var webtaskUrl = ...; // The url from the first step above
function turnOnLight(message) {
  if (message.command === 'on') {
    // Turn light on
  }
}
var pollingInterval = 5; // Check the queue every 5 seconds due to quotas
makerWebtask.run('lightbulb', pollingInterval)
    .then(turnOnLight);
```
With the above example, when Maker calls the above URL with the following body:
```
{
    "device": "lightbulb",
    "command": "on"
}
```
The light will turn on.
