import UserModel from '../models/user';

const UserController = {
  get: (req, res) => {
    UserModel.find()
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(500).json(error));
  },

  post: async (req, res, next) => {
    try {
      const user = new UserModel(req.body);
      await user.save();
      res
          .status(201)
          .json(user);
      next();
    } catch (error) {
      next(error);
    }
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
  },
};

export default UserController;
