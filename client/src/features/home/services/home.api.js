import axios from "axios";

export const linkApiInstance = axios.create({
    baseURL:'/api/links'
})

export const getProfiles = async() =>{
    const res = await linkApiInstance.get('/')
    return res
}

export const getLinksByUsername = async(username) =>{
    const res = await linkApiInstance.get(`/${username}`)
    return res
}