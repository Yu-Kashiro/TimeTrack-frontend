import { client } from "./client";
import { getAuthHeaders } from "../utils/getAuthHeaders";
import type { WorkTimeRequest } from "@/types/workTimeRequest";

type workTimeId = {
  id: number;
}

export const getWorkTimesAll = () => {
  const headers = getAuthHeaders();
  if (!headers) return;

  return client.get("/work_times", { headers });
};

export const getWorkTimes = (id: workTimeId) => {
  const headers = getAuthHeaders();
  if (!headers) return;

  return client.get(`/work_times/${id}`, { headers });
};

export const createWorkTime = (params: WorkTimeRequest) => {
  const headers = getAuthHeaders();
  if (!headers) return;

  return client.post("/work_times", params, { headers });
};

export const updateWorkTime = (id: workTimeId, params: WorkTimeRequest) => {
  const headers = getAuthHeaders();
  if (!headers) return;

  return client.put(`/work_times/${id}`, params, { headers });
};

export const deleteWorkTimes = (id: workTimeId) => {
  const headers = getAuthHeaders();
  if (!headers) return;

  return client.delete(`/work_times/${id}`, { headers });
};
