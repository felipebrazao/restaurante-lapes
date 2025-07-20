import axios, { type AxiosPromise } from "axios"
import type { foodData } from "../Components/Interface/FoodData";
import { useQuery } from "@tanstack/react-query";
const API_URL = 'http://localhost:8080';

const FetchData = async(): AxiosPromise<foodData[]>=>{
    const response= axios.get(API_URL + '/Food')
    return response;
}

export function UseFoodsData(){
   const query = useQuery({
    queryFn: FetchData,
    queryKey: [''],
    retry:2
   })
   return{
    ...query,
    data:query.data?.data,
   }
} 