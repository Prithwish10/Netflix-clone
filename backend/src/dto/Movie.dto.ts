export interface IMovie {
  _id: string;
  title: string;
  desc: string;
  image: string;
  imageTitle: string;
  imageSm: string;
  trailer: string;
  video: string;
  limit: number;
  genre: string;
  isSeries?: boolean;
}

export interface UpdateMoviePayloadDTO {
  id?: string;
  title?: string;
  desc?: string;
  image?: string;
  imageTitle?: string;
  imageSm?: string;
  trailer?: string;
  video?: string;
  limit?: number;
  genre?: string;
  isSeries?: boolean;
}
