import {blogCollection, postCollection} from "../db/mongo-db";
import {postsView} from "../model/postsType/postsView";




export const postsRepositories = {
    //get(/)
    async findFullPosts():Promise<postsView[]> {
        return postCollection.find({},{ projection: { _id: 0 }}).toArray()
    },
//post(/)

    async createPosts( title: string, shortDescription: string, content: string, blogId:string):Promise<postsView> {

        async function getNameByID(id: string): Promise<string | null> {
            const blog = await blogCollection
                .findOne({ id }, { projection: { _id: 0, name: 1 } });
            return blog ? blog.name : null;
        }
        const blogName = await getNameByID(blogId)||''
        // let getNameByID = dbBlogs.blogs
        //     .filter(b=> b.id ===  blogId)
        //    .map(n => n.name)[0]

        let newPosts = {
            id: (+new Date()).toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName,
            createdAt: new Date().toISOString()

        };
        await postCollection.insertOne(newPosts)
        let newPostsWithoutId = {...newPosts} as any;
        delete newPostsWithoutId._id;

        return newPostsWithoutId as postsView;


    },
//get(/id)
    async  findPostsByID(id: string):Promise<postsView|null> {
        let foundPosts: postsView | null = await postCollection.findOne({id}, { projection: { _id: 0 }});
        if (foundPosts) {
            return foundPosts
        } else {
            return null
        }
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