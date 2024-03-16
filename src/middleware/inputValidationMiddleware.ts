import {body} from "express-validator";
import {dbBlogs} from "../db/dbBlogs";




export const blogsValidation = [
body('name').trim().isString().isLength({min:1,max:15}),
body('description').trim().isString().isLength({min:1,max:500}),
body('websiteUrl').trim().isString().isLength({min:1,max:100})
    .matches(new RegExp("^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$")).bail()
]




export const postsValidation = [
body('title').trim().isString().isLength({min:1,max:30}).bail(),
body('shortDescription').trim().isString().isLength({min:1,max:100}).bail(),
body('content').trim().isString().isLength({min:1,max:1000}),
body('blogId').trim().isString().custom(
    (value) => {
        const blog = dbBlogs.blogs.find(el => el.id === value);
        if (!blog) {
            throw new Error();
        }
        return value;
    }
)]

