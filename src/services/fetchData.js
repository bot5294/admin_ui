import axios from "axios";
const FETCH_URL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const fetchUsers = (setUsers) =>{
    axios
    .get(FETCH_URL)
    .then((res)=>{
        setUsers(res.data);
    })
    .catch((err)=>console.log(err));
}

export {fetchUsers};