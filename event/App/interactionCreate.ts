import { EmbedBuilder, CommandInteraction, CommandInteractionOptionResolver, TextChannel } from 'discord.js';
import { EventBuilder, EventName, Application, EventParent } from '../../class';

export default class Interaction extends EventBuilder {
    constructor() { super({ name: EventName.InteractionCreate, parent: EventParent.App }) }
    async run(bot: Application, interaction: CommandInteraction) {
        const command = bot.commands.get(interaction.commandName)
        if(interaction.isCommand()) {
            try {
                command.replyCommand(interaction, interaction.options as CommandInteractionOptionResolver, bot)
            } catch(err) {
                /* Pa cambiar */
                (bot.channels.cache.get('idCanal') as TextChannel).send({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`${interaction.commandName}: col(${err.columnNumber}), line(${err.lineNumber})`).setDescription(`\`\`\`ts\n${err.stack}\n\`\`\``)]
                })
            }
        }
        if(interaction.isAutocomplete()) {
            command.replyAutoComplete(interaction, interaction.options.getFocused(true), bot)
        }
        if(interaction.isModalSubmit()) {
            bot.commands.find((x) => x.identity.name == interaction.customId).replyModal(interaction)
        }
    }
}