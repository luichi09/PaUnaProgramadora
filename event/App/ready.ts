import { TextChannel } from 'discord.js';
import { Application, Channels, EventBuilder, EventName, EventParent, getCaptcha, getMentionRoles, getUser, Roles, timeout, UserVip } from '../../class';

export default class Ready extends EventBuilder {
    constructor() { super({ name: EventName.ClientReady, parent: EventParent.App }) }
    async run(bot: Application) {

        await bot.guilds.cache.forEach(async(guild) => {
            await guild.commands.set([]), await guild.members.fetch();
            await bot.commands.forEach(
                ({ identity: { name, nameLocalizations, description, descriptionLocalizations, type }, args: options }) => {
                guild.commands.create({ name, nameLocalizations, description, descriptionLocalizations, type, options })
            });
        });
        /* Pa cambiar */
        bot.devs.set('tuId', await getUser('tuId'));
        console.log('Ready!');
    }
}
