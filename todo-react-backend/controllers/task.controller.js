const Task = require("../models/task.model");
const { v4: uuidv4 } = require("uuid");
// Простая версия, без проверки и очистки
exports.test = function (req, res) {
  res.send("Привет от тестового контроллера!");
};

exports.task_create = function (req, res, next) {
  const { value, isComplete } = req.body.params;
  // console.log(req.body.params.value);
  const task = new Task({
    value: value,
    id: uuidv4(),
    isComplete: isComplete,
  });
  task.save(function (err) {
    if (err) {
      return next(err);
      // error middleware or send error /// req.status(400).json({message: 'kljlkkjl'})
    }
    res.send("Таск создался успешно :)");
  });
};

exports.task_details = async function (req, res, next) {
  const id = req.params.id;
  try {
    const foundTask = await Task.findOne({ id: id });
    console.log(foundTask);
    // res.status(404).json({ message: "task not found" });
    // res.status(200).json({ data: foundTask, message: "lkjsdfklsdjfklj" });

    // const foundTask = await new Promise(Task.findOne({ id: id }));
    if (foundTask) {
      // res.status(200).json({ data: foundTask, message: "lkjsdfklsdjfklj" });
      res.send([foundTask]);
    } else {
      res.status(404).json({ message: "task not found" });
    }
  } catch (err) {
    res.status(500).json("error");
  }
  // res.send(foundTask);
  // res.status(404).json({ message: "lkjsdfklsdjfklj" });
  // TODO 404 if not found
  //status 404, json message: {task not found}
};

exports.task_update = async function (req, res, next) {
  const id = req.params.id;
  const foundTask = await Task.findOne({ id: id });
  console.log("ASDASDSAD", foundTask.isComplete);
  console.log("ASDASDSAD", req.params.id);
  try {
    Task.updateOne(
      { id: id },
      { $set: { isComplete: !foundTask.isComplete } },
      function (err, doc) {
        res.status(200).json({ message: "запрос отработал" });
      }
    );
  } catch (err) {
    res.status(500).json("error");
  }
};
exports.task_delete = async function (req, res, next) {
  const id = req.params.id;
  try {
    const foundTask = await Task.deleteOne({ id: id });
    // console.log("foundTask: " + foundTask);
    // let a = foundTask.n;
    // if (a === 1) {
    res.status(200).json({ message: "запрос отработал" });
    // } else {
    //   res.status(404).json({ message: "task not found" });
    // }
  } catch (err) {
    res.status(500).json("error");
  }
};

//////////////////////////////////////////////////////////
// exports.tasks_get = async function (req, res, next) {
//   const tasks = await Task.find({});
//   // .then((tasks) => console.log("got tasks: ", tasks));
//   console.log("got tasks:: ", tasks);
// };

exports.tasks_get = function (req, res, next) {
  // console.log(res);
  Task.find(
    {},
    {
      _id: 0,
      __v: 0,
    },
    function (err, tasks) {
      if (err) return next(err);
      res.send(tasks);
    }
  );
};

exports.tasks_clearCompleted = function (req, res, next) {
  // console.log(res);
  Task.find(
    { isComplete: false },

    function (err, tasks) {
      if (err) return next(err);
      res.send(tasks);
    }
  );
};

//////////////////////////////////////////////////////////

// exports.tasks_get = async (req, res, next) => {
//   try {
//     const tasks = await Task.find({});
//     res.send(tasks);
//   } catch (e) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
// mongoose.set("useFindAndModify", false);
