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

module.exports = {
    createProject,
    getProjectByUserId,
}