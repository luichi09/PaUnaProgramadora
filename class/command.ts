import { CommandInteraction, CommandInteractionOptionResolver, ApplicationCommandOption, AutocompleteInteraction, ApplicationCommandOptionChoiceData, ModalSubmitInteraction } from 'discord.js';
import { Application, Command } from '.';
export class CommandBuilder {
    identity: Command; args: ApplicationCommandOption[];
    constructor(identity: Command, args?: Array<ApplicationCommandOption>) {
        this.identity = identity, this.args = args
    }
    public replyCommand(command: CommandInteraction, args:CommandInteractionOptionResolver, bot?: Application): any { }
    public replyAutoComplete(autocomplete: AutocompleteInteraction, focused: ApplicationCommandOptionChoiceData, bot?: Application): any { }
    public replyModal(modal: ModalSubmitInteraction, bot?: Application): any { }
}