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
  const courses = await Course.find();
  console.log(courses);
}

getCourses();
