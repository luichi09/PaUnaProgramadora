import {
    ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, Colors, CommandInteraction,
    CommandInteractionOptionResolver, EmbedBuilder, ModalBuilder, ModalSubmitInteraction, TextChannel, TextInputBuilder, TextInputStyle
} from 'discord.js';
import { CommandBuilder, CommandParent } from '../../class';

const embed = new EmbedBuilder()

export default class Ping extends CommandBuilder {
    constructor() {
        super(
            {
                name: 'ping',
                nameLocalizations: {
                    'es-ES': 'latencia'
                },
                description: `Shows the bot's latency`,
                descriptionLocalizations: {
                    'es-ES': 'Muestra la latencia del bot'
                },
                parent: CommandParent.Util,
                type: ApplicationCommandType.ChatInput
            },
            [
                {
                    /* Es lo nuevo en bromas xDD */
                    type: ApplicationCommandOptionType.Attachment,
                    name: 'attachment',
                    nameLocalizations: {
                        'es-ES': 'archivo'
                    },
                    description: 'Attach a file',
                    descriptionLocalizations: {
                        'es-ES': 'Adjunta un archivo'
                    },
                    required: false
                }
            ]
        )
    }
    async replyCommand(command: CommandInteraction, args: CommandInteractionOptionResolver) {

        command.reply({ content: `Já!, te mentí, en realidad esto retorna **PONG!**` })

        /* Ignora lo de abajo es para modales (es un ejemplo para el futuro, si quieres usarlos) */

        if (args.getAttachment('thumbnail')) embed.setImage(args.getAttachment('thumbnail').url)

        command.showModal(
            new ModalBuilder()
                .setCustomId('advertise')
                .setTitle('Build your advise')
                .setComponents(
                    new ActionRowBuilder()
                        .addComponents(
                            new TextInputBuilder().setStyle(TextInputStyle.Short).setCustomId('link').setLabel('Link')
                            .setRequired(true).setMaxLength(100).setPlaceholder('https://your.domain.example')
                        ) as ActionRowBuilder<TextInputBuilder>,
                
                    new ActionRowBuilder()
                        .addComponents(
                            new TextInputBuilder().setStyle(TextInputStyle.Short).setCustomId('name').setLabel('Name')
                            .setRequired(true).setPlaceholder('Place the name of your network').setMaxLength(100)
                        ) as ActionRowBuilder<TextInputBuilder>,
                    new ActionRowBuilder()
                        .addComponents(
                            new TextInputBuilder().setStyle(TextInputStyle.Paragraph).setCustomId('about')
                            .setLabel('Description').setRequired(true).setPlaceholder('Describe us your network')
                        ) as ActionRowBuilder<TextInputBuilder>,
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                        .setStyle(TextInputStyle.Short).setCustomId('color').setLabel('Color').setRequired(false)
                        .setPlaceholder('Custom unix hexcolor for embed (e.g. 0x5865f2)').setMinLength(8).setMaxLength(8)
                    ) as ActionRowBuilder<TextInputBuilder>
                )
        )
    }
    async replyModal(command: ModalSubmitInteraction) {
        const [{ value: link }, { value: name }, { value: about }, { value: color }] =
            [command.fields.getField('link'), command.fields.getField('name'), command.fields.getField('about'), command.fields.getField('color')]

        if (!link.match(/^(http[s]?:\/\/(www\.)?){1}([0-9A-Za-z-\.@:%_\+~#=]+)+((\.[a-zA-Z]{2,3})+)(\/(.)*)?(\?(.)*)?$/gi))
            return command.reply({ content: 'The link is invalid, make sure it matches `https://www.domain.example`', ephemeral: true })

        embed.setTitle(name).setURL(link).setDescription(about).setAuthor({ name: command.user.tag, iconURL: command.user.displayAvatarURL() }).setColor(parseInt(color) || Colors.Default);
    }
}