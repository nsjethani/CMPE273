import axios from 'axios';

const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080'

const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}//user/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res =>{
            console.log("In login of API" + JSON.stringify(res))
            return res;
        })
        .catch(error => {
            console.log("This is error in doLogin ", error);
            return error;
        });

export const doSignup = (payload) =>
    fetch(`${api}/user/add`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    ).then(res =>  {
        console.log("In Dosignup of API" + JSON.stringify(res))
            console.log("hi there")
        return res;
    })
        .catch(error => {
            console.log("This is error ",error);
            return error;
        });



export const uploadFile = (payload) =>
    fetch(`${api}/file/upload`, {
        method: 'POST',
        credentials:'include',
        body: payload
    }
    ).then(res => {
        console.log("My response in upload file is ",JSON.stringify(res))
        return res;
    }).catch(error => {
        console.log(payload)
        console.log("This is error while file upload ", error.message);
        return error;
    });

export const getfiles =(payload) =>

    fetch(`${api}/file/getfiles`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },credentials:'include',
        body: JSON.stringify(payload)
    }).then(res =>{
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const getShareFiles =(payload) =>

    fetch(`${api}/file/getShareFiles`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },credentials:'include',
        body: JSON.stringify(payload)
    }).then(res =>{
        return res;
    })
        .catch(error => {
            console.log("This is error while getting share files . ");
            return error;
        });


export const getStarFiles =(payload) =>

    fetch(`${api}/file/getStarData`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },credentials:'include',
        body: JSON.stringify(payload)
    }).then(res =>{
        return res;
    })
        .catch(error => {
            console.log("This is error while getting share files . ");
            return error;
        });

export const getlogs =(payload) =>

    fetch(`${api}/logs/filelogs`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res =>{
            //debugger;
            console.log(res);
            return res;
        })
        .catch(error => {
            console.log("This is error in getlogs");
            return error;
        });

export const downloadfile = (payload) =>
    axios({
        method: 'post',
        withCredentials: true,
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
    fetch(`${api}/user/logout`, {
        method: 'POST',
        headers: {
            ...headers,
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log("response in logout is ",res)
            localStorage.removeItem("userid");
            localStorage.removeItem("rootdir");
            localStorage.removeItem("fname");
            return res.status;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const createdir = (payload) =>

    fetch(`${api}/file/createDir`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res =>{
        return res;
    })
        .catch(error => {
            console.log("This is error while creating directory.");
            return error;
        });

export const saveUserProfile = (payload) =>
    fetch(`${api}/profile/saveUserProfile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => res.json())
        .then(res =>{
            console.log("Response in API ",res)
            return res;
    })
        .catch(error => {
            console.log("This is error in user profile update ",error);
            return error;
        });

export const fetchUserProfile = (payload) =>
    fetch(`${api}/profile/fetchUserProfile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => res.json())
        .then(res =>{
            console.log("response in get profile ",res )
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const markStar = (payload) =>
    fetch(`${api}/file/changeStar`, {
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
            console.log("This is error while starring file");
            return error;
        });


export const unmarkStar = (payload) =>
    fetch(`${api}/file/changeStar`, {
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
            console.log("This is error while unstarring file");
            return error;
        });

export const deletefile = (payload) =>
    fetch(`${api}/file/deletefile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res =>{
            return res;
    })
        .catch(error => {
            console.log("This is error in delete file in API");
            return error;
        });

export const check_emails = (payload) =>
    fetch(`${api}/check_emails`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => res.json())
        .then(res =>{
            return res;
        })
        .catch(error => {
            console.log("This is error in API in checking emails");
            return error;
        });

export const doShareData = (payload) =>
    fetch (`${api}/file/share`,
        {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            credentials: 'include'
        }).then(res => {
        return res;
    }).catch(error => {
        console.log("Error: " + error);
        return error;
    });




