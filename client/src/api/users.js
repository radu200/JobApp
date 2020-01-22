import { instanceAPI } from "./InstanceApi";

export const getCandidates = async (
  location,
  category,
  experienceMax,
  page,
) => {
  const url = `/api/candidate-search?location=${location}&category=${category}&experience_max=${experienceMax}&page=${page}`;
  const res = await instanceAPI.get(url);
  return res.data;
};
export const getCandidateDetails = async id => {
  const res = await instanceAPI.get(`/api/candidate-details?id=${id}`);
  return res.data;
};

export const deleteProfile = async () => {
  const res = await instanceAPI.post(`/api/profile/delete`);
  return res
} 