const {
    create,
    login,
    getAll,
    getInfo,
    update,
    deleteUser,
  } = require("../../Services/v1/user.service");
  const { generateToken } = require("../../utils/v1/token");
  
  exports.createUser = async (req, res) => {
    try {
      let data = req.body;
      const result = await create(data);
      res.status(200).json({
        status: "success",
        message: "New User Created Successfully!",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "User Couldn't Be Created!",
        error: error.message,
      });
    }
  };
  
  exports.login = async (req, res) => {
    try {
      let { userName, password } = req.body;
  
      if (!userName || !password) {
        return res.status(400).json({
          status: "error",
          error: error.message,
        });
      }
  
      let result = await login(userName);
      if (!result) {
        return res.status(400).json({
          status: "error",
          error: "No User found!",
        });
      }
      const isPasswordValid = result.comparePassword(password, result.password);
  
      if (!isPasswordValid) {
        return res.status(400).json({
          status: "error",
          error: "Password is not correct",
        });
      }
  
      const token = generateToken(result);
  
      res.status(200).json({
        status: "success",
        message: "Welcome!!",
        data: { token },
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "Login Error pls Check The Data",
        error: error.message,
      });
    }
  };
  
  exports.session = async (req, res, next) => {
    try {
      const result = await login(req.user?.userName);
      let data;
      if (req.user?.userName === result.userName) {
        data = {
          userName: result.userName,
          role: result.role,
          name: result.name,
          status: result.status,
          imgURL: result.imgURL,
          userId: result.userId,
        };
      }
      res.status(200).json({
        status: "success",
        data: data,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "Get Agent Data couldn't Acquired",
        error: error.message,
      });
    }
  };
  
  exports.getAllUser = async (req, res, next) => {
    try {
      const result = await getAll(req.query);
      let filterData = [];
      if (Object.keys(req.query)[0] === "search") {
        filterData = result.filter((user) => {
          const name = user.name.toLowerCase();
          return name.includes(req.query.search.toLowerCase());
        });
      } else {
        filterData = result;
      }
      let data = [];
      filterData.forEach((Element) => {
        data.push({
          userId: Element.userId,
          userName: Element.userName,
          name: Element.name,
          imgURL: Element.imgURL,
          status: Element.status,
          role: Element.role,
          createdAt: Element.createdAt,
          updatedAt: Element.updatedAt,
        });
      });
      res.status(200).json({
        status: "success",
        message: "All User Data Acquired Successfully!",
        data: data,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "All User Data Couldn't Acquired Unsuccessful!",
        error: error.message,
      });
    }
  };
  
  exports.getUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
      const result = await getInfo(userId);
      result
        ? res.status(200).json({
            status: "success",
            message: "User Data get Successfully",
            data: result,
          })
        : res.status(404).json({
            status: "not-found",
            message: "No User Data Found",
          });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "Can't get User Data an error occurred",
        error: error.message,
      });
    }
  };
  
  exports.updateUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
      let data = req.body;
      const result = await update(userId, data);
  
      if (result.modifiedCount > 0) {
        res.status(200).json({
          status: "success",
          message: "User Data Updated Successfully",
          data: result,
        });
      } else {
        res.status(404).json({
          status: "not-Found",
          message: "No User Found To Update!",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "User couldn't update an error occurred",
        error: error.message,
      });
    }
  };
  
  exports.deleteUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
      const result = await deleteUser(userId);
  
      if (result.deletedCount > 0) {
        res.status(200).json({
          status: "success",
          message: "User Data is deleted",
          data: result,
        });
      } else {
        res.status(404).json({
          status: "not-found",
          message: "No User Found To Delete!",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "Can't deleted User Data an error occurred",
        error: error.message,
      });
    }
  };
  