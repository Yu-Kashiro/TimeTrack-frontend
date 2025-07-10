import { client } from "./client";
import { getAuthHeaders } from "../utils/getAuthHeaders";
import type { WorkTimeAPIRequest } from "@/types/workTimeAPIRequest";

export const getWorkTimesAll = () => {
  const headers = getAuthHeaders();
  if (!headers) return;

  return client.get("/work_times", { headers });
};

export const getWorkTime = (id: string) => {
  const headers = getAuthHeaders();
  if (!headers) return;

  return client.get(`/work_times/${id}`, { headers });
};

export const createWorkTime = (params: WorkTimeAPIRequest) => {
  const headers = getAuthHeaders();
  if (!headers) return;

  return client.post("/work_times", params, { headers });
};

export const updateWorkTime = (id: string, params: WorkTimeAPIRequest) => {
  const headers = getAuthHeaders();
  if (!headers) return;

  return client.put(`/work_times/${id}`, params, { headers });
};

export const deleteWorkTime = (id: string) => {
  const headers = getAuthHeaders();
  if (!headers) return;

  return client.delete(`/work_times/${id}`, { headers });
};
