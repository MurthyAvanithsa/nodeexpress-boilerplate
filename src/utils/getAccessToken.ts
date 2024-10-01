import config from "../config";

export const getAccessToken = async (grantType: string, value: string) => {
    const tokenUrl = config.oidc.tokenUrl;

    const bodyParams: Record<string, string> = {
        'grant_type': grantType,
        'client_id': config.oidc.clientId,
    };

    if (grantType === 'authorization_code') {
        bodyParams['code'] = value;
        bodyParams['redirect_uri'] = config.oidc.redirectUri;
        bodyParams['audience'] = config.oidc.audience;
    } else if (grantType === 'refresh_token') {
        bodyParams['refresh_token'] = value;
    } else {
        throw new Error('Unsupported grant type');
    }

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
        return data.access_token;
    } catch (error) {
        throw new Error(`Unable to get access token: ${error}`);
    }
};