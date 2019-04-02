import React from "react";
import styles from "./PDFButtonComponent.css";
import Alert from 'react-s-alert';

const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
const ipcRenderer = require('electron').ipcRenderer;
const {dialog} = require('electron').remote;

type Props = {};

export default class PDFButtonComponent extends React.Component{
    props: Props;

    gerarPDF = () => {
        let path = dialog.showSaveDialog({filters: [{
          name: 'PDF',
          extensions: ['pdf']
        }]});
        if(path){
          ipcRenderer.send('print-pdf',path)
          Alert.success('PDF salvo em ' + path, {
            position: 'top',
            effect: 'stackslide',
            timeout: 4000
          })
        }else {
          Alert.error('Operação cancelada.' , {
            position: 'top',
            effect: 'stackslide',
            timeout: 4000
          })
        }  
    }

    render() {
        const {path} = this.props
        return(
            <div>
                <button type='button' className={styles.showmodal + ' ' + styles.grande + ' ' + styles.pdf} onClick={this.gerarPDF}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="14"><path stroke="none" fill="none" d="M0 0h24v24H0z"/><path stroke="none" fill="#ffffff" d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/></svg>
                </button>
                <button type='button' className={styles.showmodal + ' ' + styles.pequeno + ' ' + styles.pdf} onClick={this.gerarPDF}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path stroke="none" fill="none" d="M0 0h24v24H0z"/><path stroke="none" fill="#ffffff" d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/></svg>
                </button>
            </div>
        )
    }

}
