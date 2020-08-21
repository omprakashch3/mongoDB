//GET ALL PUBLISHED BACKEND AND FRONTEND COURSES.SORT THEM BY PRICE IN DESCENDING ORDER.PICH THEIR NAME & AUTHOR ONLY

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongoEx1");

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return await Course.find({
    isPublished: true,
    tags: { $in: ["frontend", "backend"] },
  })
    .sort({ price: -1 })
    .select({ 'name author'});
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
