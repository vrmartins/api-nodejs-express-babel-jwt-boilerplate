// import UserModel from '../models/user';

const UserController = {
  get: (req, res) => {
    res
      .status(200)
      .json(req.query);
  },
  post: (req, res) => {
    res
      .status(201)
      .json(req.body);
  },
  put: (req, res) => {
    res
      .status(201)
      .json(req.body);
  },
  getById: (req, res) => {
    res
      .status(200)
      .json(req.param);
  },
  deleteById: (req, res) => {
    res
      .status(200)
      .json(req.param);
  }
};

export default UserController;