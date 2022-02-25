import SkillModel from '../database/models/SkillModel';

export const getSkillData = async (name: string) => {
  const skillData = (await SkillModel.findOne({ name })) || {
    name: 'alien',
    id: '946395757240524802',
  };

  return skillData;
};
