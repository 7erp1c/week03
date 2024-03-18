import {body} from "express-validator";
import { blogCollection } from "../db/mongo-db";






export const blogsValidation = [
body('name').trim().isString().isLength({min:1,max:15}),
body('description').trim().isString().isLength({min:1,max:500}),
body('websiteUrl').trim().isString().isLength({min:1,max:100})
    .matches(new RegExp("^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$")).bail()
// body('createdAt').isString()
//     .matches(new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d{3}Z$"))
]




export const postsValidation = [
body('title').trim().isString().isLength({min:1,max:30}).bail(),
body('shortDescription').trim().isString().isLength({min:1,max:100}).bail(),
body('content').trim().isString().isLength({min:1,max:1000}),
body('blogId').trim().isString().custom(
    async (value) => {
        const blog = await blogCollection.findOne({  id: value  });
        if (!blog) {
            throw new Error("Blog not found");
        }
        return value;
    }
)
    // body('createdAt').isString()
    //     .matches(new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d{3}Z$"))
]

