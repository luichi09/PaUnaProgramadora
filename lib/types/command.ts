import { ApplicationCommandType, Locale } from 'discord.js'

export interface Command {
    name: string
    nameLocalizations?: Partial<Record<Locale, string>>
    description: string
    descriptionLocalizations?: Partial<Record<Locale, string>>
    parent: CommandParent
    type: ApplicationCommandType
}
export enum CommandParent {
    Util = 'Util'
}