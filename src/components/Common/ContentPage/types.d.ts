export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CancelError {
  message: string;
  name: string;
  code: string;
}

export interface Response<T, D> {
  data: T;
  error?: D;
}

export type PostResponse = Response<Post[], CancelError>;
