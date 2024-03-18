import {Request, Response, Router} from "express";
import {RequestWithDelete, RequestWithPostsPOST} from "../typeForReqRes/helperTypeForReq";
import {postsCreateAndPutModel} from "../typeForReqRes/postsCreateAndPutModel";
import {_delete_all_} from "../typeForReqRes/blogsCreateAndPutModel";
import {postsRepositories} from "../repositories/postsRepositories";
import {authGuardMiddleware} from "../middleware/authGuardMiddleware";
import {postsValidation} from "../middleware/inputValidationMiddleware";
import {errorsValidation} from "../middleware/errorsValidation";
import {dbPosts} from "../db/dbPosts";
import {blogsView} from "../model/blogsType/blogsView";


export const postsRouter = Router({})
postsRouter.get('/', async (req: Request, res: Response) => {
    const foundFullPosts = await postsRepositories.findFullPosts()
    res.send(foundFullPosts)
})

postsRouter.post('/', authGuardMiddleware, postsValidation, errorsValidation, async (req: RequestWithPostsPOST<postsCreateAndPutModel>, res: Response) => {
    const newPostsFromRep = await postsRepositories
        .createPosts( req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)//как сократить
    res.status(201).send(newPostsFromRep)
})


postsRouter.get('/:id', async (req: Request, res: Response) => {
    const foundPostsFromRep = await postsRepositories.findPostsByID(req.params.id)
    if (foundPostsFromRep) {
        res.send(foundPostsFromRep)
    }else{
        res.sendStatus(404)
        return;
    }
})


postsRouter.put('/:id', authGuardMiddleware, postsValidation, errorsValidation, async (req: Request, res: Response) => {
    const rB = req.body
    const isUpdatePosts = await postsRepositories.updatePosts(req.params.id, rB.title, rB.shortDescription, rB.content, rB.blogId)

    const postId = req.params.id;
    const postIndex =  dbPosts.posts.findIndex(p => p.id === postId);
    if (isUpdatePosts) {
        const foundPosts = await postsRepositories.findPostsByID(postId)
        res.send(foundPosts)
        return
    }
    if(postIndex === -1){
        res.sendStatus(404);
        return;
    }
    if(Object.keys(isUpdatePosts).length === 0){
        res.sendStatus(204)
        return;
    }
    res.sendStatus(404)
    return

})


postsRouter.delete('/:id', authGuardMiddleware, async (req: RequestWithDelete<_delete_all_>, res: Response) => {

    const isDelete = await postsRepositories.deletePosts(req.params.id)
    if (isDelete) {
        res.sendStatus(204)//Not Found
    } else {
        res.sendStatus(404)
    }
})