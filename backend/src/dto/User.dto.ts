export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePic?: string;
  isAdmin?: string;
  createdAt: Date;
  updatedAt: Date;
  _doc: IUser;
}

// export interface UserDoc {
//   _doc: IUser
// }

export interface UserInputPayloadDTO {
  username: string;
  email: string;
  password: string;
  profilePic?: string;
  isAdmin?: string;
}

export interface UpdateUserPayloadDTO {
  id: string;
  email?: string;
  password?: string;
  username?: string;
  profilePic?: string;
  isAdmin?: string;
}
