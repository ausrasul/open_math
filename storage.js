const Redis = require("ioredis");
const { REDIS_URL } = process.env;

class Storage {
    constructor(){
        this.renderRedis = new Redis(REDIS_URL);
    }

    write = (key, value) => {
        this.renderRedis.set(key, JSON.stringify(value));
    }
    read = (key) => {
        return new Promise((resolve, reject) => {
            this.renderRedis.get(key).then(res => {
                resolve(JSON.parse(res))
            }).catch(reject)
        })
    }
}

module.exports = new Storage()