import React, { useEffect } from 'react';


const Logout = () => {

      useEffect(() => {
            (async () => {
                  try {
                        const accessToken = localStorage.getItem('access_token')
                        const refreshToken = localStorage.getItem('refresh_token')
                        await fetch('http://localhost:8000/logout/', {
                              method: "POST",
                              headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${accessToken}`
                              },
                              body: JSON.stringify({'refresh_token': `${refreshToken}`}),
                              withCredentials: true,
                        })
                        localStorage.clear();
                        window.location.href = '/login';
                  } catch (e) {console.log('logout not working', e)}
            })();
      },[]);

      return (
            <>
            </>
      );
};


export default Logout;