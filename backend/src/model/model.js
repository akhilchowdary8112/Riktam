const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb+srv://akhilchowdary8112:Akhil2001@cluster0.2hy0plg.mongodb.net/Riktam?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .catch((e) => {
    throw Error("Error connecting to MongoDB: " + e);
  });
const schema = {
  name: String,
  email: { type: String, unique: true },
  password: String,
  securityquestion: String,
  answer: String,
  type: String,
};
const problemschema = {
  title: String,
  description: String,
  comments: { type: Array, default: [] },
  postedby: String,
  date: String,
  time: String,
  location:String,
  attachment: String,
  createddate:{type: Date,default:Date.now},
  status: {type:String,default:"Open"},
  likes:{type:String,default:0},
  likedby:{type:Array,default:[]}
};
let signuporloginSchema = mongoose.Schema(schema, {
  collection: "users",
});
let problems = mongoose.Schema(problemschema, {
  collection: "problems",
});
exports.signuporloginmodel = mongoose.model("users", signuporloginSchema);
exports.problemmodel = mongoose.model("problems", problems);
