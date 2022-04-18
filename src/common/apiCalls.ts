import { API } from 'aws-amplify';
import { getCurrentUser, getHeaders } from './apiHelper';

// eslint-disable-next-line import/prefer-default-export
export const addGroupToUser = async (groupName: string) => {
    const user = await getCurrentUser();
    const response = await API.put(
        'groupsApi',
        `/users/${user.email}`,
        { headers: await getHeaders(), body: { newGroup: groupName } },
    );
    console.log(response);
};
