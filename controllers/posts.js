import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();
    res.status(200).json(postMessage)
  } catch (err) {
    res.status(404).json({msg: err.message})
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost)
  } catch (err) {
    res.status(409).json({msg: err.message})
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  const updatePost = await PostMessage.findByIdAndUpdate(id, {...post, id}, {new: true});
  res.json(updatePost)
};

export const deletePost = async(req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({message: 'Post deleted successfully'})
};

export const likePost = async(req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id ${id}`);

  const post = await PostMessage.findById(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true});
  res.json(updatedPost)
};
