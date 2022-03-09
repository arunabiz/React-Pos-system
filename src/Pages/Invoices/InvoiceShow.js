import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf'
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";


const download = (e)=>{
    html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
        const imgData = canvas.toDataURL('image/png', 1.0);
        const pdf = new JsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: [612, 792]
        });
        pdf.internal.scaleFactor = 1;
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('invoice-001.pdf');
    });
}





const InvoiceShow =(props)=> {

    const[formError, setformError] = useState()
    const[formSuccess, setformSuccess] = useState()
    const[error, seterror] = useState()
    const [status,setstatus] = useState(false)



    return(
        <div>
            <Modal show={props.showModal} onHide={props.closeModal} size="lg" centered>
                <h1>{props.link}</h1>
                <div id="invoiceCapture">
                    {/*<object data="http://africau.edu/images/default/sample.pdf" type="application/pdf" width="100%" height="100%">*/}
                    {/*    <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>*/}
                    {/*</object>*/}
                    <iframe src={`https://posautotest.herokuapp.com${props.link}`} width="100%" height="800" />
                </div>
            </Modal>
        </div>
    )
    // `https://posautotest.herokuapp.com${props.link}`
}

export default InvoiceShow;