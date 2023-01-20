const { Assessment } = require(`../database/models`);

exports.submit = async (assessment) => {
  // use the sequelize model Assessments from packages/api/src/database/models to save
  // the assessment data in the PostgreSQL database

  const data = await Assessment.create({
    catDateOfBirth: assessment.assessment.dateOfBirth,
    catName: assessment.assessment.name,
    instrumentType: 1,
    riskLevel: `0`,
    score: assessment.assessment.score,

  });

  await data.save();
};

exports.getList = async () => {
  // use the sequelize model Assessments from packages/api/src/database/models to fetch
  // the assessment data from the PostgreSQL database
  const assessments = await (await Assessment.findAll()).map(assessment => assessment.dataValues);

  return assessments;
};
