import { AuthUser } from "@/types/AuthUser";

/**
 * Generalized function to perform POST requests with authorization.
 * @param {string} url - The URL to which the POST request is made.
 * @param {Object} data - The body data to be sent in the POST request.
 * @param {string} accessToken - The access token for authorization.
 * @returns {Promise<any>} The JSON response from the server.
 */
export const postWithAuth = async (url: string, data: Object): Promise<any> => {
  // Holds the current user's credentials
  const authUser: AuthUser = JSON.parse(localStorage.getItem('authUser') || '{}');

  // Perform the POST request with the access token in the header
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authUser.accessToken,
      },
      body: JSON.stringify(data),
    });
    // If the access token is invalid, refresh the token and try again
    if (response.status === 401) {
      const newToken = await refreshToken();
      if (newToken) {
        authUser.accessToken = newToken.accessToken;
        localStorage.setItem('authUser', JSON.stringify(authUser));
        return await postWithAuth(url, data);
      }
    }

    return await response.json();
  } catch (error) { console.error('Error:', error); }
};

/**
 * Generalized function to perform DELETE requests with authorization.
 * @param {string} url - The URL to which the DELETE request is made.
 * @returns {Promise<any>} The JSON response from the server.
 */
export const deleteWithAuth = async (url: string) => {
  // Holds the current user's credentials
  const authUser: AuthUser = JSON.parse(localStorage.getItem('authUser') || '{}');

  // Perform the DELETE request with the access token in the header
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authUser.accessToken,
      },
    });
    // If the access token is invalid, refresh the token and try again
    if (response.status === 401) {
      const newToken = await refreshToken();
      if (newToken) {
        authUser.accessToken = newToken.accessToken;
        localStorage.setItem('authUser', JSON.stringify(authUser));
        await deleteWithAuth(url);
      }
    }
  } catch (error) { console.error('Error:', error); }
}

export const refreshToken = async () => {
  // Holds the current user's credentials
  const authUser: AuthUser = JSON.parse(localStorage.getItem('authUser') || '{}');

  // Perform the POST request to refresh the access token
  try {
    const response = await fetch('/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: authUser.id,
        refreshToken: authUser.refreshToken,
      }),
    });
    // Log the user out if the refresh token is invalid
    if (response.status === 401) {
        // Clear the local storage
        localStorage.removeItem("authUser");
        // Refresh the page
        window.location.reload();
    } else {
      return await response.json();
    }
  } catch (error) { console.error('Error:', error); }
}
