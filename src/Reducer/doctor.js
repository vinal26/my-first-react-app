export const doctorState = null

export const doctorReducer = (state = doctorState, action) => {
    switch (action.type) {
        case 'Update Profile':
            return action.profile
        case 'Clear Profile':
            return null

        default:
            return state
    }
}