import { Guild, User } from 'discord.js';
import { REST } from '@discordjs/rest';

export function getUser(id: string): User {
    return new REST({ version: '9' }).setToken('botToken').get(`/users/${id}`) as any as User
}

/* Pa cambiar */
export function getGuild(): Guild {
    return new REST({ version: '9' }).setToken('botToken').get(`/guilds/guildId`) as any as Guild
}

export function getTime(timestamp: number, style?: 't' | 'T' | 'd' | 'D' | 'f' | 'F' | 'R'): `<t:${number}:${string}>` { return `<t:${Math.floor(timestamp / 1e3)}:${style || 'R'}>` }