import { MongoClient, Db } from 'mongodb'
import path from 'path'
// const path = require('path');

const FilePath = (): String => {
  const currentDirectory = process.cwd();
  const relativePath = path.relative(currentDirectory, __filename);
  return `[${relativePath}]: `
}

export type DBO = { db: Db; client: MongoClient } | { error: any };

export async function connectToMongo(): Promise<DBO> {
  // console.log(process.env);

  const uri = process.env.MONGO_URI || ''

  console.log(`${FilePath()}`, uri)

  try {
    const client = new MongoClient(uri)
    await client.connect()
    console.log(`${FilePath()} connected to mongo`)
    const db = client.db('test')

    return {
      db: db,
      client: client
    }
  } catch (error) {
    console.log(`${FilePath()}`, error)
    return { error }
  }
}