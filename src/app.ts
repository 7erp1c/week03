import express, {Request, Response} from 'express'
import {blogsRouter} from "./router/blogs-router";
import {postsRouter} from "./router/posts-router";
import { db } from './db/mongo-db';
export const app = express()

app.use(express.json())
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)

app.get('/', (req: Request, res: Response) => {
    res
        .status(200)
        .json({x: "x1"})

})
app.delete('/testing/all-data', async (req, res) => {

    await db.dropDatabase()
    return res.sendStatus(204);
})