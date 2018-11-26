import React from 'react';
import { Link } from 'react-router-dom'

function ListItem(props) {

    return   <li className="breadcrumb-item"> <Link to={props.value.link}>{props.value.name}</Link></li>;
}
function ListCurrentItem(props) {

    return   <li className="breadcrumb-item active" aria-current="page"> <Link to={props.value.link}>{props.value.name}</Link></li>;
}

export const Breadcrumb = (props)  => {
    const navs = props.routes;
    const listItems = navs.map((nav,index) =>
      (index === navs.length-1) ?
          <ListItem key={index} value={nav}/>
          : <ListCurrentItem key={index} value={nav} />
        );
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
            {listItems}
                </ol>
             </nav>
        </div>
    );
}
