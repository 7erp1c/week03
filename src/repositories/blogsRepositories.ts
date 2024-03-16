import {getBlogsView} from "../model/blogsType/getBlogsView";
import {dbBlogs} from "../db/dbBlogs";
import {blogsView} from "../model/blogsType/blogsView";

export const blogsRepositories = {
//get(/)
    async findFullBlogs(): Promise<blogsView[]> {
        return dbBlogs.blogs
    },
//post(/)
    async createBlogs(name: string, description: string, websiteUrl: string): Promise<blogsView> {

        let newBlogs = {
            id: (+(new Date())).toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl,

        };
        dbBlogs.blogs.push(getBlogsView(newBlogs))

        return newBlogs

    },
//get(/id)
    async findBlogsByID(id: string): Promise<blogsView|undefined> {
        let foundBlogs = dbBlogs.blogs.find(c => c.id === id);

        return (foundBlogs)

    },
//put(/id)
    async updateBlogs(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        let foundBlogs = dbBlogs.blogs.find(v => v.id === id);

        if (foundBlogs) {
         console.log(foundBlogs)
            foundBlogs.name = name;
            foundBlogs.description = description;
            foundBlogs.websiteUrl = websiteUrl;
         console.log(foundBlogs)
            return true;
        } else {
            return false
        }
    },
//delete(/id)
    async deleteBlogs(id: string):Promise<boolean> {
        const searchBlogs = dbBlogs.blogs.find((b => b.id === id))
        if (searchBlogs) {
            dbBlogs.blogs = dbBlogs.blogs
                .filter(c => c.id !== id)
            return true
        } else {
            return false
        }

    }


}


