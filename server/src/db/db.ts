import { MongoClient, Db } from 'mongodb'
interface dbo {
    db: Db,
    client: MongoClient
}
export async function connectToMongo(): Promise<dbo> {
    const uri = process.env.MONGO_URI || ''
    const client = new MongoClient(uri)

    try {
        await client.connect()
        console.log('connected to mongo')
        const db = client.db('test')

        return {
            db: db,
            client: client
        }
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error)
        throw error
    }
}