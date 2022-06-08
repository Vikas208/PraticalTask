import { actions } from './action';

const reducer = (state, action) => {
       // console.log(action)
       // console.log(state)
       switch (action.type) {
              case actions.SET_TOKEN:
                     return {
                            ...state,
                            token: action.token
                     }
              case actions.SET_USERID:
                     return {
                            ...state,
                            user_id: action.user_id
                     }
              default:
                     return {
                            ...state
                     }
       }

}
export default reducer;