# QWERHacksBot
made with love and gay panic ♡
## introduction
hey hi hello! this is the repo for the qwer hacks welcome bot. this is going to be used at [qwer hacks 2021](https://www.qwerhacks.com/) to welcome members to our discord server and allow them to set their screen name + pronouns as well as get verified as registered hackers who have shown up to our event on the day of!

## behavior
When a new user joins the server, the bot will send them a direct message prompting them for their email, name, and pronouns in the following format: 

`!iam <email> <name> <pronouns>`

example: !iam joe@g.ucla.edu Joe Bruin he/him

If the user responds with a properly formatted command, the bot checks whether the user's email is a valid hacker or collaborator email. If so, it assigns them the correct role ('hacker' or 'collaborator') that will allow them to access channels on the QWERHacks server. Finally, the bot adds the user's pronouns to the end of their discord nickname (display name).

## setup
(note that all these instructions are for local deployments.) start by cloning this repo to your local computer.

### installation
make sure you have relatively recent version of node.js + npm installed. for reference, sharvani is using the following versions:
`node: v15.5.1 `

`npm: 7.3.0`

it's important to use recent versions for these because the discord package code does NOT work with older versions.

package management (aka tracking of our dependencies, ease of installing everything) should be set up now (i hope?), so just try to run `npm install` to get everything you need locally installed. don't commit any of these additions (aka any node_modules folders that get created) to the repo for the sake of repo cleanliness (as far as i know....open to discussion here!)

### customization
this section provides instructions for customizing the bot for a different discord server.

#### bot token
first, find your bot token in the [discord developer portal](https://discord.com/developers/applications) (go to (your application name) > bot > and then click the copy button under "TOKEN"). then, add your bot token in the last line of `main.js`. for example, if your bot token is "12345ABC", the line should read `client.login("12345ABC");`

#### csv files
the bot requires two csv files be placed in the same directory as `main.js`: `hacker_emails.csv` (containing only hacker emails) and `collaborator_emails.csv` (containing only collaborator emails). these files can be empty—as long as they are in the same directory as `main.js`, the bot will work.

#### config 
you will need to update the config file with the server id and role names for your own discord server. you can also update the welcome message (the initial message that is DMed to users that join the server).

## deployment (as of right now, local only) 
run `node main.js`

you'll know the code ran successfully if the code doesn't immediately error out, and the bot appears to be online (for longer than a couple minutes) within the qwer hacks server.

additionally, in the terminal the bot will print out 
`Logged in as QWER Hacks Welcome Bot#7201!` if everything re: setup goes okay.
