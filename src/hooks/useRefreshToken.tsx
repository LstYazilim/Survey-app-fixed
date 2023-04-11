import axios from "../api/axios"
import useAuth from "./useAuth"

function useRefreshToken() {
  const {setAuth} = useAuth();
  const refresh = async () => {
    const response = await axios.post('/refresh' ,{
    withCredentials: true
  });
  setAuth((prev: any) => {
    console.log(JSON.stringify(prev))
    console.log(JSON.stringify(response.data.accessToken))
    return {
      ...prev,
      accessToken: response.data.accessToken
    }
  });

  return response.data;
  }
  return (
    refresh;
  )
}

export default useRefreshToken