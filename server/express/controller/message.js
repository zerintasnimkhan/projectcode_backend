const { db } = require("../model/Message");

exports.getMessages = async (req, res) => {
  try {
    res.status(200).json(db);
  } catch (error) {
    res.status(404).json("Not Found");
  }
};

exports.postMessages = async (req, res) => {
  try {
    const { message ,date} = req.body;
    console.log(message);
    db.msgs.push({ message, date });
    res.status(200).json("successfully created");
  } catch (err) {
    res.status(404).json("Not Found");
  }
};
