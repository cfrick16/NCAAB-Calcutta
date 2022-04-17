import { Auth } from 'aws-amplify';

// eslint-disable-next-line import/prefer-default-export
export const getHeaders = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;

    return { Authorization: token };
};

export const getCurrentUser = async () => {
    const userInfo = await Auth.currentUserInfo();

    return {
        name: userInfo.attributes.name,
        email: userInfo.attributes.email,
    };
};
