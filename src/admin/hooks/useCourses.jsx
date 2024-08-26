import axios from "axios"
import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useSelector } from "react-redux"

const useCourses = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(5)
    const [totalCourses, setTotalCourses] = useState(0);

    console.log("currentPage", currentPage);

    const axiosInstance = axios.create({

    });
    const fetchCourses = async () => {
        const response = await axiosInstance.get(`${api}/api/courses?_limit=${perPage}&_page=${currentPage}`);
        console.log(response, 'response response')
        return response;
    };
    const api = useSelector(state => state.apiLink.link)
    const { data, error, isLoading } = useQuery(['data', currentPage, perPage], fetchCourses,
        {
            keepPreviousData: true,
        })
    const courses = data?.data

    useEffect(() => {
        if (courses?.data) {
            setPerPage(10);
            setTotalCourses(courses?.data.length);
        } else {

            setPerPage(10);
        }
    }, [courses]);
    const totalPages = Math.ceil(totalCourses / perPage);
    const prev = currentPage > 1 ? currentPage - 1 : null;
    const next = currentPage < totalPages ? currentPage + 1 : null;

    console.log(courses, 'courses ')
    console.log(totalPages, 'totalPages ')
    console.log(prev, 'prev prev')
    console.log(next, 'next next')
    const queryClient = useQueryClient()
    const deleteCourses = (id) => {
        return axiosInstance.delete(`${api}/courses/${id}`)
    };

    const { mutate } = useMutation(deleteCourses,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('data')
            }
        }
    )
    const handleDelete = (id) => {
        mutate(id)
    }
    return { error, isLoading, currentPage, setCurrentPage, courses, handleDelete, setPerPage, perPage }
}

export default useCourses