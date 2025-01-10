export interface Post {
  id: number;
  name: string;
  description: string;
  createdAt: string; // ISO format date string
  updatedAt: string; // ISO format date string
}

export interface PostRequestSuccess {
  posts: Post[];
  total: number;
}
