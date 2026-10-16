import { MongoClient, Db } from 'mongodb';

function getMongoUri(): string {
  const raw =
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    process.env.MONGODB_URL ||
    process.env.MONGO_URL ||
    '';
  return raw.trim().replace(/^["']|["']$/g, '');
}

function getMongoDbName(): string {
  const raw =
    process.env.MONGODB_DB ||
    process.env.MONGO_DB ||
    process.env.MONGODB_DB_NAME ||
    process.env.MONGO_DB_NAME ||
    process.env.MONGODB_DATABASE ||
    'opraexam';
  return raw.trim().replace(/^["']|["']$/g, '');
}

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
  const uri = getMongoUri();
  if (!uri) {
    return null;
  }

  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    const opts = {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      maxPoolSize: 10,
    };
    cached.promise = MongoClient.connect(uri, opts).then((client) => {
      cached.client = client;
      return client;
    }).catch((err) => {
      cached.promise = null;
      const msg = err?.message || String(err);
      if (msg.includes('SSL alert number 80') || msg.includes('tlsv1 alert internal error')) {
        console.warn(
          'MongoDB connection error (SSL Alert 80): Live server IP is blocked by MongoDB Atlas. Please whitelist 0.0.0.0/0 in MongoDB Atlas -> Network Access.',
          msg
        );
      } else {
        console.warn('MongoDB connection error:', msg);
      }
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
  return client.db(getMongoDbName());
}

export async function checkMongoStatus(): Promise<{ connected: boolean; message: string; dbName: string }> {
  const uri = getMongoUri();
  const dbName = getMongoDbName();

  if (!uri) {
    return {
      connected: false,
      message: 'MONGODB_URI is not configured in environment variables',
      dbName,
    };
  }

  try {
    const client = await getMongoClient();
    if (!client) {
      return {
        connected: false,
        message: 'Could not connect to MongoDB server (check Network Access whitelist and credentials)',
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
