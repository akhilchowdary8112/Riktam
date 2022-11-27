let server = require("../service/server");
exports.getLogin = async function (req, res) {
  try {
    let data = await server.getLogin(req.body);
    if (data.status === "Login Successfull") {
      return res.status(200).json(data);
    } else {
      return res.status(400).json({ status: 400, message: data.message });
    }
  } catch (e) {
    return res.status(500).json({ status: 500, message: e });
  }
};
exports.UserSignUp = async function (req, res) {
  try {
    let data = await server.signup(req.body);
    return res.status(200).json({ status: 200, message: data });
  } catch (e) {
    return res.status(200).json({ status: 200, message: e });
  }
};
exports.updatepassword = async function (req, res) {
  try {
    let data = await server.updatepassword(req.body);
    return res.status(200).json({ status: 200, message: data });
  } catch (e) {
    return res.status(500).json({ status: 500, message: e });
  }
};
exports.addproblem = async function (req, res) {
  try {
    let data = await server.addproblem(req.body);
    return res.status(200).json({ status: 200, message: data });
  } catch (e) {
    return res.status(500).json({ status: 500, message: e });
  }
};
exports.addcomment = async function (req, res) {
  try {
    let data = await server.addcomment(req.body);
    return res.status(200).json({ status: 200, message: data });
  } catch (e) {
    return res.status(500).json({ status: 500, message: e });
  }
};

exports.addlike = async function (req, res) {
  try {
    let data = await server.addlikes(req.body);
    return res.status(200).json({ status: 200, message: data });
  } catch (e) {
    return res.status(500).json({ status: 500, message: e });
  }
};
exports.fetchproblems = async function (req, res) {
  try {
    let data = await server.fetchproblems(req.body);
    return res.status(200).json({ status: 200, message: data });
  } catch (e) {
    return res.status(500).json({ status: 500, message: e });
  }
};
exports.updateStatus = async function (req, res) {
  try {
    let data = await server.updateStatus(req.body);
    return res.status(200).json({ status: 200, message: data });
  } catch (e) {
    return res.status(500).json({ status: 500, message: e });
  }
};
