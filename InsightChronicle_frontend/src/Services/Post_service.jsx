import { myAxios, privateAxios } from "./Helper"

//create post
export const createPost = (postData) => {
    //   console.log(postData);
    return privateAxios
        .post(
            `/user/${postData.userId}/category/${postData.categoryId}/posts`,
            postData
        )
        .then((response) => response.data);
};


//get all post
export const loadAllPosts = (pageNumber, pageSize) => {
    return myAxios
        .get(
            `/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`
        )
        .then((response) => response.data);
};

//load single post of given id
export const loadPost = (postId) => {
    return myAxios.get("/posts/" + postId).then((reponse) => reponse.data);
};



export const createComment = (comment, postId) => {
    return privateAxios.post(`/post/${postId}/comments`, comment);
};

export const uploadPostImage = (image, postId) => {
    let formData = new FormData();
    formData.append("image", image);
    return privateAxios
        .post(`/post/image/upload/${postId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => response.data);
};

//get categories wise post
export function loadPostCategoryWise(categoryId) {
    return privateAxios
        .get(`/category/${categoryId}/posts`)
        .then((res) => res.data);
}

//delete post
export function deletePostService(postId) {
    return privateAxios.delete(`/posts/${postId}`).then((res) => res.data);
}

//update post
export function updatePost(post, postId) {
    console.log(post);
    return privateAxios.put(`/posts/${postId}`, post).then((resp) => resp.data);
}