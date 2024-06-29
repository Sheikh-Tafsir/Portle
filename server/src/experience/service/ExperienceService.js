const ExperienceModel = require("../model/ExperienceModel");

//create
const createExperience = async ( userId, company, position, dates, description ) => {
    try {
            const experience = await ExperienceModel.findOne({
                where: {
                    userId: userId,
                    company: company,
                    position: position,
                }
            });
            
            if (experience) {
                return { message: "Experience already exists" }
            }

            const newExperience = await ExperienceModel.create({
                userId: userId,
                company: company,
                position: position,
                dates: dates,
                description: description,
            });

            return { message: "Experience created" }

    } catch (error) {
        console.error("Error creating experience:", error.message);
        //throw new Error("error.messager");
        return {
            message: error.message,
        };
    }
};

const geExperienceByUserId = async (userId) => {
    try{
        const experiences = await ExperienceModel.findAll({
            where: {
                userId: userId,
            }
        });
        return { 
            message: "Experience Found",
            experiences: experiences,
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
    createExperience,
    geExperienceByUserId,
}