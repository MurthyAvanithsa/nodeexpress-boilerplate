export const config = {
    OIDC_AUDIENCE: "https://dev-fulrxmb8tfh5ke8o.us.auth0.com/api/v2/",
    OIDC_TOKEN_URL: "https://dev-fulrxmb8tfh5ke8o.us.auth0.com/oauth/token",
    OIDC_CLIENT_ID: "PnEitIqyE34JDNeUZiIbY42zWIkVrilL",
    OIDC_REFRESH_TOKEN: "85wxHiIHqWKg_aq9CoC9PpkGgKZUByqV1TYkCdNHfLYB0"
  };

export const getAccessToken = async () => {
    const tokenUrl = config.OIDC_TOKEN_URL; // Access the variable with REACT_APP_ prefix

    const bodyParams: Record<string, string> = {
        'grant_type': 'refresh_token',
        'client_id': config.OIDC_CLIENT_ID,
        'refresh_token': config.OIDC_REFRESH_TOKEN // Access client ID
    };
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(bodyParams),
    };

    try {
        const response = await fetch(tokenUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`Failed to get access token: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data.access_token; // Return the access token
    } catch (error) {
        throw new Error(`Unable to get access token: ${error}`);
    }
};
