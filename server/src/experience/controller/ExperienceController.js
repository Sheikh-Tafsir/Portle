const ExperienceService = require('../service/ExperienceService');

//create
const createExperience = async (req, res) => {
    // console.log(req.body);
    try {
        const { userId, company, position, dates, description } = req.body;
        const experienceService = await ExperienceService.createExperience(userId, company, position, dates, description);
        res.status(200).json(experienceService);
    } catch (error) {
        console.error("Error creating experience:", error.message);
        res.status(500).json({ error: error.message });
    }
};


//update
const updateExperience = async (req, res) => {
    // console.log(req.body);
    try {
        const id = req.params.id;
        const { company, position, dates, description } = req.body;
        const experienceService = await ExperienceService.updateExperience(id, company, position, dates, description);
        res.status(200).json(experienceService);
    } catch (error) {
        console.error("Error updating experience:", error.message);
        res.status(500).json({ error: error.message });
    }
};

//get
const getExperienceByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const experienceService = await ExperienceService.getExperienceByUserId(userId);
        res.status(200).json(experienceService);
    } catch (error) {
        console.error("Error getting experiences:", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createExperience,
    updateExperience,
    getExperienceByUserId,
}