import { dbPosts } from "../db/dbPosts";
import {dbBlogs} from "../db/dbBlogs";
import {postsView} from "../model/postsType/postsView";




export const postsRepositories = {
    //get(/)
    async findFullPosts():Promise<postsView[]> {
        return dbPosts.posts
    },
//post(/)
    async createPosts(id:string, title: string, shortDescription: string, content: string, blogId:string,blogName:string):Promise<postsView> {
        let getNameByID = dbBlogs.blogs
            .filter(b=> b.id ===  blogId)
            .map(n => n.name).toString()

        let newPosts = {
            id: (+new Date()).toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: getNameByID

        };
        dbPosts.posts.push(newPosts)

        return newPosts

    },
//get(/id)
    async findPostsByID(id: string):Promise<postsView|undefined> {
        let foundPosts = dbPosts.posts.find(c => c.id === id);

        return (foundPosts)

    },
//put(/id)
    async updatePosts(id: string, title: string, shortDescription: string, content: string, blogId:string,blogName:string):Promise<boolean> {
        let foundPosts = dbPosts.posts.find(v => v.id === id);
        let getNameByID = dbBlogs.blogs
            .filter(b=> b.id ===  blogId)
            .map(n => n.name).toString()
        if (foundPosts) {
            foundPosts.title = title;
            foundPosts.shortDescription = shortDescription;
            foundPosts.content = content;
            foundPosts.blogId = blogId;
            foundPosts.blogName = getNameByID;
            return true;
            } else {
            return false
        }

    },
//delete(/id)
    async deletePosts(id: string): Promise<boolean> {
        const searchPosts = dbPosts.posts.find((b => b.id === id))
        if (searchPosts) {
            dbPosts.posts = dbPosts.posts
                .filter(c => c.id !== id)
            return true
        } else {
            return false
        }

    }
}