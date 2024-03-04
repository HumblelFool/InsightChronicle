import { myAxios } from "./Helper"


export const loadAllCategories = () => {
    myAxios.get(`/categories/`).then((reponse) => {
        return reponse.data
    })
}