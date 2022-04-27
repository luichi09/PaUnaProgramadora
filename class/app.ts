import { Client, GatewayIntentBits, Partials, Collection, User } from 'discord.js';
import { CommandBuilder, EventBuilder, EventName } from '.';
import { readdirSync } from 'fs';
const commands = readdirSync('command'), events = readdirSync('event');

export class Application extends Client {
    commands: Collection<string, CommandBuilder>; events: Collection<EventName, EventBuilder>; devs: Collection<string, User>;

    constructor() {
        super({
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers],
            partials: [Partials.Channel, Partials.GuildMember, Partials.Message]
        })
        this.commands = new Collection(), this.events = new Collection(), this.devs = new Collection()
    }

    public async init() {
        commands.forEach((x) => {
            readdirSync(`command/${x}`).forEach(async(y) => {
                const classCmd = await import(`../command/${x}/${y}`), command: CommandBuilder = new classCmd.default()
                this.commands.set(command.identity.name, command)
            })
        });
        events.forEach((x) => {
            readdirSync(`event/${x}`).forEach(async(y) => {
                const classEvt = await import(`../event/${x}/${y}`), event: EventBuilder = new classEvt.default()
                this.events.set(event.identity.name, event), this.on(event.identity.name, (...args) => event.run(this, ...args))
            })
        });
        /* Pa cambiar */
        await this.login('botToken')
    }
}