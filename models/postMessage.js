import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  message: String,
  name: String, // postSchema needs name property, because in Post component, Post should have name on the card, but this name is not from form input, but from auth token.
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

// All post data stored in this 'PostMessage' model
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
