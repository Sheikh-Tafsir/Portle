const ProjectsService = require('../service/ProjectsService');

//create
const createProjectFromCv = async (req, res) => {
    // console.log(req.body);
    try {
        const { userId, name, technology, image, description } = req.body;
        const projectsService = await ProjectsService.createProject(userId, name, technology, image, description);
        res.status(200).json(projectsService);
    } catch (error) {
        console.error("Error creating project:", error.message);
        res.status(500).json({ error: error.message });
    }
};

//create
const createProjectFromGithubLink = async (req, res) => {
    // console.log(req.body);
    try {
        const userId = req.params.userId;
        const { githublink } = req.body;
        const projectsService = await ProjectsService.createProjectFromGithubLink(userId, githublink);
        res.status(200).json(projectsService);
    } catch (error) {
        console.error("Error creating project from github link:", error.message);
        res.status(500).json({ error: error.message });
    }
};


//get
const getProjectByUserId = async (req, res) => {
    // console.log(req.body);
    try {
        const userId = req.params.userId;
        const projectsService = await ProjectsService.getProjectByUserId(userId);
        res.status(200).json(projectsService);
    } catch (error) {
        console.error("Error getting projects:", error.message);
        res.status(500).json({ error: error.message });
    }
};

//get
const getProjectById = async (req, res) => {
    // console.log(req.body);
    try {
        const id = req.params.id;
        const projectsService = await ProjectsService.getProjectById(id);
        res.status(200).json(projectsService);
    } catch (error) {
        console.error("Error getting projects:", error.message);
        res.status(500).json({ error: error.message });
    }
};

//update
const updateProject = async (req, res) => {
    // console.log(req.body);
    try {
        const id = req.params.id;
        const { name, technology, description, githublink, livelink } = req.body;
        const projectsService = await ProjectsService.updateProject(id, name, technology, description, githublink, livelink);
        res.status(200).json(projectsService);
    } catch (error) {
        console.error("Error creating project from github link:", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createProjectFromCv,
    getProjectByUserId,
    getProjectById,
    createProjectFromGithubLink,
    updateProject,
}