
interface passportUser {
  username: string,
  user_id: number
}

//allows you to access these properties in req.user in express middleware
declare namespace Express {
  export interface Request {
     user?: passportUser
  }
}