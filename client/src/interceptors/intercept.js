let refresh = false;

function handleUnauthorizedError(error) {
  if (error?.status === 401 && !refresh) {
    refresh = true;
    console.log(localStorage.getItem('refresh_token'));
    return fetch('http://localhost:8000/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refresh: localStorage.getItem('refresh_token')
        }),
        credentials: 'include'
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((data) => {
        // axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        refresh = false;
        return true;
      })
      .catch(() => false);
  }
  return false;
}

const originalFetch = window.fetch;

window.fetch = async function (...args) {
  try {
    const response = await originalFetch(...args);
    // console.log('intercept',response)
    return response;
  } catch (error) {
    const unauthorizedErrorHandled = await handleUnauthorizedError(error);
    if (unauthorizedErrorHandled) {
      const updatedHeaders = {
        ...args[1].headers,
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      };
      const updatedArgs = {
        ...args[1],
        headers: updatedHeaders,
        credentials: 'include'
      };
      return originalFetch(args[0], updatedArgs);
    }
    return Promise.reject(error);
  }
};

