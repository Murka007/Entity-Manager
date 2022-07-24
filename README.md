# Entity Manager

> The best implementation of how to store and manage game objects

When creating a game, have you ever wondered which way to store game objects is the best? `array`, `object` or maybe `Map`?<br>
For this example I will use a particle system, but it could be anything.<br>

**Demo:** https://murka007.github.io/Entity-Manager/

<img src="https://i.imgur.com/JbFPj4X.png" height="250"/>

# Comparing different ways
I will explain all scenarios why you shouldn't use only one way of storing objects.

### Array
<details>
    <summary>Open Array</summary>

This method of storing objects is quite simple, but it is too slow.<br>
To remove an entity, you will need to iterate through the entire array.
```js
const entities = [];
function add(entity) {
    entities.push(entity);
}

function remove(id) {
    for (let i=0;i<entities.length;i++) {
        if (entities[i].id === id) {
            entities.splice(i, 1);
            break;
        }
    }
}
```

Another option is to use array as an object, to use entity ids as keys.<br>
But to iterate correctly we need to check for empty indexes in the array
```js
function add(entity) {
    entities[entity.id] = entity;
}

function remove(entity) {
    entities[entity.id] = null;
}

// iterate over array, ignore empty indexes
for (let i=0;i<entities.length;i++) {
    if (!entities[i]) continue;
    
    // rendering, some math operations etc
}
```
</details>

### Object
<details>
    <summary>Open Object</summary>
   
I don't recommend using this method to anyone, iteration speed is extremely low.
```js
const entities = {};
function add(entity) {
    entities[entity.id] = entity;
}

function remove(entity) {
    delete entities[entity.id];
}
```
</details>

### Map
<details>
    <summary>Open Map</summary>

Map is good to store objects, it's behaviour is the same as that of an object and array. Also it is a bit slower than `array`
```js
const entities = new Map();
function add(entity) {
    entities.set(entity.id, entity);
}

function remove(entity) {
    entities.delete(entity.id);
}
```
</details>

We figured out that some ways are good, and some of them are bad, but now I will show you the best way to store objects.

## Implementation
My implementation you can find here: [EntityManager](src/modules/EntityManager.ts)

Entity manager class has 4 properties:
- `id` we will use it to get the length of the array, it is faster than using `arr.length`
- `entities` used to store all of your entities, you can use it to iterate through it
   - there's no empty slots, so you don't have to check for it
- `link` Map object that stores links between entity ids and their index in the `entities` array
  - It is necessary, so we don't have to iterate through array
- `unused` list of unused ids, we should reuse previous ids in order not to increment `id`

*Note:* In your entity class, `id` property should equal to `-1` before you will call `add` method
