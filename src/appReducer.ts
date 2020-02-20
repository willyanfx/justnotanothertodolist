const initialState = { authAttempted: false, auth: null, user: null }



export enum ChangeOrLoadType {
    auth_change = 'AUTH_CHANGE',
    load_user = 'LOAD_USER'
}

export type ActionType = {
    type: ChangeOrLoadType,
    auth: any,
    user: String
}
export type StateType = {
    authAttempted: boolean,
    user: string
}

const appStateReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case ChangeOrLoadType.auth_change:
            return { ...state, auth: action.auth, authAttempted: true }

        case ChangeOrLoadType.load_user: {
            return { ...state, user: action.user }
        }
        default:
            return state;
    }
}





export { initialState }
export default appStateReducer