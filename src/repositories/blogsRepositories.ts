
import {blogsView} from "../model/blogsType/blogsView";
import {blogCollection} from "../index";


export const blogsRepositories = {
//get(/)
    async findFullBlogs(): Promise<blogsView[]> {
        return blogCollection.find({}).toArray()
    },
//post(/)
    async createBlogs(name: string, description: string, websiteUrl: string): Promise<blogsView> {

        let newBlogs = {
            id: (+(new Date())).toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership:false

        };
        await blogCollection.insertOne(newBlogs)
        return newBlogs

    },
//get(/id)
    async findBlogsByID(id: string): Promise<blogsView|undefined> {
        let foundBlogs: blogsView | null    = await blogCollection.findOne({id:id});
        if(foundBlogs){
            return foundBlogs
        } else return

    },
//put(/id)
    async updateBlogs(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const result = await blogCollection
            .updateOne({id:id},{$set:{name:name,description:description,websiteUrl:websiteUrl}})
        return result.matchedCount === 1

    },
//delete(/id)
    async deleteBlogs(id: string):Promise<boolean> {
        const result = await blogCollection.deleteOne({id:id})
        return result.deletedCount === 1
    }


}


