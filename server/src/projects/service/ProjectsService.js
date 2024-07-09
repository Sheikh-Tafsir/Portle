const axios = require("axios");
const ProjectsModel = require("../model/ProjectsModel");

//create
const createProject = async (userId, name, technology, image, description, githublink) => {
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
                technology: technology || null,
                image: image || null,
                description: description || null,
                githublink: githublink || null,
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
const createProjectFromGithubLink = async (userId, githublink) => {
    try {
            const link = await transformGitHubUrl(githublink);
           
            const project = await ProjectsModel.findOne({
                where: {
                    userId: userId,
                    githublink: githublink
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
                livelink: projectObj?.homepage || null,
                githublink: githublink || null,
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

//update
const updateProject = async (id, name, technology, description, githublink, livelink) => {
    try {
            const project = await ProjectsModel.findOne({
                where: {
                    id: id,
                }
            });
            
            if (!project) {
                return { message: "Project don't exists" }
            }

            if(name)project.name = name;
            if(technology)project.technology = technology;
            if(description)project.description = description;
            if(githublink)project.githublink = githublink;
            if(livelink)project.livelink = livelink;
            await project.save();

            return { message: "Project updated" }

    } catch (error) {
        console.error("Error updating project:", error.message);
        //throw new Error("error.messager");
        return {
            message: error.message,
        };
    }
};

//delete
const deleteProject = async (id) =>{
    try{
        const result = await ProjectsModel.destroy({
            where: { id: id }
        });

        if (result === 0) {
            return {
                message: 'Project not found',
            };
        }

        return {
            message: 'Project deleted successfully',
        };
    }catch (error) {
        console.error("Error deleting project:", error.message);
        //throw new Error("error.messager");
        return {
            message: error.message,
        };
    }
}

const deleteAllProjectsByUserId = async (userId) => {
    try {
        const result = await ProjectsModel.destroy({
            where: { userId: userId }
        });

        if (result === 0) {
            return {
                message: 'Projects not found',
            };
        }

        return {
            message: 'Projects deleted successfully',
        };
    } catch (error) {
        console.error("Error deleting projects:", error.message);
        return {
            message: error.message,
        };
    }
}


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

const getProjectById = async (id) => {
    try{
        const projects = await ProjectsModel.findAll({
            where: {
                id: id,
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

const getGithubProjectDetails = async (githublink) => {  
    try{
        const apipath = `${githublink}`;
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
    updateProject,
    deleteProject,
    deleteAllProjectsByUserId,
    getProjectById,
    getProjectByUserId,
    
}