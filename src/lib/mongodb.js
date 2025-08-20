import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI

if (!uri) {
  console.warn("MONGODB_URI environment variable not found. Database features will be disabled.")
}

const options = {}

let client
let clientPromise

if (uri) {
  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect().catch((error) => {
        console.error("MongoDB connection failed:", error)
        return null
      })
    }
    clientPromise = global._mongoClientPromise
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options)
    clientPromise = client.connect().catch((error) => {
      console.error("MongoDB connection failed:", error)
      return null
    })
  }
} else {
  clientPromise = Promise.reject(new Error("MongoDB URI not configured"))
}

export default clientPromise
