const initialState = {
    currentTab: 'Create/Join League',
    currentLeague: '',
};

// Use the initialState as a default value
// eslint-disable-next-line default-param-last
export default function websiteReducer(state: any = initialState, action: any) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
    case 'SET_CURRENT_TAB':
        return { ...state, currentTab: action.value };
    case 'SET_CURRENT_LEAGUE':
        return { ...state, currentLeague: action.value };
    default:
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        return state;
    }
}
