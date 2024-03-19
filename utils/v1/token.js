const jwt = require("jsonwebtoken");

exports.generateToken = (agentInfo) => {
  const payLoad = {
    name: agentInfo.name,
    imgURL: agentInfo.imgURL,
    userName: agentInfo.userName,
    role: agentInfo.role,
    agentId: agentInfo.agentId,
  };

  const token = jwt.sign(payLoad, process.env.TOKEN_SECRET, {
    expiresIn: "30days",
  });

  return token;
};
