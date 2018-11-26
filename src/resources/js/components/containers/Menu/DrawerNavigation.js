import React from 'react';
import { Link } from "react-router-dom";

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import ClientIcon from '@material-ui/icons/people';
import FormIcon from '@material-ui/icons/listalt';
import TemplateIcon from '@material-ui/icons/eventnote';
import AccountIcon from '@material-ui/icons/accountbox';




const style = {
    menu:{
    // background: '#313131',
     color: 'black'
},
    icon:{
        color: 'Black'
    }
}

export const DrawerNavigation = (
    <div style={style.menu}>

        <ListItem button component={Link} to="/web/account">
            <ListItemIcon>
                <AccountIcon style={style.icon} />
            </ListItemIcon>
            <ListItemText disableTypography  primary="Account" />
        </ListItem>

        <ListItem button component={Link} to="/web/client">
            <ListItemIcon>
                <ClientIcon style={style.icon} />
            </ListItemIcon>
            <ListItemText disableTypography  primary="Client" />
        </ListItem>

        <ListItem button component={Link} to="/web/form">
            <ListItemIcon>
                <FormIcon style={style.icon} />
            </ListItemIcon>
            <ListItemText disableTypography  primary="Form" />
        </ListItem>

        <ListItem button component={Link} to="/web/template">
            <ListItemIcon>
                <TemplateIcon style={style.icon} />
            </ListItemIcon>
            <ListItemText disableTypography primary="Template" />
        </ListItem>

        <Divider/>


    </div>
);