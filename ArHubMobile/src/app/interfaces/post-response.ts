export interface PostResponse {
  id: string,
  previewImageId: string,
  title: string,
  author: {
    id: string,
    username: string,
    avatarImageId: string,
  },
  lastRated: [
    {
      id: string,
      username: string,
      avatarImageId: string,
    }
  ],
  likeCount: number,
  commentCount: number,
  modelId?: string,
  createdTime: any,
}
