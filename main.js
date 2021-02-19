const Discord = require('discord.js');
const config = require('./config');

//emails csv
const fs = require('fs');
const csv_parser = require('papaparse');
const hackerFilePath = 'hacker_emails.csv';
const collaboratorFilePath = 'collaborator_emails.csv';
var hacker_emails;
var collaborator_emails;

const readCSV = async (path) => {
    const csvFile = fs.readFileSync(path)
    const csvData = csvFile.toString()
    return new Promise(resolve => {
        csv_parser.parse(csvData, {
            complete: results => {
                console.log('Found', results.data.length, 'records.');
                resolve(results.data);
            }
        });
    });
};

// discord
const client = new Discord.Client();
let server = null;
let verified_role = null;
let mod_role = null;
let alumni_role = null;


async function iam(userid, email, nickname, pronouns) {
    //max nickname length on discord is 29 characters
    if (nickname.length > 19) {
        return [null, 'Please enter a shorter name (max 19 characters).'];
    }
    if (pronouns.length > 11) {
        return [null, 'Please enter shorter pronouns (max 10 characters).'];
    }

    //get member info
    let member = await server.members.fetch(userid);

    //check email against csv. return if email is not on list
    if (hacker_emails.find(element => element === email)) {
        await member.roles.add(verified_role);
    }
    else if(collaborator_emails.find(element => element === email)){
        await member.roles.add(collaborator_role);
    }
    else {
        return [null, 'This email is not in our records.'];
    }

    // set pronouns in nickname on server
    member.setNickname(`${nickname}` + " " + `(${pronouns})`);

    return [
        null,
        `You're all set! Enjoy hacking :)`
    ];
}

// on ready, initialize server and verified_role params 
client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    //get hacker and collaborator emails from local csv file
    let parsed_emails = await readCSV(hackerFilePath);
    hacker_emails = parsed_emails.flat();
    console.log(hacker_emails);
    parsed_emails = await readCSV(collaboratorFilePath);
    collaborator_emails = parsed_emails.flat();
    console.log(collaborator_emails);

    // find server and required roles
    server = await client.guilds.fetch(config.discord.server_id);
    verified_role = server.roles.cache.find((role) => role.name === config.discord.verified_role_name);
    collaborator_role = server.roles.cache.find((role) => role.name === config.discord.collaborator_role_name);
});

// on new user, dm them with info and verification instructions
client.on('guildMemberAdd', async (member) => {
    let welcome_msg = config.default_msgs.welcome;
    console.log(welcome_msg);
    member.send(welcome_msg);
});

client.on('message', async (msg) => {
    // ignore bots, non-dms, and non-commands
    if (msg.author.bot || !msg.content.startsWith(config.cmd_prefix)) {
        return;
    }

    //allow access to bot-commands channel for testing
    const allowed_channels = ['bot-commands'];
    console.log(msg.channel.name);
    if (msg.channel.type !== 'dm' && !allowed_channels.includes(msg.channel.name)) {
        return;
    }

    // parse input command and args
    const args = msg.content.slice(config.cmd_prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    let member = await server.members.fetch(msg.author.id);

    let [err, message] = [null, null];

    // IAM: verify for the first time with required info
    if (command === 'iam') {
        if (args.length < 3) {
            msg.reply(
                'Invalid command format. Format: `!iam <email> <name> <pronouns>` e.g. `!iam joe@g.ucla.edu Joe_Bruin he/him`'
            );
            return;
        }
        let email = args[0].toLowerCase();
        let nickname = args.slice(1, args.length - 1).join(' ');
        let pronouns = args[args.length - 1].toLowerCase();
        [err, message] = await iam(msg.author.id, email, nickname, pronouns);
    }
    else {
        [err, message] = [null, 'Invalid command/format.'];
    }
    // on error
    if (err) {
        msg.reply('Something went wrong!\n`' + err.message + '`');
        return;
    }
    // else send message
    if (message) {
        msg.reply(message);
    }

});

client.login("#todo: bot token here");
