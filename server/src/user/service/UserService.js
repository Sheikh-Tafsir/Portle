const UserModel = require("../model/UserModel");
const ProjectService = require("../../projects/service/ProjectsService");
const { Op } = require('sequelize');
// const redis = require('../../../config/redisConfig');

    const getAllUsers = async() =>{
        try{
            const user = await UserModel.findAll({
                attributes: { exclude: ['password'] } // Exclude the password field
            }); 
            return {
                message: "found all users",
                user:user
            };
        } catch (error) {
            console.error("Error getting all user:", error.message);
            //throw new Error("Internal server error");
            return {
                message: error.message,
            };
        }
    };

    const getUsersById = async( id ) =>{
        try{
            const user = await UserModel.findOne({
                where: {
                    id: id
                },
                attributes: { exclude: ['password'] }
            });
            return {
                message: "found user by id",
                user:user
            };
        } catch (error) {
            console.error("Error getting user by id:", error.message);
            //throw new Error("Internal server error");
            return {
                message: error.message,
            };
        }
    };

    //update
    const updateUser = async (id, name, designation, github) => {
        try {
            // Check if the provided name already exists for another user
            // const existingUserWithName = await UserModel.findOne({ where: {github: github, id: { [Op.ne]: id } } });
            // if (existingUserWithName) {
            //     return { message: "Github name already exists" };
            // }

            // Update the user profile
            const updatedUser = await UserModel.update(
            {
                name: name,
                designation: designation,
                ...(github && { github: github }),
            },
            { where: { id: id }, returning: true }
            );
        
            if (updatedUser[0] === 0) {
                return { message: "User not found" };
            }

            return {
                message: "User Profile updated",
                user: updatedUser[1][0]
            };
            
        } catch (error) {
            console.error("Error updating profile:", error.message);
            //throw new Error("Internal server error");
            return {
                message: error.message,
            };
        }
    };

    //delete
    const deleteUser = async (id) => {
        try {
            const deletedUser = await User.findByIdAndDelete(userId);
            return {
                message: "user deleted",
                user: deletedUser
            };
        } catch (error) {
            console.error("Error during signup:", error.message);
            //throw new Error("Internal server error");
            return {
                message: error.message,
            };
        }
    };

    const extarctInformationFromCv = async (id, information, projects) => {
        try{
            // Update user information
            const updateUserInfo = await updateUser(id, information.name, information.designation, information.github);
            if(updateUserInfo.message != "User Profile updated"){
                return {
                    message: updateUserInfo.message,
                }
            }

            let ret1 = updateUserInfo.message;
            let ret2 = "";

            for (const project of projects) {
                const createResult = await ProjectService.createProject(id, project.name, project.technologies.join(', '), '', project.description.join(' '));
                ret2 = createResult.message;
            }
            return {
                message: `${ret1} ${ret2.trim()}`
            };

        }
        catch (error) {
            console.error("Error extracting information from CV:", error.message);
            return {
                message: error.message,
            };
        }
    }


module.exports = {
    getAllUsers,
    getUsersById,
    updateUser,
    deleteUser,
    extarctInformationFromCv,
}