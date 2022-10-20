import axios from 'axios';
import {STRAPI_API_URL,STRAPI_ACCESS_TOKEN} from './constants';

// sending request for login

export async function authLogin(email,password){
    try{    
        let response = await axios.post(`${STRAPI_API_URL}/auth/local`,{
            identifier:email,
            password:password
        });
        return response.data;
    }catch(error){
       throw error.response.data.error.message;
    }
}

// sending request for signup

export async function authSignup(username,email,password){
    try{
        let response = await axios.post(`${STRAPI_API_URL}/auth/local/register`,{
            username,
            email,
            password
        });
        return response;
    }catch(error){
        throw error.response.data.error.message;
    }
}

// sending request for forgot password

export async function forgotPassword(email){
    try{    
        let response = await axios.post(`${STRAPI_API_URL}/auth/forgot-password`,{
            email
        },{
            headers:{
                "Authorization":`Bearer ${STRAPI_ACCESS_TOKEN}`
            }
        });
        return response;
    }catch(error){
        throw error.response.data.error.message;
    }
}

// sending request for getting posts

export async function getPosts(){
    try{    
        let response = await axios.get(`${STRAPI_API_URL}/posts`,{
            headers:{
                "Authorization":`Bearer ${STRAPI_ACCESS_TOKEN}`
            }
        });
        return response;
    }catch(error){
        throw error.response.data.error.message;
    }
}

// sending request for creating posts
export async function createPost(title,content){
    try{
        let response = await axios.post(`${STRAPI_API_URL}/posts`,{
            data:{  
                title,
                content
            }
        },{
            headers:{
                "Authorization":`Bearer ${STRAPI_ACCESS_TOKEN}`
            }
        });
        return response;
    }catch(error){
        throw error.response.data.error.message;
    }
}