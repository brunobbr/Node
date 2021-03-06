import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";



/**
 * 12345678910
 * detratores => 0-6
 * passivos => 7-8
 * promotores => 9-10
 * os passivos são removidos
 * (Número de promotores - Número de detratores) / (número de respondentes) x 100
 */



class NpsController {
    async execute(request: Request, response: Response){
        const { survey_id } = request.params;
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        const surveysUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull())
        });

        const detractor = await surveysUsers.filter(
            (survey) => survey.value >= 0 && survey.value <= 6 
        ).length;

        const promoters = surveysUsers.filter(
            (survey) => survey.value >= 9 &&  survey.value <= 10
        ).length;
        const passive = surveysUsers.filter(
            (survey) => survey.value >= 7 &&  survey.value <= 8
        ).length;

        const totalAnswers = surveysUsers.length;
        const calculate = Number(((promoters - detractor ) / totalAnswers) * 100).toFixed(2);
        return response.json({
            detractor,
            promoters,
            passive,
            totalAnswers,
            nps: calculate,
        });
    }
}

export { NpsController };