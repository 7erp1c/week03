import {Request, Response, Router} from "express";
import {_delete_all_, blogsCreateAndPutModel} from "../typeForReqRes/blogsCreateAndPutModel";
import {RequestWithBlogsPOST, RequestWithDelete} from "../typeForReqRes/helperTypeForReq";
import {blogsRepositories} from "../repositories/blogsRepositories";
import {authGuardMiddleware} from "../middleware/authGuardMiddleware";
import {errorsValidation} from "../middleware/errorsValidation";
import {blogsValidation} from "../middleware/inputValidationMiddleware";
import {dbBlogs} from "../db/dbBlogs";


export const blogsRouter = Router({})

blogsRouter.get('/', async (req: Request, res: Response) => {
    const foundFullBlogs = await blogsRepositories.findFullBlogs()
    res.send(foundFullBlogs)
})

blogsRouter.post('/', authGuardMiddleware, blogsValidation, errorsValidation,
    async (req: RequestWithBlogsPOST<blogsCreateAndPutModel>, res: Response) => {
        const newBlogsFromRep = await blogsRepositories.createBlogs(req.body.name, req.body.description, req.body.websiteUrl)
        res.status(201).send(newBlogsFromRep)
    })


blogsRouter.get('/:id', async (req: Request, res: Response) => {
    const foundBlogsFromRep = await blogsRepositories.findBlogsByID(req.params.id)
    if (!foundBlogsFromRep) {
        res.sendStatus(404)
        return;

    } else {
        res.send(foundBlogsFromRep)
        return;
    }


})


blogsRouter.put('/:id', authGuardMiddleware, blogsValidation, errorsValidation, async (req: Request, res: Response) => {
        const isUpdateBlogs = await blogsRepositories.updateBlogs(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)

        const blogsId: string = req.params.id;
        const blogsIndexId = await blogsRepositories.findBlogsByID( blogsId )
        if (Object.keys(isUpdateBlogs).length === 0) {
            res.sendStatus(204)
            return
        }
        if (isUpdateBlogs) {
            const foundBlogs = await blogsRepositories.findBlogsByID(blogsId)
            res.send(foundBlogs)
            return
        }
        if (!blogsIndexId) {

            res.send(404);
            return
        }

        res.send(404)
        return
    }
)


blogsRouter.delete('/:id', authGuardMiddleware, async (req: RequestWithDelete<_delete_all_>, res: Response) => {

    const isDelete = await blogsRepositories.deleteBlogs(req.params.id)
    if (isDelete) {
        res.sendStatus(204);
        return
    } else {
        res.sendStatus(404);
        return
    }
})