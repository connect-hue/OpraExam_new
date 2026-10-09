import { getDb } from '../mongodb';
import { defaultSiteContent, SiteContent } from '@/data/siteContent';

const COLLECTION_NAME = 'site_content';
const CONTENT_DOC_ID = 'main_site_content';

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const db = await getDb();
    if (!db) {
      return defaultSiteContent;
    }

    const collection = db.collection(COLLECTION_NAME);
    const doc = await collection.findOne({ _id: CONTENT_DOC_ID as any });
    if (!doc) {
      return defaultSiteContent;
    }

    const { _id, ...content } = doc as any;
    return {
      hero: { ...defaultSiteContent.hero, ...content.hero },
      about: { ...defaultSiteContent.about, ...content.about },
      syllabus: { ...defaultSiteContent.syllabus, ...content.syllabus },
    };
  } catch (error) {
    console.warn('Error fetching site content, using fallback:', error);
    return defaultSiteContent;
  }
}

export async function updateSiteContent(content: Partial<SiteContent>): Promise<boolean> {
  const db = await getDb();
  if (!db) throw new Error('Database is not connected');

  const collection = db.collection(COLLECTION_NAME);
  const now = new Date().toISOString();

  await collection.updateOne(
    { _id: CONTENT_DOC_ID as any },
    {
      $set: {
        ...content,
        updatedAt: now,
      },
    },
    { upsert: true }
  );

  return true;
}
