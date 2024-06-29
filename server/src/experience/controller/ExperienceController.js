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

//create
const geExperienceByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const experienceService = await ExperienceService.geExperienceByUserId(userId);
        res.status(200).json(experienceService);
    } catch (error) {
        console.error("Error getting experiences:", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createExperience,
    geExperienceByUserId,
}