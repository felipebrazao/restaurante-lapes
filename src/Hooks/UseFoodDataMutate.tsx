import axios, { type AxiosPromise } from "axios"
import type { foodData } from "../Components/Interface/FoodData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const API_URL = 'http://localhost:8080';

const postData = async (data: foodData): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/Food', data)
    return response;
}

export function UseFoodDataMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['Food-data'] });
        }
    })
    return mutate;
} 