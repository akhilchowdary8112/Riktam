const db = require("../model/db");
exports.getLogin = async function (reqbody) {
  try {
    let data = await db.getLoginInfo(reqbody);
    return data;
  } catch (e) {
    throw Error("Failed in Transaction:", e);
  }
};
exports.signup = async function (reqbody) {
  try {
    let data = await db.postsignup(reqbody);
    return data;
  } catch (e) {
    return e;
  }
};
exports.updatepassword = async function (reqbody) {
  try {
    let data = await db.updatepassword(reqbody);
    return data;
  } catch (e) {
    return e;
  }
};
exports.addproblem = async function (reqbody) {
  try {
    let data = await db.addproblem(reqbody);
    return data;
  } catch (e) {
    return e;
  }
};
exports.addcomment = async function (reqbody) {
  try {
    let data = await db.addcomment(reqbody);
    return data;
  } catch (e) {
    return e;
  }
};
exports.addlikes=async function(reqbody){
  try {
    let data = await db.addlikes(reqbody);
    return data;
  } catch (e) {
    return e;
  }
}
exports.fetchproblems = async function (reqbody) {
  try {
    let data = await db.fetchproblems(reqbody);
    return data;
  } catch (e) {
    return e;
  }
};
exports.updateStatus = async function (reqbody) {
  try {
    let data = await db.updateStatus(reqbody);
    return data;
  } catch (e) {
    return e;
  }
};
