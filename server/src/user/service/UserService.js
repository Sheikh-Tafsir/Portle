const UserModel = require("../model/UserModel");
const ProjectService = require("../../projects/service/ProjectsService");
const ExperienceService = require("../../experience/service/ExperienceService");
const { Op } = require('sequelize');
const axios = require('axios');
// const redis = require('../../../config/redisConfig');

    const getAllUsers = async() =>{
        console.log("hi")
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
            // console.log("eikhane ase");

            var imageUrl = "";

            if(github){
                // console.log("dhukse function e")
                var githubUsername;
                const match = github.match(/github\.com\/([^\/]+)/);
                if (match) {
                    githubUsername = match[1];
                }
                else {
                    githubUsername = github; 
                }

                // console.log("tarpor");
                console.log(githubUsername);
                const existingUserWithName = await UserModel.findOne({ where: {github:githubUsername, id: { [Op.ne]: id } } });
                if (existingUserWithName) {
                    return { message: "Github name already exists" };
                }
                // console.log("eitao");
                const userObj = await getGithubDetails(githubUsername);
                imageUrl =  userObj.avatar_url;
            }
            // console.log(id);
            // console.log(name);
            // console.log(designation);
            // console.log(github);
            // console.log(cvJson);
            // console.log(imageUrl);

            // Update the user profile
            const updatedUser = await UserModel.update(
            {
                name: name,
                designation: designation,
                ...(github && { github: github }),
                ...(cvJson && { cv: cvJson }),
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
            console.log(id);
            console.log(information)
            console.log(cvJson);
            const updateUserInfo = await updateUser(id, information.name, information.designation, information.github, cvJson);
            console.log(updateUserInfo.message);
            console.log();
            if(updateUserInfo.message != "User Profile updated"){
                return {
                    message: updateUserInfo.message,
                }
            }

            let ret1 = updateUserInfo.message;
            let ret2 = "";
            let ret3 = "";

            if(projects && projects.length > 0){
                for (const project of projects) {
                    const createResult = await ProjectService.createProjectFromCv(id, project.name, project.technologies.join(', '), '', project.description.join(' '));
                    ret2 = createResult.message;
                }
            }

            if(experiences && experiences.length > 0){
                for (const experience of experiences) {
                    const createResult = await ExperienceService.createExperience(id, experience.company, experience.position, experience.dates, experience.description.join(' '));
                    ret3 = createResult.message;
                }
            }

            //console.log(`${ret1} ${ret2.trim()} ${ret3.trim()}`)
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

    const extarctInformationFromGithub = async (id, github) => {
        try {
            console.log(id);
            console.log(github);
            var information = [];
            var githubUsername;
            if(github){
                console.log("dhukse function e")
                
                const match = github.match(/github\.com\/([^\/]+)/);
                if (match) {
                    githubUsername = match[1];
                }
                else {
                    githubUsername = github; 
                }

                // console.log("tarpor");
                console.log(githubUsername);
            }

            information = await getGithubDetails(githubUsername);
            
            const updateUserInfo = await updateUser(id, information.name, information.bio, github, null);
            console.log(updateUserInfo.message);

            if(updateUserInfo.message != "User Profile updated"){
                return {
                    message: updateUserInfo.message,
                }
            }

            let ret1 = updateUserInfo.message;

            const createResult = await ExperienceService.createExperience(id, information.company, "", "", "");
            let ret2 = createResult.message;
            
            
        } catch (error) {
            console.error("Error updating profile:", error.message);
            //throw new Error("Internal server error");
            return {
                message: error.message,
            };
        }
    };

    const getGithubDetails = async (githubUsername) => {  
        try{
  
            const apipath = `https://api.github.com/users/${githubUsername}`;
            const response = await axios.get(apipath)
            // console.log(response.data.avatar_url);
            return response.data;
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
    extarctInformationFromGithub,
    getGithubDetails,
}