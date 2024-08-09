const { where } = require("sequelize");
const { user, post } = require("../models");

const createPost = async (req, res) => {
  const { title, description, user_id } = req.body;
  try {
    let existUser = await user.findOne({
      where: {
        id: user_id,
      },
    });
    if (!existUser) {
      return res
        .status(400)
        .json({ error: "User does not exist with this id" });
    }
    let response = await post.create({ title, description, user_id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const getPosts = async (req, res) => {
  try {
    let response = await post.findAll({
      include: [user],
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const deleteUser = async (req, res) => {
  const { name, email } = req.body;
  console.log(name, email);
  try {
    let existUser = await user.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!existUser) {
      return res
        .status(400)
        .json({ error: "User does not exist with this id" });
    }
    let response = await user.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res
      .status(200)
      .json({ status: true, message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).send(error);
  }
};
const updateUser = async (req, res) => {
  const { name, email, id } = req.body;
  try {
    let existUser = await user.findOne({
      where: {
        id,
      },
    });
    if (!existUser) {
      return res
        .status(400)
        .json({ error: "User does not exist with this id" });
    }
    await user.update({ name, email }, { where: { id } });
    return res
      .status(200)
      .json({ status: 200, message: "User updated successfully" });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  createPost,
  getPosts,
  deleteUser,
  updateUser,
};
