interface IEntity {
    id: number;
}

interface IEntityManager<T> {
    add(entity: T): void
    remove(entity: T): void
    removeById(id: number): void
}

class EntityManager<T extends IEntity> implements IEntityManager<T> {

    /**
     * This is the same as `entities.length`
     */
    private id: number;

    /**
     * Array of entities, you can iterate over it
     */
    readonly entities: T[];

    /**
     * Stores link between entity ids and their indexes in the `entities` array 
     */
    private readonly link: Map<number, number>

    /**
     * List of unused ids
     */
    private readonly unused: number[];

    constructor() {
        this.id = 0;
        this.entities = [];
        this.link = new Map<number, number>();
        this.unused = [];
    }

    add(entity: T): void {
        if (entity.id !== -1) throw new Error("This entity already exist, entity `id` must equal to `-1`");

        const id = this.unused.length ? this.unused.pop() : this.id++;
        entity.id = id;

        const index = this.entities.length;
        this.entities.push(entity);
        this.link.set(id, index);
    }

    remove(entity: T): void {
        if (entity.id === -1) throw new Error("This entity doesn't exist");

        // Get entity index in the entities array
        const index = this.link.get(entity.id);
        const lastIndex = this.entities.length - 1;

        // If entity is not the last item, then swap entity with the last item 
        if (index !== lastIndex) {
            const lastEntity = this.entities[lastIndex];
            this.entities[lastIndex] = entity;
            this.entities[index] = lastEntity;
            this.link.set(lastEntity.id, index);
        }

        this.entities.pop();

        // Delete link between entity.id and index in the array
        this.link.delete(entity.id);

        // Make sure we will reuse this id when new entity will be added
        this.unused.push(entity.id);
        entity.id = -1;
    }

    removeById(id: number): void {
        const index = this.link.get(id);
        const entity = this.entities[index];
        this.remove(entity);
    }
}

export default EntityManager;