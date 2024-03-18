import {app} from "./app";
import dotenv from 'dotenv'
import {connectToDB} from "./db/mongo-db";
import {Collection, MongoClient} from "mongodb";
import {blogsView} from "./model/blogsType/blogsView";
import {postsView} from "./model/postsType/postsView";

dotenv.config()


export const mongoURI = process.env.MONGO_URL //|| 'mongodb://localhost:27017'
console.log(process.env.MONGO_URL)
if(!mongoURI){
    throw new Error("URL doesn\'t found")
}
export const client: MongoClient = new MongoClient(mongoURI)

const port = process.env.PORT || 4000

const startApp = async() => {
    await connectToDB()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)

    })
}

 startApp()
export let db = client.db();
export const blogCollection: Collection<blogsView> = db.collection<blogsView>("blogs")
export const postCollection: Collection<postsView> = db.collection<postsView>("posts")
