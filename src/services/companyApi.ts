import axios from "axios";
import { Company } from "../types/Company";
import { Location } from "../types/Location";
import { Revenue } from "../types/Revenue";

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

export const getRevenue = async (): Promise<Revenue[]> => {
  const response = await axios.get(`${API_URL}/companies/revenues`);
  return response.data;
};
export const getRevenueByCompany = async (companyId: number): Promise<Revenue[]> => {
  const response = await axios.get(`${API_URL}/companies/${companyId}/revenues`);
  return response.data;
};
