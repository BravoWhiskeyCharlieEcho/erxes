import { Document, Schema, Model, Connection, Types, model } from 'mongoose';
import { IModels } from './index';

export interface IPost {
  _id: any;
  categoryId: string;
  content: string;
  state: string;
  thumbnail?: string | null;
}

export type PostDocument = IPost & Document;
export interface IPostModel extends Model<PostDocument> {
  createPost(c: Omit<IPost, '_id'>): Promise<PostDocument>;
  patchPost(_id: string, c: Partial<Omit<IPost, '_id'>>): Promise<PostDocument>;
  deletePost(_id: string): Promise<PostDocument>;
}

export const postSchema = new Schema<PostDocument>({
  categoryId: { type: Types.ObjectId, index: true },
  content: { type: String, required: true },
  state: {
    type: String,
    required: true,
    enum: ['DRAFT', 'PUBLISHED'],
    default: 'DRAFT'
  },
  thumbnail: String
});
postSchema.index({ categoryId: 1, state: 1 });

export const generatePostModel = (
  subdomain: string,
  con: Connection,
  models: IModels
): void => {
  class PostModel {
    public static async createPost(
      input: Omit<IPost, '_id'>
    ): Promise<PostDocument> {
      const res = await models.Post.create(input);
      return res;
    }
    public static async patchPost(
      _id: string,
      patch: Partial<Omit<IPost, '_id'>>
    ): Promise<PostDocument> {
      await models.Post.updateOne({ _id }, patch);
      const updated = await models.Post.findById(_id);
      if (!updated) {
        throw new Error(`Post with \`{ "_id" : "${_id}"}\` doesn't exist`);
      }
      return updated;
    }

    public static async deletePost(_id: string): Promise<PostDocument> {
      const post = await models.Post.findById(_id);
      if (!post) {
        throw new Error(`Post with \`{ _id : "${_id}" doesn't exist } \``);
      }

      const replies = await models.Comment.findById({ replyToId: _id }).lean();

      await post.remove();

      models.Comment.deleteComments(replies.map(r => r._id));

      return post;
    }
  }
  postSchema.loadClass(PostModel);

  models.Post = con.model<PostDocument, IPostModel>('forum_posts', postSchema);
};
