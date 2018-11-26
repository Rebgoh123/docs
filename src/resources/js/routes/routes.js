import React from 'react'
import {  Route, Switch } from 'react-router-dom';
import { PrivateRoute } from "./private";

import  { LoginPage } from '../components/containers/Users/Login'
import  { HomePage } from '../components/containers/Users/Home'
import  { RegisterPage } from '../components/containers/Users/Register'

import  { ClientPage } from '../components/containers/Client/Display'
import  { ClientEditPage } from '../components/containers/Client/Edit'

import  { AccountPage } from '../components/containers/Account/Display'
import  { AccountEditPage } from '../components/containers/Account/Edit'

import  { FormPage } from '../components/containers/Form/Display'
import  Add  from '../components/containers/Form/Add'
import  Edit  from '../components/containers/Form/Edit'
import  { ModalForm }  from '../components/containers/Form/Modal'
import  { GuestModalForm }  from '../components/containers/Form/GuestDisplay'

import   MyPdfViewer   from '../components/containers/PDF/Display'


import  { TemplatePage } from '../components/containers/Template/Display'
import  { AddTemplate } from '../components/containers/Template/Add'
import  { AddFormTemplate }  from '../components/containers/Template/AddForm'
import  { EditTemplate }  from '../components/containers/Template/Edit'
import  { ModalTemplate }  from '../components/containers/Template/Modal'
import  { FormTemplate }  from '../components/containers/Template/Form'


const routes= (
    <div>

<Route exact path="/web/account" component={AccountPage}/>
<Route path="/web/account/get/:accountId" component={AccountEditPage} />

<Route exact path="/web/client" component={ClientPage}/>
<Route path="/web/client/get/:clientId" component={ClientEditPage} />

<Route exact path="/web/template" component={TemplatePage}/>
<Route exact path="/web/template/add" component={AddTemplate}/>
<Route exact path="/web/form/add-on-template" component={AddFormTemplate}/>
<Route exact path="/web/template/get/:templateId" component={EditTemplate}/>
<Route exact path="/web/template/modal/get/:templateId" component={ModalTemplate}/>
<Route exact path="/web/form/template/get/:templateId" component={FormTemplate}/>

<Route exact path="/web/form" component={FormPage}/>
<Route exact path="/web/form/add" component={Add}/>
<Route exact path="/web/form/get/:formId" component={Edit}/>
<Route exact path="/web/form/modal/get/:formId" component={ModalForm}/>

<Route path="/web/login" component={LoginPage} />

<Route path="link/:clientId/form/:formId/:formName/:validDay" component={GuestModalForm} />

</div>
)


export default routes