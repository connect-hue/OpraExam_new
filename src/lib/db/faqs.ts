import { ObjectId } from 'mongodb';
import { getDb } from '../mongodb';
import { sanitizeRichText, plainText } from '../content/html';

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
      console.warn('MongoDB not connected: getAllFaqs returning empty array');
      return [];
    }

    const collection = db.collection<DbFaq>(COLLECTION_NAME);
    const docs = await collection.find({}).sort({ order: 1, _id: 1 }).toArray();
    return docs.map((doc) => ({
      ...doc,
      _id: doc._id?.toString(),
    }));
  } catch (error) {
    console.error('Error fetching FAQs from MongoDB:', error);
    return [];
  }
}

export async function getFaqsByCategory(category: string): Promise<DbFaq[]> {
  try {
    const db = await getDb();
    if (!db) {
      console.warn('MongoDB not connected: getFaqsByCategory returning empty array');
      return [];
    }

    const collection = db.collection<DbFaq>(COLLECTION_NAME);
    const docs = await collection.find({ category }).sort({ order: 1, _id: 1 }).toArray();
    return docs.map((doc) => ({
      ...doc,
      _id: doc._id?.toString(),
    }));
  } catch (error) {
    console.error('Error fetching FAQs by category from MongoDB:', error);
    return [];
  }
}

export async function getFaqById(id: string): Promise<DbFaq | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const collection = db.collection(COLLECTION_NAME);
    const doc = await collection.findOne({ _id: new ObjectId(id) });
    if (!doc) return null;
    return {
      ...doc,
      _id: doc._id.toString(),
    } as unknown as DbFaq;
  } catch {
    return null;
  }
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
    question: plainText(faq.question),
    answer: sanitizeRichText(faq.answer),
    order,
    createdAt: now,
    updatedAt: now,
  };

  const result = await collection.insertOne(newDoc);
  await markFaqCategory(faq.category);
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
  const cleanUpdates = { ...updates };
  delete cleanUpdates._id;
  if (cleanUpdates.question !== undefined) cleanUpdates.question = plainText(cleanUpdates.question);
  if (cleanUpdates.answer !== undefined) cleanUpdates.answer = sanitizeRichText(cleanUpdates.answer);
  const previous = await getFaqById(id);

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...cleanUpdates, updatedAt: now } }
  );

  if (result.matchedCount) { await markFaqCategory(previous?.category); await markFaqCategory(updates.category || previous?.category); }
  return result.matchedCount > 0;
}

export async function deleteFaq(id: string): Promise<boolean> {
  const db = await getDb();
  if (!db) throw new Error('Database is not connected');

  const collection = db.collection(COLLECTION_NAME);
  const previous = await getFaqById(id);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount) await markFaqCategory(previous?.category);
  return result.deletedCount > 0;
}

export async function seedDefaultFaqs(): Promise<number> {
  // All FAQs are maintained directly in MongoDB
  return 0;
}

async function markFaqCategory(category = 'General') {
  const db = await getDb();
  if (!db) throw new Error('Database is not connected');
  await db.collection<{ _id: string; faqsConfigured?: boolean; faqCategoriesConfigured?: string[] }>('site_content').updateOne(
    { _id: 'main_site_content' },
    { $set: { faqsConfigured: true }, $addToSet: { faqCategoriesConfigured: category.toLowerCase() } },
    { upsert: true },
  );
}

export async function getPublicFaqs(fallback: { q: string; a: string }[], category?: string) {
  const db = await getDb();
  if (!db) return fallback;
  try {
    const settings = await db.collection<{ _id: string; faqsConfigured?: boolean; faqCategoriesConfigured?: string[] }>('site_content').findOne({ _id: 'main_site_content' });
    const docs = await db.collection<DbFaq>('faqs').find(category ? { category: { $regex: `^${category}$`, $options: 'i' } } : {}).sort({ order: 1, _id: 1 }).toArray();
    const configured = category ? settings?.faqCategoriesConfigured?.includes(category.toLowerCase()) : settings?.faqsConfigured;
    return docs.length || configured ? docs.map(faq => ({ q: plainText(faq.question), a: sanitizeRichText(faq.answer) })) : fallback;
  } catch {
    console.warn('FAQs temporarily unavailable; serving built-in answers.');
    return fallback;
  }
}
