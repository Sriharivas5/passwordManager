const Password = require("../Model/password");

exports.createPasswords = async (req, res) => {
  try {
    const {
      userId,
      website,
      username,
      password,
    } = req.body;

    // Create a new job entry using the Job model with the provided data
    const passwords = new Password({
      userId,
      website,
      username,
      password,
    });

    // Save the job application to the database
    await passwords.save();

    // Send the saved job as a response
    res.status(201).send(passwords); // Return 201 status code for successful creation
  } catch (error) {
    // Handle any errors and send a response with a 500 status code
    res.status(500).json({
      message: "Failed to post password",
      error: error.message,
    });
  }
};


exports.getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find();

    res.status(200).json(passwords);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve  passwords",
      error: error.message,
    });
  }
};




exports.updatePassword = async (req, res) => {

  try {
    let id = req.params.id
    const updates = req.body;
    const updatedPassword = await Password.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedPassword) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).send(updatedPassword);

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete  passwords",
      error: error.message,
    });
  }

}



exports.deletePassword = async (req, res) => {

  try {
    let id = req.params.id
    const deletePassword = await Password.findByIdAndDelete(id);

    if (!deletePassword) {
      return res.status(404).json({ message: "password not found" });
    }

    res.status(200).send(deletePassword);


  } catch (error) {
    res.status(500).json({
      message: "Failed to delete  passwords",
      error: error.message,
    });
  }

}
