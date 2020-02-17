const initialState = { authAttempted: false, auth: null, user: null }



export type ActionType = {
    type: 'AUTH_CHANGE' | 'LOAD_USER',
    auth: any,
    user: String
}
export type StateType = {
    authAttempted: boolean,
    user: String
}

const appStateReducer: Function = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'AUTH_CHANGE':
            return { ...state, auth: action.auth, authAttempted: true }

        case "LOAD_USER": {
            return { ...state, user: action.user }
        }
        default:
            return state;
    }
}





export { initialState }
export default appStateReducer