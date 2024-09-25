import config from "../config";

export const getAccessToken = async (code: string) => {
    const tokenUrl = config.oidc.tokenUrl;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'grant_type': 'authorization_code',
            'code': code,
            'client_id': config.oidc.clientId,
            'redirect_uri': config.oidc.redirectUri,
            'audience': config.oidc.audience
        })
    };

    try {
        const response = await fetch(tokenUrl, requestOptions);
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        throw new Error(`Unable to get access token: ${error}`);
    }
};
