import {CompositeDecorator} from "draft-js";
import React from "react";
import html2canvas from "html2canvas";

var jsPDF = require('jspdf');
var Immutable = require('immutable');

export const HANDLE_REGEX = /({{).*?}}/g;

export const blockRenderMap = Immutable.Map({
    'rightAlignment': {
        element: 'right-tool'
    },
    'centerAlignment': {
        element: 'center-tool'
    },
    'leftAlignment': {
        element: 'left-tool'
    },
    'justifyAlignment': {
        element: 'justify-tool'
    },
    'line': {
        element: 'line-tool'
    }
});

export const toolboxStyle = [
        {name:'BOLD', type:'style', tooltip:'Bold'},
        {name:'ITALIC', type:'style', tooltip:'Italic'},
        {name:'UNDERLINE', type:'style', tooltip:'Underline'},
        {name:'STRIKETHROUGH', type:'style', tooltip:'Strikethrough'},
    ];

export const toolboxBlock = [
        {name:'blockquote', type:'block', tooltip:'Quote'},
        {name:'code-block', type:'block', tooltip:'Code Block'},
        {name:'unordered-list-item', type:'block', tooltip:'Unorder List'},
        {name:'ordered-list-item', type:'block', tooltip:'Order List'},
        {name:'leftAlignment', type:'block', tooltip:'Left Alignment'},
        {name:'centerAlignment', type:'block', tooltip:'Center Alignment'},
        {name:'rightAlignment', type:'block', tooltip:'Right Alignment'},
        {name:'justifyAlignment', type:'block', tooltip:'Justify Alignment'},
        {name:'line', type:'block', tooltip:'Straight Line'},
        {name:'image', type:'block', tooltip:'Image',inputType:'file'},
    ];

export const addOnBlock = [
    {name:'FullName', tooltip:'Client Name'},
    {name:'Address',tooltip:'Client Address'},
    {name:'simAddress',  tooltip:'Simbiosis Address'},
];

export const customStyleMap = {
    black: {
        color: 'black',
    },
    red: {
        color: 'rgba(255, 0, 0, 1.0)',
    },
    orange: {
        color: 'rgba(255, 127, 0, 1.0)',
    },
    yellow: {
        color: 'rgba(180, 180, 0, 1.0)',
    },
    green: {
        color: 'rgba(0, 180, 0, 1.0)',
    },
    blue: {
        color: 'rgba(0, 0, 255, 1.0)',
    },
    indigo: {
        color: 'rgba(75, 0, 130, 1.0)',
    },
    violet: {
        color: 'rgba(127, 0, 255, 1.0)',
    },
    'STRIKETHROUGH': {
        textDecoration: 'line-through',
    },
    8: {
        fontSize: '8px',
    },
    9: {
        fontSize: '9px',
    },
    10: {
        fontSize: '10px',
    },
    11: {
        fontSize: '11px',
    },
    12: {
        fontSize: '12px',
    },
    14: {
        fontSize: '14px',
    },
    16: {
        fontSize: '16px',
    },
    18: {
        fontSize: '18px',
    },
    24: {
        fontSize: '24px',
    },
    30: {
        fontSize: '30px',
    },
    36: {
        fontSize: '36px',
    },
    48: {
        fontSize: '48px',
    },
    60: {
        fontSize: '60px',
    },
    72: {
        fontSize: '72px',
    },
    96: {
        fontSize: '96px',
    },

};

export const generateDecorator = () => {
    const regex = new RegExp(HANDLE_REGEX);
    return new CompositeDecorator([{
        strategy: (contentBlock, callback) => {
            if (HANDLE_REGEX !== '') {
                findWithRegex(regex, contentBlock, callback);
            }
        },
        component: SearchHighlight,
    }])
};

export const findWithRegex = (regex, contentBlock, callback) => {
    const text = contentBlock.getText();
    let matchArr, start, end;
    while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        end = start + matchArr[0].length;
        callback(start, end);
    }
};

export const SearchHighlight = (props) => (
    <span className="search-and-replace-highlight">{props.children}</span>
);

export const generatePdf = () =>{
    const input = document.querySelector(".public-DraftEditor-content");
    html2canvas(input,{scale: 2,})
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
           // const docs = new jsPDF();

            /*
          Here are the numbers (paper width and height) that I found to work.
          It still creates a little overlap part between the pages, but good enough for me.
          if you can find an official number from jsPDF, use them.
          */
            var imgWidth = 210;
            var pageHeight = 300;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;

            var doc = new jsPDF('p', 'mm');
            var position = 0;

            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            doc.save("download.pdf");

        });

    return true;
}