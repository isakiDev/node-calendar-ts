import mongoose from 'mongoose'

interface Props {
  mongoUrl: string
  dbName: string
}

export class MongoDatabase {
  static async connect ({ dbName, mongoUrl }: Props) {
    try {
      await mongoose.connect(mongoUrl, {
        dbName
      })

      console.log('Connected to MongoDB')
    } catch (error) {
      throw new Error('Error mongoDB connection')
    }
  }
}
