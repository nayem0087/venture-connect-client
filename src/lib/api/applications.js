import { serverFetch } from "../core/server";

export const getApplicationsByApplicant = async (applicantEmail) => {
    return serverFetch(`/api/applications?applicantEmail=${applicantEmail}`);
}