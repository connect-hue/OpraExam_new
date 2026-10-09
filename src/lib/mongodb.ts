import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const dbName = process.env.MONGODB_DB || 'opraexam';

interface CachedConnection {
  client: MongoClient | null;
  promise: Promise<MongoClient> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoCached: CachedConnection | undefined;
}

let cached: CachedConnection = global._mongoCached || {
  client: null,
  promise: null,
};

if (!global._mongoCached) {
  global._mongoCached = cached;
}

export async function getMongoClient(): Promise<MongoClient | null> {
  if (!uri) {
    return null;
  }

  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    const opts = {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    };
    cached.promise = MongoClient.connect(uri, opts).then((client) => {
      cached.client = client;
      return client;
    }).catch((err) => {
      cached.promise = null;
      console.warn('MongoDB connection error:', err.message || err);
      return null as unknown as MongoClient;
    });
  }

  try {
    const client = await cached.promise;
    return client || null;
  } catch {
    cached.promise = null;
    return null;
  }
}

export async function getDb(): Promise<Db | null> {
  const client = await getMongoClient();
  if (!client) {
    return null;
  }
  return client.db(dbName);
}

export async function checkMongoStatus(): Promise<{ connected: boolean; message: string; dbName: string }> {
  if (!uri) {
    return {
      connected: false,
      message: 'MONGODB_URI is not configured in .env.local',
      dbName,
    };
  }

  try {
    const client = await getMongoClient();
    if (!client) {
      return {
        connected: false,
        message: 'Could not connect to MongoDB server',
        dbName,
      };
    }
    // Ping database
    await client.db(dbName).command({ ping: 1 });
    return {
      connected: true,
      message: 'Successfully connected to MongoDB',
      dbName,
    };
  } catch (error: any) {
    return {
      connected: false,
      message: error?.message || 'Failed to ping MongoDB',
      dbName,
    };
  }
}
