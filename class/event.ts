import { EventIdentity } from '../lib/types';

export class EventBuilder {
    identity: EventIdentity;
    constructor(identity: EventIdentity) {
        this.identity = identity
    }
    async run(...args): Promise<any> { }
}