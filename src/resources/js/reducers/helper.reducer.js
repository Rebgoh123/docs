// import { helperConstants } from "../constants/helper.constants";
// import { combineReducers } from 'redux'
//
// export function helper_stepper_error(state = {}, action) {
//
//     switch (action.type) {
//
//         case helperConstants.SET_ERROR:
//
//             return {
//                 error: action.helper.error,
//                 error_fields: action.helper.error_fields === undefined ? '' : action.helper.error_fields
//             };
//
//         default:
//             return state;
//
//     }
// }
//
// export function helper_stepper_title(state = {}, action) {
//
//     switch (action.type) {
//
//         case helperConstants.SET_TITLE:
//             return {
//                 title: action.helper
//             };
//
//         default:
//             return state;
//
//     }
// }
//
// export function helper_stepper_active_step(state = {}, action) {
//
//     switch (action.type) {
//
//         case helperConstants.SET_ACTIVE_STEP:
//             return {
//                 active_step: action.helper
//             };
//
//         default:
//             return state;
//
//     }
// }
//
// export const helperReducer = combineReducers({
//     helper_stepper_title,
//     helper_stepper_active_step,
//     helper_stepper_error
//
// })