const { where } = require("sequelize");
const { user, post } = require("../models");

const createUser = async (req, res) => {
  const { name, email } = req.body;
  console.log(name, email);
  try {
    let existUser = await user.findOne({
      where: {
        email,
      },
    });
    if (existUser) {
      return res
        .status(400)
        .json({ error: "User already exist with this email" });
    }
    let response = await user.create({ name, email });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const getUsers = async (req, res) => {
  try {
    let response = await user.findAll({
      order: [["id", "DESC"]],
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const getUser = async (req, res) => {
  console.log(req.params.id);
  try {
    let response = await user.findOne({
      where: { id: req.params.id },
      include: [post],
    });
    console.log(response);
    if (!response) {
      return res
        .status(400)
        .json({ error: "User does not exist with this id" });
    }
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
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  getUser,
};
