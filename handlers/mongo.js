import { MongoClient, ServerApiVersion } from 'mongodb';
import config from '../src/config.js';

class Mongo {
  constructor() {
    this.client = null;
    this.time = null;
    this.options = {
      serverApi: {
        tls: true,
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      serverSelectionTimeoutMS: 30000,
    };
  }

  async init() {
    await this.#connect();
  }

  async #connect() {
    if (!this.client) {
      try {
        this.client = new MongoClient(config.MONGO_URI, this.options);
        await this.client.connect();
        console.debug('MongoDB connected!');
        this.#startTimeout();
      } catch (e) {
        console.error(`Error connecting to MongoDB: ${e}`);
      }
    }
  }

  async #disconnect() {
    if (this.client) {
      try {
        await this.client.close();
        this.client = null;
        console.debug('MongoDB disconnected!');
      } catch (e) {
        console.error(`Error disconnecting from MongoDB: ${e}`);
      }
    }
  }

  async #reconnect() {
    if (!this.client || !this.client.s.hasBeenClosed) {
      await this.#connect();
    }
    this.#startTimeout();
  }

  #startTimeout() {
    if (this.timeout) clearTimeout(this.timeout);
    this.time = setTimeout(() => this.#disconnect(), config.MONGO_TIMEOUT * 60 * 1000);
  }

  async getUser(discordId) {
    try {
      await this.#reconnect();
      const database = await this.client.db(config.MONGO_DB);
      const collection = await database.collection(config.MONGO_COLLECTION);
      const user = await collection.findOne({ [discordId]: { $exists: true } });
      if (!user || !user[discordId] || !user[discordId][0]) return null;
      return user[discordId][0];
    } catch (e) {
      console.error(`Error reading data: ${e}`);
    }
  }

  async setUser(user) {
    try {
      await this.#reconnect();
      const database = await this.client.db(config.MONGO_DB);
      const collection = await database.collection(config.MONGO_COLLECTION);
      const request = await collection.insertOne(user);
      return request.acknowledged;
    } catch (e) {
      console.error(`Error writing user: ${e}`);
    }
  }
}

export default Mongo;