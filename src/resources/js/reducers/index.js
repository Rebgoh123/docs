import { combineReducers } from 'redux';
import { usersReducer } from './users.reducer';
import { accountReducer } from './account.reducer';
import { clientReducer } from './client.reducer';
import { formReducer } from './form.reducer';
import { templateReducer } from './template.reducer';
import { modalReducer } from './modal.reducer';

const rootReducer = combineReducers({
    modalReducer: modalReducer,
    usersReducer: usersReducer,
    clientReducer:clientReducer,
    formReducer:formReducer,
    templateReducer:templateReducer,
    accountReducer:accountReducer,

});

export default rootReducer;