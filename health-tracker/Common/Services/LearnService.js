import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// CREATE operation - new lesson with Name
export const createLesson = (Name) => {
  console.log("Creating: ", Name);
  const Lesson = Parse.Object.extend("Lesson");
  const lesson = new Lesson();
  // using setter to UPDATE the object
  lesson.set("name", Name);
  return lesson.save().then((result) => {
    // returns new Lesson object
    return result;
  });
};

// READ operation - get lesson by ID
export const getById = (id) => {
  const Lesson = Parse.Object.extend("Lesson");
  const query = new Parse.Query(Lesson);
  return query.get(id).then((result) => {
    // return Lesson object with objectId: id
    return result;
  });
};

// READ operation - get all lessons in Parse class Lesson
export const getAllLessons = (myPost) => {
  const Lesson = Parse.Object.extend("Lesson");
  const query = new Parse.Query(Lesson);
  query.equalTo("post", myPost);
  return query.find().then((results) => {
    // returns array of Lesson objects
    return results;
  });
};

// DELETE operation - remove lesson by ID
export const removeLesson = (id) => {
  const Lesson = Parse.Object.extend("Lesson");
  const query = new Parse.Query(Lesson);
  return query.get(id).then((lesson) => {
    lesson.destroy();
  });
};

