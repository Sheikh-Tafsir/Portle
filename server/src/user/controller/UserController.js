const UserService = require('../service/UserService');
//get list of users
const getAllUsers = async (req, res) => {
  //console.log(req.body);
  try {
    const userService = await UserService.getAllUsers();
    //console.log(userService);
    res.status(200).json(userService);

  } catch (error) {
    console.error("Error getting all users:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getUsersById = async (req, res) => {
  //console.log(req.body);
  try {
    const id = req.params.id;
    const userService = await UserService.getUsersById(id);
    res.status(200).json(userService);
  } catch (error) {
    console.error("Error getting user by Id:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getUsersByUsername = async (req, res) => {
  //console.log(req.body);
  try {
    const username = req.params.username;
    const userService = await UserService.getUsersByUsername(username);
    res.status(200).json(userService);
  } catch (error) {
    console.error("Error getting user by username:", error.message);
    res.status(500).json({ error: error.message });
  }
};


//update usre info
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      designation,
      github, cvJson, image
    } = req.body;

    const userService = await UserService.updateUser(id, name, designation, github, cvJson, image);

    if (userService.message == "User Profile updated") res.status(200).json(userService);
    else res.status(404).json(userService);

  } catch (error) {
    console.error('Error updating user profile:', error.message);
    res.status(500).json({ error: error.message });
  }
};

//delete
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const userService = await UserService.deleteProfile(id);

    res.status(200).json(userService);

  } catch (error) {
    console.error('Error deleting user profile:', error.message);
    res.status(500).json({ error: error.message });
  }
};


//ExtarctInformationFromCv
const extarctInformationFromCv = async (req, res) => {
  try {
    const id = req.params.id;
    //console.log(req.body.cv);
    // const cleanedData = req.body.cv.replace(/^```\s*|\s*```$/g, '');
    const cleanedData = req.body.cv.trim()
      .replace(/^```json\s*/, '')
      .replace(/```$/, '')
      .trim();

    // Parse the cleaned string to a JSON object
    const data = JSON.parse(cleanedData);

    const { information, projects, experience } = data;
    const userService = await UserService.extarctInformationFromCv(id, information, projects, experience, data);

    res.status(200).json(userService);

  } catch (error) {
    console.error('Error extracting information from CV:', error.message);
    res.status(500).json({ error: error.message });
  }
};


//ExtarctInformationFromGithub
const extarctInformationFromGithub = async (req, res) => {
  try {
    const id = req.params.id;

    const { github } = req.body;
    const userService = await UserService.extarctInformationFromGithub(id, github);

    res.status(200).json(userService);

  } catch (error) {
    console.error('Error extracting information from Github:', error.message);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getAllUsers,
  getUsersById,
  getUsersByUsername,
  updateUser,
  deleteUser,
  extarctInformationFromCv,
  extarctInformationFromGithub,
}
