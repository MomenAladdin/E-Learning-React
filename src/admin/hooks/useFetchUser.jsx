import axios from "axios"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useSelector } from "react-redux"

const useFetchUser = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const api = useSelector((state) => state.apiLink.link)
    const axiosInstance = axios.create({

    });
    const fetchUsers = async () => {
        const response = await axiosInstance.get(`${api}/api/users?_limit=${perPage}&_page=${currentPage}&role=user`);
        console.log(response, 'response response')
        return response;
    };
    const { data: usersData, error: usersError, isLoading: usersLoading } = useQuery(
        ['user', currentPage, perPage], fetchUsers,
        { keepPreviousData: true }
    );
    const fetchAdmins = async () => {
        const response = await axiosInstance.get(`${api}/api/users?_limit=${perPage}&_page=${currentPage}&role=admin`);
        console.log(response, 'response response')
        return response;
    };

    const { data: adminsData, error: adminsError, isLoading: adminsLoading } = useQuery(
        ['admin', currentPage, perPage], fetchAdmins,
        { keepPreviousData: true }
    );

    const qureyClient = useQueryClient()
    const users = usersData?.data
    const admins = adminsData?.data

    const deleteAccounts = (id) => {
        return axiosInstance.delete(`${api}/users/${id}`)
    };

    const { mutate } = useMutation(deleteAccounts,
        {
            onSuccess: () => {
                qureyClient.invalidateQueries('user');
                qureyClient.invalidateQueries('admin');
            }
        }
    )

    const handleDelete = (id) => {
        mutate(id)
    }
    return {
        handleDelete, users, admins, usersError,
        adminsError,
        usersLoading,
        adminsLoading, currentPage, setCurrentPage, setPerPage
    }
}

export default useFetchUser