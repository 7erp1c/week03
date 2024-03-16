import {postsView} from "./postsView";


export const getPostsView = (dbPosts: postsView): postsView => {
    return {
        id: dbPosts.id,
        title: dbPosts.title,
        shortDescription: dbPosts.shortDescription,
        content: dbPosts.content,
        blogId: dbPosts.blogId,
        blogName: dbPosts.blogName

    }
}