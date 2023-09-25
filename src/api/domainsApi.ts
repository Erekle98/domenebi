import { IDomain } from "@/interfaces/Market";
import axios from "axios";

const domainsApi = axios.create({
  baseURL: "http://localhost:3500",
});

export const domainsUrlEndpoint = "/domains";

export const getDomains = async () => {
  const response = await domainsApi.get(domainsUrlEndpoint);
  return response.data;
};

export const updateDomain = async (domain: IDomain) => {
  const response = await domainsApi.patch(
    `${domainsUrlEndpoint}/${domain.id}`,
    domain
  );
  return response.data;
};
