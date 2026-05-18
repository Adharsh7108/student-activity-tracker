import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "../services/api";

export const useActivities = (search = "") =>
  useQuery({
    queryKey: ["activities", search],
    queryFn: async () => {
      const res = await API.get(`/activities?search=${search}`);
      return res.data;
    },
  });

export const useSummary = () =>
  useQuery({
    queryKey: ["summary"],
    queryFn: async () => {
      const res = await API.get("/summary");
      return res.data;
    },
  });

export const useMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await API.get("/auth/me");
      return res.data;
    },
  });

const invalidateAll = (queryClient) => {
  queryClient.invalidateQueries({ queryKey: ["activities"] });
  queryClient.invalidateQueries({ queryKey: ["summary"] });
};

export const useAddActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => API.post("/activities", data).then((r) => r.data),
    onSuccess: () => invalidateAll(queryClient),
  });
};

export const useUpdateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => API.put(`/activities/${id}`, data).then((r) => r.data),
    onSuccess: () => invalidateAll(queryClient),
  });
};

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => API.delete(`/activities/${id}`),
    onSuccess: () => invalidateAll(queryClient),
  });
};