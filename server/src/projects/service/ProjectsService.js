const axios = require("axios");
const ProjectsModel = require("../model/ProjectsModel");

//create
const createProject = async (userId, name, technology, image, description) => {
    try {
            const project = await ProjectsModel.findOne({
                where: {
                    userId: userId,
                    name: name,
                }
            });
            
            if (project) {
                return { message: "Project already exists" }
            }

            const newProject = await ProjectsModel.create({
                userId: userId,
                name: name,
                technology: technology,
                image: image,
                description: description,
            });

            return { message: "Project created" }

    } catch (error) {
        console.error("Error creating project:", error.message);
        //throw new Error("error.messager");
        return {
            message: error.message,
        };
    }
};

//create
const createProjectFromGithubLink = async (userId, githubProjectLink) => {
    try {
            const link = await transformGitHubUrl(githubProjectLink);
           
            const project = await ProjectsModel.findOne({
                where: {
                    userId: userId,
                    link: link,
                }
            });
            
            if (project) {
                return { message: "Project already exists" }
            }

            const projectObj = await getGithubProjectDetails(link);
            console.log(projectObj);

            const newProject = await ProjectsModel.create({
                userId: userId,
                name:  projectObj.name,
                technology: projectObj.language,
                image: null,
                description: projectObj?.topics.join(" ") || null,
            });

            return { message: "Project created" }

    } catch (error) {
        console.error("Error creating project from github Link:", error.message);
        //throw new Error("error.messager");
        return {
            message: error.message,
        };
    }
};

const getProjectByUserId = async (userId) => {
    try{
        const projects = await ProjectsModel.findAll({
            where: {
                userId: userId,
            }
        });
        return { 
            message: "Project Found",
            projects: projects,
        }

    }catch (error) {
        console.error("Error getting project:", error.message);
        //throw new Error("error.messager");
        return {
            message: error.message,
        };
    }
}

const transformGitHubUrl = async (url) =>{
    const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/]+)/;
    const match = url.match(regex);
  
    if (match) {
      const username = match[1];
      const project = match[2];
      return `https://api.github.com/repos/${username}/${project}`;
    } else {
      throw new Error('Invalid GitHub URL');
    }
}

const getGithubProjectDetails = async (link) => {  
    try{
        const apipath = `${link}`;
        const response = await axios.get(apipath)
        console.log(response.data);
        return response.data;
    }
    catch(error){
        console.log(error.message);

    };
} 

module.exports = {
    createProject,
    createProjectFromGithubLink,
    getProjectByUserId,
}