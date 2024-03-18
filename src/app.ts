import express, {Request, Response} from 'express'
import {blogsRouter} from "./router/blogs-router";
import {dbPosts} from "./db/dbPosts";
import {postsRouter} from "./router/posts-router";
import {dbBlogs} from "./db/dbBlogs";
import {db} from "./index";
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
    dbBlogs.blogs = [];
    dbPosts.posts = [];
    await db.dropDatabase();
    res.sendStatus(204);
})