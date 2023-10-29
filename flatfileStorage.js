//const { JSONSyncPreset } = require('lowdb/node')
import { JSONSyncPreset } from 'lowdb/node'
//const { REDIS_URL } = process.env;

class Storage {
    constructor(){
        this.db = JSONSyncPreset('./db.json', {})
        this.db.read()
    }

    write = (key, value) => {
        return new Promise(resolve => {
            this.db.data[key] = value
            this.db.write()
            resolve()
        })
    }
    read = (key) => {
        return new Promise(resolve => {
            resolve(this.db.data[key])
        })
    }
}
export default new Storage()