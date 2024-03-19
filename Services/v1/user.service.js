const userSchema = require("../../Models/v1/user.schema");
const bcryptjs = require("bcryptjs");

exports.create = async (userInfo) => {
  console.log(userInfo)
  const result = await userSchema.create(userInfo);
  return result;
};

exports.login = async (userName) => {
  const result = await userSchema.findOne({ userName });
  return result;
};

exports.getAll = async () => {
  const result = await userSchema.find();
  return result;
};

exports.getInfo = async (userId) => {
  const query = { userId: userId };
  const result = await userSchema.find(query);
  return result[0];
};

exports.update = async (userId, data) => {
  const query = { userId: userId };
  let { password, ...updatedData } = data;
  if (data.password) {
    const hashedPassword = bcryptjs.hashSync(data.password);
    updatedData.password = hashedPassword;
  }
  const result = await userSchema.updateMany(query, updatedData);
  return result;
};

exports.deleteUser = async (userId) => {
  const query = { userId: userId };
  const result = await userSchema.deleteOne(query);
  return result;
};
