import axios from "axios";
import { Company } from "../types/Company";
import { Location } from "../types/Location";

const API_URL = "http://localhost:8000/api";

export const getCompanies = async (filters?: any): Promise<Company[]> => {
  const response = await axios.get(`${API_URL}/companies?${filters}`);
  return response.data;
};

export const getCompanyById = async (companyId: number): Promise<Company> => {
  const response = await axios.get(`${API_URL}/companies/${companyId}`);
  return response.data;
};

export const getLocationsByCompanyId = async (companyId: number): Promise<Location[]> => {
  const response = await axios.get(`${API_URL}/companies/${companyId}/locations`);
  return response.data;
};
