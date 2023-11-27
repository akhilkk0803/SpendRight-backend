const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Friend = require("../models/friends");
const getToken = (id) => {
  const token = jwt.sign({ userId: id }, process.env.JWT_SECRET);
  return token;
};
exports.signup = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      const err = new Error("User already exsists with this email");
      err.statusCode = 401;
      throw err;
    }
    const hashpw = await bcrypt.hash(password, 12);
    user = await User.create({ password: hashpw, name, email });
    res.status(200).json({ user: user, token: getToken(user._id) });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      const err = new Error("No user exsits with this email Please Register ");
      err.statusCode = 401;
      throw err;
    }
    const verify = await bcrypt.compare(password, user.password);
    if (!verify) {
      const err = new Error("Please check your password");
      err.statusCode = 401;
      throw err;
    }
    res.status(200).json({ user, token: getToken(user._id) });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};
exports.getUser = async (req, res, next) => {
  const { search, id } = req.query;
  console.log(req.userId);
  try {
    if (id) {
      res.json(await User.findById(id));
      return;
    }
    if (search) {
      const user = await User.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }).find({ _id: { $ne: req.userId } });

      res.json(user);
    } else {
      res.json(await User.findById(req.userId));
    }
  } catch (error) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};
exports.edit = async (req, res, next) => {
  const { name, email } = req.body;
  console.log("first");
  try {
    let user = await User.findOne({ email: email, _id: { $ne: req.userId } });
    if (user) {
      const err = new Error("User already exsists with this email");
      err.statusCode = 401;
      throw err;
    }
    user = await User.findByIdAndUpdate(req.userId, { name, email });
    user = await User.findById(user._id);
    res.json({ user });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};
exports.getFriends = async (req, res, next) => {
  res.json(
    await Friend.findOne({ user: req.userId }, { friends: 1 }).populate(
      "friends"
    )
  );
};
exports.addFriend = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return;
  let user = await Friend.findOne({ user: req.userId });

  if (!user) {
    await Friend.create({ user: req.userId, friends: id });
  } else {
    await Friend.findOneAndUpdate(
      { user: req.userId },
      { $push: { friends: id } }
    );
  }
  user = await Friend.findOne({ user: id });
  if (!user) {
    await Friend.create({ user: id, friends: req.userId });
  } else {
    await Friend.findOneAndUpdate(
      { user: id },
      { $push: { friends: req.userId } }
    );
  }
};
