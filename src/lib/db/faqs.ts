import { ObjectId } from 'mongodb';
import { getDb } from '../mongodb';
import { faqs as defaultFaqs, FAQ } from '@/data/faqs';

export interface DbFaq {
  _id?: string;
  question: string;
  answer: string;
  order?: number;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}

const COLLECTION_NAME = 'faqs';

export async function getAllFaqs(): Promise<DbFaq[]> {
  try {
    const db = await getDb();
    if (!db) {
      // Return default static faqs if db is not connected
      return defaultFaqs.map((f, i) => ({
        _id: `static-${i}`,
        question: f.question,
        answer: f.answer,
        order: i,
      }));
    }

    const collection = db.collection<DbFaq>(COLLECTION_NAME);
    const count = await collection.countDocuments();

    // Auto-seed if collection is completely empty
    if (count === 0) {
      await seedDefaultFaqs();
    }

    const docs = await collection.find({}).sort({ order: 1, _id: 1 }).toArray();
    return docs.map((doc) => ({
      ...doc,
      _id: doc._id?.toString(),
    }));
  } catch (error) {
    console.warn('Error fetching FAQs from database, using fallback:', error);
    return defaultFaqs.map((f, i) => ({
      _id: `static-${i}`,
      question: f.question,
      answer: f.answer,
      order: i,
    }));
  }
}

export async function getFaqById(id: string): Promise<DbFaq | null> {
  const db = await getDb();
  if (!db) return null;
  const collection = db.collection(COLLECTION_NAME);
  const doc = await collection.findOne({ _id: new ObjectId(id) });
  if (!doc) return null;
  return {
    ...doc,
    _id: doc._id.toString(),
  } as unknown as DbFaq;
}

export async function createFaq(faq: Omit<DbFaq, '_id'>): Promise<DbFaq | null> {
  const db = await getDb();
  if (!db) throw new Error('Database is not connected');

  const collection = db.collection(COLLECTION_NAME);
  const now = new Date().toISOString();
  
  // Calculate next order if not provided
  let order = faq.order;
  if (typeof order !== 'number') {
    const count = await collection.countDocuments();
    order = count;
  }

  const newDoc = {
    ...faq,
    order,
    createdAt: now,
    updatedAt: now,
  };

  const result = await collection.insertOne(newDoc as any);
  return {
    ...newDoc,
    _id: result.insertedId.toString(),
  };
}

export async function updateFaq(id: string, updates: Partial<DbFaq>): Promise<boolean> {
  const db = await getDb();
  if (!db) throw new Error('Database is not connected');

  const collection = db.collection(COLLECTION_NAME);
  const now = new Date().toISOString();
  const { _id, ...cleanUpdates } = updates;

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...cleanUpdates, updatedAt: now } }
  );

  return result.matchedCount > 0;
}

export async function deleteFaq(id: string): Promise<boolean> {
  const db = await getDb();
  if (!db) throw new Error('Database is not connected');

  const collection = db.collection(COLLECTION_NAME);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

export async function seedDefaultFaqs(): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error('Database is not connected');

  const collection = db.collection(COLLECTION_NAME);
  const now = new Date().toISOString();

  const documents = defaultFaqs.map((faq, index) => ({
    question: faq.question,
    answer: faq.answer,
    order: index,
    category: 'General',
    createdAt: now,
    updatedAt: now,
  }));

  const result = await collection.insertMany(documents as any);
  return result.insertedCount;
}
