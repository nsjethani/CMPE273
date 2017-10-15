import axios from 'axios';

const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:4003'

const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/users/doLogin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res =>{
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const doSignup = (payload) =>
    fetch(`${api}/signup/doSignup`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    ).then(res => res.json())
        .then(res => {
        console.log("In Dosignup of API" + JSON.stringify(res))
            console.log("hi there")
        return res;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });



export const uploadFile = (payload) =>
    fetch(`${api}/files/upload`, {
        method: 'POST',
        credentials:'include',
        body: payload,
            headers: {
                'path': payload.get('path')
            }
    }
    ).then(res => res.json())
        .then(res => {
            debugger
            console.log("My response is ",JSON.stringify(res))
        return res;
    }).catch(error => {
        debugger
        console.log(payload)
        console.log("This is error while file upload ", error.message);
        return error;
    });

export const getfiles =(payload) =>

    fetch(`${api}/getfiles`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res =>{
            debugger;
            console.log(res);
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const downloadfile = (payload) =>
    axios({
        method: 'post',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        url: `${api}/downloadfile`,
        data: JSON.stringify(payload),
        responseType:'stream'
    })
        .then(function (response) {
            console.log("Payload in download file ", payload)
            return response
        })
        .catch(function (error) {
            console.log("Payload in download file ", payload)
            console.log(error);
        });


export const logout = (payload) =>
    fetch(`${api}/logout`, {
        method: 'POST',
        headers: {
            ...headers,
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res =>{
            localStorage.removeItem("userid");
            localStorage.removeItem("rootdir");
            localStorage.removeItem("fname");
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
