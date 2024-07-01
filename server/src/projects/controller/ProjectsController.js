const ProjectsService = require('../service/ProjectsService');

//create
const createProject = async (req, res) => {
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
        const { githubProjectLink } = req.body;
        const projectsService = await ProjectsService.createProjectFromGithubLink(userId, githubProjectLink);
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
        const userId = req.params.id;
        const projectsService = await ProjectsService.getProjectByUserId(userId);
        res.status(200).json(projectsService);
    } catch (error) {
        console.error("Error getting projects:", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createProject,
    getProjectByUserId,
    createProjectFromGithubLink
}