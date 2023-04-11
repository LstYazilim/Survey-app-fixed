import {useState,useEffect} from 'react'
import axios from '../api/axios';
import useRefreshToken from '../hooks/useRefreshToken';
function Users() {
    const [users, setUsers] = useState([]);
    const refresh = useRefreshToken();
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getUsers = async () => {
            try {
                const response = await axios.get('/users', {signal: controller.signal});
               console.log(response.data);
               isMounted && setUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getUsers();
        return () => {
            isMounted = false;
            controller.abort();
        }
    },[])
  return (
    <article>
        <h1>Users</h1>
        {users?.length ?(
        <ul>
            {users.map((user: any) => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>) : <div>No users</div>}
    </article>
  )
}

export default Users