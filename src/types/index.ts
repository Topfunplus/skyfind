export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  tags: string[];
  category: string;
  likes: number;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  post: string;
  parentComment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OllamaModel = {
  details: OllamaModelDetails;
  disgest: string;
  name: string;
  size: number;
  modified_at: string;
};

export type OllamaModelDetails = {
  families: string[];
  family: string;
  format: string;
  parameter_size: string;
  parent_model: string;
  quantization_level: string;
};
