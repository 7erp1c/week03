import {dbBlogs} from "../db/dbBlogs";
import {postsView} from "../model/postsType/postsView";
import {postCollection} from "../index";



export const postsRepositories = {
    //get(/)
    async findFullPosts():Promise<postsView[]> {
        return postCollection.find({}).toArray()
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
            blogName: getNameByID,
            createdAt: new Date().toISOString()

        };
        await postCollection.insertOne(newPosts)

        return newPosts

    },
//get(/id)
    async findPostsByID(id: string):Promise<postsView|undefined> {
        let foundPosts: postsView | null = await postCollection.findOne({id: id});
        if (foundPosts) {
            return foundPosts
        } else return

    },
//put(/id)
    async updatePosts(id: string, title: string, shortDescription: string, content: string, blogId:string):Promise<boolean> {
        const result = await postCollection
            .updateOne({id:id},{$set:{title:title,shortDescription:shortDescription,content:content,blogId:blogId}})
        return result.matchedCount === 1

    },
//delete(/id)
    async deletePosts(id: string): Promise<boolean> {
        const result = await postCollection.deleteOne({id:id})
        return result.deletedCount === 1
    }
}