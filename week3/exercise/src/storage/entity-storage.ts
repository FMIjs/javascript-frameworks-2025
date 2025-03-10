import { v4 } from 'uuid';

export class EntityStorage<T extends { id : string, title : string }>{
    constructor(private entries : Array<T> = []){
    }

    getAll(filter?: { title : string }){
        if (!filter) {
            return this.entries;
        }
        
        const filteredResults = this.entries.filter(entry => entry.title.toLowerCase().includes(filter.title.toLowerCase()));
        return filteredResults;
    }

    getById(id : string) : T | undefined {
        return this.entries.find(entry => entry.id === id); // better use Dictionary to store entries
    }

    insertOne(entity : T) {
        const id = v4();
        const entityWithId = {
            ...entity,
            id : entity.id || id
        }
        this.entries.push(entityWithId);
        return entityWithId;
    }
}