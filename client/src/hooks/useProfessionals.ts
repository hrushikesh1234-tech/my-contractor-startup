import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Professional, ProfessionalFilter } from "@/lib/types";

export function useProfessionals(filters?: ProfessionalFilter) {
  // Build query params
  const queryParams = new URLSearchParams();
  
  if (filters) {
    if (filters.profession) queryParams.append("profession", filters.profession);
    if (filters.location) queryParams.append("location", filters.location);
    if (filters.specialization) queryParams.append("specialization", filters.specialization);
    if (filters.sortBy) queryParams.append("sortBy", filters.sortBy);
    if (filters.search) queryParams.append("search", filters.search);
  }
  
  const queryString = queryParams.toString();
  const url = `/api/professionals${queryString ? `?${queryString}` : ''}`;
  
  return useQuery<Professional[]>({
    queryKey: ["professionals", filters],
    queryFn: () => fetch(url, { credentials: "include" }).then(res => res.json()),
  });
}

export function useFeaturedProfessionals(profession?: string, limit?: number) {
  // Build query params
  const queryParams = new URLSearchParams();
  
  if (profession) queryParams.append("profession", profession);
  if (limit) queryParams.append("limit", limit.toString());
  
  const queryString = queryParams.toString();
  const url = `/api/professionals/featured${queryString ? `?${queryString}` : ''}`;
  
  return useQuery<Professional[]>({
    queryKey: ["featuredProfessionals", profession, limit],
    queryFn: () => fetch(url, { credentials: "include" }).then(res => res.json()),
  });
}

export function useProfessional(id: number | string | undefined) {
  return useQuery<Professional>({
    queryKey: [`/api/professionals/${id}`],
    enabled: !!id,
  });
}

export function useCreateProfessional() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/professionals", data).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professionals"] });
    },
  });
}

export function useProfessionalReviews(professionalId: number | string | undefined) {
  return useQuery({
    queryKey: [`/api/professionals/${professionalId}/reviews`],
    enabled: !!professionalId,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ professionalId, data }: { professionalId: number, data: any }) => 
      apiRequest("POST", `/api/professionals/${professionalId}/reviews`, data).then(res => res.json()),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [`/api/professionals/${variables.professionalId}/reviews`] });
      queryClient.invalidateQueries({ queryKey: [`/api/professionals/${variables.professionalId}`] });
    },
  });
}
