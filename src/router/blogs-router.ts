import {Request, Response, Router} from "express";
import {_delete_all_, blogsCreateAndPutModel} from "../typeForReqRes/blogsCreateAndPutModel";
import {RequestWithBlogsPOST, RequestWithDelete} from "../typeForReqRes/helperTypeForReq";
import {getBlogsView} from "../model/blogsType/getBlogsView";
import {blogsRepositories} from "../repositories/blogsRepositories";
import {authGuardMiddleware} from "../middleware/authGuardMiddleware";
import {errorsValidation} from "../middleware/errorsValidation";
import {blogsValidation} from "../middleware/inputValidationMiddleware";
import {dbBlogs} from "../db/dbBlogs";
import {blogsView} from "../model/blogsType/blogsView";


export const blogsRouter = Router ({})

blogsRouter.get('/', async (req: Request, res: Response) => {
   const foundFullBlogs: blogsView[]  = await blogsRepositories.findFullBlogs()
    res.send(foundFullBlogs)
})

blogsRouter.post('/', authGuardMiddleware,blogsValidation,errorsValidation,
    async (req: RequestWithBlogsPOST<blogsCreateAndPutModel>, res: Response) => {
    const newBlogsFromRep = await blogsRepositories.createBlogs(req.body.name,req.body.description,req.body.websiteUrl)
    res.status(201).send(newBlogsFromRep)
})


blogsRouter.get('/:id', async (req: Request, res: Response) => {
    const foundBlogsFromRep = await blogsRepositories.findBlogsByID(req.params.id)
    if (!foundBlogsFromRep) {
        res.sendStatus(404)
        return;
    }
    res.json(getBlogsView(foundBlogsFromRep))
        .send(200)
})


blogsRouter.put('/:id',authGuardMiddleware,blogsValidation,errorsValidation, async (req: Request, res: Response) => {
    const isUpdateBlogs = await blogsRepositories.updateBlogs(req.params.id, req.body.name,req.body.description,req.body.websiteUrl)

    const bBlogsId = req.params.id;
    const blogsIndexId = dbBlogs.blogs.findIndex(p => p.id === bBlogsId);
    if(blogsIndexId === -1){
        res.send(404);
        return;
    }

    if(Object.keys(isUpdateBlogs).length === 0){
        res.sendStatus(204)
        return;
    }

    if (isUpdateBlogs) {
        const foundBlogs = blogsRepositories.findBlogsByID(req.params.id)
        console.log(foundBlogs);
        res.send(foundBlogs)
        return
    } else {
        res.send(404)
    }

})


blogsRouter.delete('/:id',authGuardMiddleware, async (req: RequestWithDelete<_delete_all_>, res: Response) => {

    const isDelete = await blogsRepositories.deleteBlogs(req.params.id)
    if (isDelete) {
        res.sendStatus(204)//Not Found
    } else{
        res.sendStatus(404)
    }

})