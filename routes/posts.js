import express from 'express';

import {getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";
// Don't forget the extension name ".js" as ESM has to have it

const router = express.Router();

/*
In posts router folder, we are not putting any logic here, which will mess up which route is for which function, so
 we build another folder called "controllers" to handle different post http requests
*/
router.get('/', getPosts);

// router.get('/:id', getPost);

router.post('/', createPost);

router.patch('/:id', updatePost);

router.delete('/:id', deletePost);

router.patch('/:id/likePost', likePost);

export default router;
