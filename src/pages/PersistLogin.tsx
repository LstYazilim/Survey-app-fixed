// import {Outlet} from 'react-router-dom'
// import {useState,useEffect} from 'react'
// import useRefreshToken from '../hooks/useRefreshToken'
// import useAuth from '../hooks/useAuth'

// function PersistLogin() {
//     const [isLoading , setIsLoading] = useState(true);
//     const refresh = useRefreshToken();
//     const auth: any = useAuth();

//     useEffect(() => {
//         const verifyRefreshToken = async () => {
//             const response = await refresh();
//             if (response) {
//                 auth.login(response);
//             }
//             setIsLoading(false);
//         }
      
//         !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
//     },[])

//     useEffect(() => {
//         console.log(`isLoading: ${isLoading}`)
//         console.log(`aToken: ${JSON.stringify(auth?.accessToken)}`)
//     },[isLoading])

    
//   return (
//     <>
//         {isLoading ? <div>Loading...</div> : <Outlet />}
//     </>
//   )
// }

// export default PersistLogin