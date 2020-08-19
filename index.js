const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected to mongodb database.."))
  .catch((err) => console.error("couldnt connect to mongodb", err));

// creating schema in mongoose

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});
// creating classes
const Course = mongoose.model("Course", courseSchema);
// creating object based upon above class
async function createCourse() {
  const course = new Course({
    name: "react.js",
    author: "omprakash",
    tags: ["react", "frontend"],
    isPublished: true,
  });

  // saving it to database
  const result = await course.save();
  console.log(result);
}
// createCourse();
// //how to retreve document from mongoDB
async function getCourses() {
  // comparison operators in mongodB
  // gt,gte,lt,lte,ne,eq,in,nin
  // logical operators- or & and

  const courses = await Course.find({ author: "om", isPublished: true })
    // .find()
    // .or([{ author: "om" }, { isPublished: true }])
    // .and([{ author: "om" }, { isPublished: true }]) //it is similar to normal find method
    // .find({ price: { $gte: 10, $lte: 20 } })
    // .find({ price: { $in: [10, 15, 20] } })

    // regular expression
    // ex:author starts with om
    // .find({ author: /pattern/ })//syntax
    // .find({ author: /^om/ }) //starts with om
    // .find({ author: /chautala$/ }) //ends with chautala & it s case sensetive
    // .find({ author: /chautala$/i }) //its case insensetive
    // .find({ author: /.*om.*/ }) //contains "om"

    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
    .count();
  console.log(courses);
}

getCourses();
