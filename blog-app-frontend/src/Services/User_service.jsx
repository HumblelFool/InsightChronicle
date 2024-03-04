import { myAxios } from './Helper'


export const signUp = (user) => {
    return myAxios.post(`/auth/register`, user).then((response) => response.data)
}


export const loginUser = (logingDeatils) => {
    return myAxios.post(`` / auth / login``, logingDeatils).then((response) => response.data)
}

export const getUser = (userId) => {
    return myAxios.get(`/users/${userId}`).then((resp) => resp.data);
};