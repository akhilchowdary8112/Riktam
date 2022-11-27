const { signuporloginmodel, problemmodel } = require("./model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});
const options = {
  use_filename: false,
  unique_filename: true,
  overwrite: true,
};
exports.getLoginInfo = async ({ email, password }) => {
  let result = await signuporloginmodel.find({ email: email });
  let pswd = result[0].password;
  let res = await decrypthash(password, pswd);
  if (res) {
    return { status: "Login Successfull", result };
  } else {
    let err = new Error("Invalid credentials or No record found");
    err.status = 404;
    return err;
  }
};
exports.postsignup = async (reqbody) => {
  let res = await hashpassword(reqbody);
  return res;
};
exports.addproblem = async (reqbody) => {
  const {title,description,postedby,createddate,time,date,location,attachment}=reqbody;
  try{
    const result = await cloudinary.uploader.upload(attachment, options);
    let res = await problemmodel.create({title,description,postedby,createddate,time,date,location,attachment:result.url});
    return res;
  }catch(err){
    return err;
  }
};
exports.addcomment = async (reqbody) => {
  let res = await problemmodel.updateOne(
    { _id: reqbody._id },
    { $push: { comments: reqbody.comments } }
  );
  return res;
};
exports.addlikes = async (reqbody) => {
  let res = await problemmodel.updateOne(
    { _id: reqbody._id },
    {$set: {likes: Number(reqbody.likes)+1,likedby:reqbody.likedby}}
  );
  return res;
};
exports.fetchproblems = async () => {
  let res = await problemmodel.find().sort({ posttime: -1 });
  return res;
};
exports.updatepassword = async ({ _id, password }) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, h) {
      if (err) {
        resolve("error");
      } else {
        signuporloginmodel
          .updateOne({ _id: _id }, { $set: { password: h } })
          .then((result) => {
            resolve("Password Updated successfully");
          })
          .catch((err) => {
            resolve("error");
          });
      }
    });
  });
};
async function hashpassword({
  email,
  password,
  name,
  securityquestion,
  answer,
  type,
}) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, h) {
      if (err) {
        resolve("error");
      } else {
        signuporloginmodel
          .create({
            email,
            password: h,
            name,
            securityquestion,
            answer,
            type,
          })
          .then((result) => {
            resolve("User created successfully");
          })
          .catch((err) => {
            resolve("error");
          });
      }
    });
  });
}
async function decrypthash(password, h) {
  return new Promise((resolve) => {
    bcrypt.compare(password, h, function (err, result) {
      if (err) resolve("err");
      resolve(result);
    });
  });
}
exports.updateStatus = async (reqbody) => {
  let res = await problemmodel.updateOne(
    { _id: reqbody.id },
    {$set: {status:reqbody.status}}
  );
  return res;
};