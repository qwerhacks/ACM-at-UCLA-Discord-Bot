# QWERHacksBot
made with love and gay panic ♡
## introduction
hey hi hello! this is the repo for the qwer hacks welcome bot. this is going to be used at [qwer hacks 2021](qwerhacks.com) to welcome members to our discord server and allow them to set their screen name + pronouns as well as get verified as registered hackers who have shown up to our event on the day of!

## setup
(not that all these instructions are for local deployments. heroku / remote deployment? don't know her. yet.)

start by cloning this repo to your local computer.
### installation
make sure you have relatively recent version of node.js + npm installed. for reference, sharvani is using the following versions:
`node: v15.5.1 `

`npm: 7.3.0`

it's important to use recent versions for these because the discord package code does NOT work with older versions.

package management (aka tracking of our dependencies, ease of installing everything) should be set up now (i hope?), so just try to run `npm install` to get everything you need locally installed. don't commit any of these additions (aka any node_modules folders that get created) to the repo for the sake of repo cleanliness (as far as i know....open to discussion here!)

## deployment (as of right now, local only) 
first, add your bot token in the last line of main.js (you can find the token in the discord developer portal page for your bot application under "CLIENT SECRET").
for example, if your bot token is "12345ABC", the line should read client.login("12345ABC");

run `node main.js`

you'll know the code ran successfully if the code doesn't immediately error out, and the bot appears to be online (for longer than a couple minutes) within the qwer hacks server.

additionally, in the terminal the bot will print out 
`Logged in as QWER Hacks Welcome Bot#7201!` if everything re: setup goes okay.
