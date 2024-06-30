const UserModel = require("../model/UserModel");
const ProjectService = require("../../projects/service/ProjectsService");
const ExperienceService = require("../../experience/service/ExperienceService");
const { Op } = require('sequelize');
const axios = require('axios');
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

    const getUsersByUsername = async( username ) =>{
        try{
            const user = await UserModel.findOne({
                where: {
                    username: username,
                },
                attributes: { exclude: ['password'] }
            });
            return {
                message: "found user by username",
                user:user
            };
        } catch (error) {
            console.error("Error getting user by username:", error.message);
            //throw new Error("Internal server error");
            return {
                message: error.message,
            };
        }
    };

    //update
    const updateUser = async (id, name, designation, github, cvJson) => {
        try {
            // Check if the provided name already exists for another user
            var imageUrl = "";

            if(github){
                const existingUserWithName = await UserModel.findOne({ where: {github: github, id: { [Op.ne]: id } } });
                if (existingUserWithName) {
                    return { message: "Github name already exists" };
                }
            }

            if(github){
                const githubUsername = github.match(/github\.com\/([^\/]+)/)[1];
                console.log(githubUsername);
                imageUrl = await getGithubDetails(githubUsername);
                console.log(imageUrl);
            }

            // Update the user profile
            const updatedUser = await UserModel.update(
            {
                name: name,
                designation: designation,
                ...(github && { github: github }),
                ...(cvJson && { cvJson: cvJson }),
                ...(imageUrl != "" && {image: imageUrl}),
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

    const extarctInformationFromCv = async (id, information, projects, experiences, cvJson) => {
        try{
            // Update user information
            const updateUserInfo = await updateUser(id, information.name, information.designation, information.github, cvJson);
            if(updateUserInfo.message != "User Profile updated"){
                return {
                    message: updateUserInfo.message,
                }
            }

            let ret1 = updateUserInfo.message;
            let ret2 = "";
            let ret3 = "";

            for (const project of projects) {
                const createResult = await ProjectService.createProject(id, project.name, project.technologies.join(', '), '', project.description.join(' '));
                ret2 = createResult.message;
            }

            for (const experience of experiences) {
                const createResult = await ExperienceService.createExperience(id, experience.company, experience.position, experience.dates, experience.description.join(' '));
                ret3 = createResult.message;
            }
            return {
                message: `${ret1} ${ret2.trim()} ${ret3.trim()}`
            };

        }
        catch (error) {
            console.error("Error extracting information from CV:", error.message);
            return {
                message: error.message,
            };
        }
    }

    const getGithubDetails = async (githubUsername) => {  
        try{
  
            const apipath = `https://api.github.com/users/${githubUsername}`;
            const response = await axios.get(apipath)
            // console.log(response.data.avatar_url);
            return response.data.avatar_url;
        }
        catch(error){
            console.log(error.message);

        };
    }   


module.exports = {
    getAllUsers,
    getUsersById,
    getUsersByUsername,
    updateUser,
    deleteUser,
    extarctInformationFromCv,
    getGithubDetails,
}