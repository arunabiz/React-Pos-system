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
import logo from '../../assets/logo.png'


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





const InvoiceModal =(props)=> {

    const[formError, setformError] = useState()
    const[formSuccess, setformSuccess] = useState()
    const[error, seterror] = useState()
    const [status,setstatus] = useState(false)


    useEffect(() => {

    }, [props.items]);

    function GenerateInvoice(evt) {
        console.log('process')
        evt.preventDefault();
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
            let file = pdf.output('blob');
            const formdata = new FormData();
            formdata.append("pdf",file);
            formdata.append("dateCreated",props.dateOfIssue);
            formdata.append("customer",props.customer);
            postpdf(formdata)
        });
    }

    const postpdf =(payload) =>{
        console.log(payload)
        axios.post('https://posautotest.herokuapp.com/api/invoice/register/',payload ,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(function (response) {
                console.log(response);
                setformError(false);
                setformSuccess(true);
                setstatus(true)
            })
            .catch(function (error) {
                console.log(error);
                setformError(true);
                setformSuccess(false);
                seterror(error);
            });
    }


    return(
            <div>
                <Modal show={props.showModal} onHide={props.closeModal} size="lg" centered>
                    {formSuccess ? (
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            Invoice Saving was <strong>successful!</strong>
                        </Alert>
                    ) : null }
                    {formError ? (
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {error} — <strong>check it out!</strong>
                        </Alert>
                    ) : null
                    }
                    <div id="invoiceCapture">
                        <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
                            <div className="w-100">
                                <img style={{width:'100px'}} src={logo} alt="logo of company"/>
                            </div>
                            <div className="w-100">
                                <h4 className="fw-bold my-2">{props.billFrom||'Class Motors L.L.C'}</h4>
                                <h6 className="fw-bold text-secondary mb-1">
                                    Invoice(فاتورة) #: {props.invoiceNumber||''}
                                </h6>
                            </div>
                            <div className="text-end ms-4">
                                <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due (المبلغ المستحق):</h6>
                                <h5 className="fw-bold text-secondary"> {props.currency} {props.total}</h5>
                            </div>
                        </div>
                        <div className="p-4">
                            <Row className="mb-4">
                                <Col md={4}>
                                    <div className="fw-bold">Billed to (دفع ل):</div>
                                    <div>{props.billTo||''}</div>
                                    <div>{props.billToAddress||''}</div>
                                    <div>{props.billToEmail||''}</div>
                                </Col>
                                <Col md={4}>
                                    <div className="fw-bold">Billed From (وصفت من):</div>
                                    <div>{props.billFrom||''}</div>
                                    <div>{props.billFromAddress||''}</div>
                                    <div>{props.billFromEmail||''}</div>
                                </Col>
                                <Col md={4}>
                                    <div className="fw-bold ">Date Of Issue (تاريخ المسألة):</div>
                                    <div>{props.dateOfIssue||''}</div>
                                </Col>
                            </Row>
                            <Row className="mb-4">
                                <Col md={6}>
                                    <div className="fw-bold">Vehicle No (السيارة لا):</div>
                                    <div>{props.customer||''}</div>
                                    <div className="fw-bold">Vehicle Brand (ماركة السيارة):</div>
                                    <div>{props.VBrand||''}</div>
                                    <div className="fw-bold">Vehicle Model (موديل السيارة):</div>
                                    <div>{props.VModel||''}</div>
                                </Col>
                                <Col md={6}>
                                    <div className="fw-bold">Chassis number (رقم الهيكل):</div>
                                    <div>{props.Chassis||''}</div>
                                    <div className="fw-bold">Year (سنة):</div>
                                    <div>{props.Year||''}</div>
                                    <div className="fw-bold">Color (اللون):</div>
                                    <div>{props.color||''}</div>
                                </Col>
                            </Row>
                            <div className="fw-bold">Services (خدمات)</div>
                            <Table className="mb-0">
                                <thead>
                                <tr>
                                    <th>QTY (الكمية)</th>
                                    <th>DESCRIPTION (وصف)</th>
                                    <th className="text-end">PRICE (السعر)</th>
                                    <th className="text-end">AMOUNT (مقدار)</th>
                                </tr>
                                </thead>
                                <tbody>
                                {props.items.map((item, i) => {
                                    return (
                                        <tr id={i} key={i}>
                                            <td style={{width: '70px'}}>
                                                {item.quantity}
                                            </td>
                                            <td>
                                                {item.name} - {item.description}
                                            </td>
                                            <td className="text-end" style={{width: '130px'}}>{props.currency} {item.price}</td>
                                            <td className="text-end" style={{width: '130px'}}>{props.currency} {item.price * item.quantity}</td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </Table>
                            <div className="fw-bold">Spare Parts (قطعة منفصلة)</div>
                            <Table className="mb-0">
                                <thead>
                                <tr>
                                    <th>QTY (الكمية)</th>
                                    <th>DESCRIPTION (وصف)</th>
                                    <th className="text-end">PRICE (السعر)</th>
                                    <th className="text-end">AMOUNT (مقدار)</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {props.parts.map((item, i) => {
                                        return (
                                            <tr id={i} key={i}>
                                                <td style={{width: '70px'}}>
                                                    {item.quantity}
                                                </td>
                                                <td>
                                                    {item.name} - {item.description}
                                                </td>
                                                <td className="text-end" style={{width: '130px'}}>{props.currency} {item.price}</td>
                                                <td className="text-end" style={{width: '130px'}}>{props.currency} {item.price * item.quantity}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                            <Table>
                                <tbody>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr className="text-end">
                                    <td></td>
                                    <td className="fw-bold" style={{width: '130px'}}>SUBTOTAL (المجموع الفرعي)</td>
                                    <td className="text-end" style={{width: '130px'}}>{props.currency} {props.subTotal}</td>
                                </tr>
                                {props.taxAmmount != 0.00 &&
                                    <tr className="text-end">
                                        <td></td>
                                        <td className="fw-bold" style={{width: '130px'}}>TAX (ضريبة)</td>
                                        <td className="text-end" style={{width: '130px'}}>{props.currency} {props.taxAmmount}</td>
                                    </tr>
                                }
                                {props.discountAmmount != 0.00 &&
                                    <tr className="text-end">
                                        <td></td>
                                        <td className="fw-bold" style={{width: '130px'}}>DISCOUNT (خصم)</td>
                                        <td className="text-end" style={{width: '130px'}}>{props.currency} {props.discountAmmount}</td>
                                    </tr>
                                }
                                <tr className="text-end">
                                    <td></td>
                                    <td className="fw-bold" style={{width: '130px'}}>TOTAL (المجموع)</td>
                                    <td className="text-end" style={{width: '130px'}}>{props.currency} {props.total}</td>
                                </tr>
                                </tbody>
                            </Table>
                            {props.notes &&
                                <div className="bg-light py-3 px-4 rounded">
                                    {props.notes}
                                </div>}
                        </div>
                    </div>
                    <div className="pb-4 px-4">
                        <Row>
                            <Col md={6}>
                                <Button variant="primary" className="d-block w-100" onClick={GenerateInvoice}>
                                    <BiPaperPlane style={{width: '15px', height: '15px', marginTop: '-3px'}} className="me-2"/>Send Invoice (إرسال الفاتورة)
                                </Button>
                            </Col>
                            <Col md={6}>
                                <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={download}>
                                    <BiCloudDownload style={{width: '16px', height: '16px', marginTop: '-3px'}} className="me-2"/>
                                    Download Copy (تنزيل نسخة)
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Modal>
                <hr className="mt-4 mb-3"/>
            </div>
        )

}

export default InvoiceModal;