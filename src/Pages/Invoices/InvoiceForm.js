import React, {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import Jobcard from './Jobcard';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from "axios";


const InvoiceForm = (props) => {

    const [isOpen,setisOpen] = useState(false)
    const [currency,setcurrency] = useState('$')
    const [currentDate,setcurrentDate] = useState()
    const [invoiceNumber,setinvoiceNumber] = useState(1)
    const [dateOfIssue,setdateOfIssue] = useState()
    const [billTo,setbillTo] = useState()
    const [billToEmail,setbillToEmail] = useState()
    const [billToAddress,setbillToAddress] = useState()
    const [billFrom,setbillFrom] = useState()
    const [billFromEmail,setbillFromEmail] = useState()
    const [billFromAddress,setbillFromAddress] = useState()
    const [notes,setnotes] = useState()
    const [total,settotal] = useState('0.00')
    const [subTotal,setsubTotal] = useState('0.00')
    const [taxRate,settaxRate] = useState('')
    const [taxAmount,settaxAmount] = useState('0.00')
    const [discountRate,setdiscountRate] = useState('')
    const [discountAmount,setdiscountAmount] = useState('0.00')

    const [VBrand,setVBrand] = useState()
    const [VNumber,setVNumber] = useState()
    const [VModel,setVModel] = useState()
    const [VColor,setVColor] = useState()
    const [VYear,setVYear] = useState()
    const [CNumber,setCNumber] = useState()

    const[Customers, setCustomers] = useState([])
    const[Parts, setParts] = useState([])
    const[service, setservice] = useState([])

    const[formError, setformError] = useState()
    const[formSuccess, setformSuccess] = useState()
    const[error, seterror] = useState()
    const [status,setstatus] = useState(false)

    const [update,setupdate] = useState([{
        id: 0,
        name: '',
        price: '1.00',
        description: '',
        quantity: 1
    }])
    const [items,setitems] = useState([{
        id: 0,
        name: '',
        price: '1.00',
        description: '',
        quantity: 1
    }])

    const [parts,setparts] = useState([{
        id: 0,
        name: '',
        price: '1.00',
        description: '',
        quantity: 1
    }])

    useEffect(() => {

        handleCalculateTotal()

    }, [items,update]);

    useEffect(() => {

        // Update the document title using the browser API
        document.title = `Invoices`;
        axios.get('http://127.0.0.1:8000/api/customer/get/').then((response) => {
            setCustomers(response.data.data);
        });
        axios.get('http://127.0.0.1:8000/api/product/get/part/').then((response) => {
            setParts(response.data.data);
        });
        axios.get('http://127.0.0.1:8000/api/product/get/service/').then((response) => {
            setservice(response.data.data);
        });
        // handleCalculateTotal();

    },[status])


    const handleRowDel =(item) =>{
        const index = items.indexOf(item);
        // const updateindex = update.indexOf(item);
        items.splice(index, 1);
        setitems(items);
        setupdate(items);
    };
    const handlePartRowDel =(item) =>{
        const index = parts.indexOf(item);
        // const updateindex = update.indexOf(item);
        parts.splice(index, 1);
        setparts(parts);
        setupdate(parts);
    };

    const handleAddEvent =(evt) => {
        const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

        const item = {
            id: id,
            name: '',
            price: '1.00',
            description: '',
            quantity: 1
        };
        items.push(item);
        setitems(items);
        setupdate(item)

    }
    const handlePartAddEvent =(evt) => {
        const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

        const part = {
            id: id,
            name: '',
            price: '1.00',
            description: '',
            quantity: 1
        };
        parts.push(part);
        setparts(parts);
        setupdate(part)

    }

    const handleCalculateTotal =() =>{

        let subTotal = 0;
        let subTotal1 = 0;
        let subtotalnew = 0;

        console.log(items)
        items.map(function(items) {
            subTotal = parseFloat(subTotal + (parseFloat(items.price)* parseInt(items.quantity)))
        });
        parts.map(function(items) {
            subTotal1 = parseFloat(subTotal1 + (parseFloat(items.price)* parseInt(items.quantity)))
        });
        subtotalnew = (subTotal)+(subTotal1);
        setsubTotal(parseFloat(subtotalnew).toFixed(2));
        settaxAmount(parseFloat(parseFloat(subtotalnew) * parseFloat(taxRate / 100).toFixed(2)));
        setdiscountAmount(parseFloat(parseFloat(subtotalnew) * parseFloat(discountRate / 100).toFixed(2)));
        settotal(parseFloat(subtotalnew - discountAmount) + parseFloat(taxAmount));

    };

    const onItemizedItemEdit =(evt)=> {
        const item = {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value,
            index: evt.target.selectedIndex
        };
        const itemss = items.slice();

        const newItems = itemss.map(function (items) {
            for (const key in items) {
                if (key == item.name && items.id == item.id) {
                    items[key] = item.value;
                    if(item.index){
                        items.price = service[item.index].sellingPrice;
                    }
                    // items.price = service[item.index].sellingPrice || items.price;
                }
            }
            // items.price = service[evt.target.selectedIndex].sellingPrice;
            return items;
        });
        setitems(newItems);
        handleCalculateTotal();
    };


    const onItemizedPartsEdit =(evt)=> {
        console.log('process')
        const part = {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value
        };
        const partss = parts.slice();
        const newItems = partss.map(function (items) {
            for (const key in items) {
                if (key == part.name && items.id == part.id) {
                    items[key] = part.value;
                    items.price = Parts[evt.target.selectedIndex].sellingPrice;
                }
            }
            // Parts[evt.target.selectedIndex].sellingPrice
            return items;
        });
        setparts(newItems);
        handleCalculateTotal();
    };

    const updateinvoiceNumber = (e) => {
        setinvoiceNumber(e.target.value);
    }
    const updatedateOfIssue = (e) => {
        setdateOfIssue(e.target.value);
    }
    const updatebillTo = (e) => {
        setbillTo(e.target.value);
    }
    const updatebillToEmail = (e) => {
        setbillToEmail(e.target.value);
    }
    const updatebillToAddress = (e) => {
        setbillToAddress(e.target.value);
    }
    const updatebillFrom = (e) => {
        setbillFrom(e.target.value);
    }
    const updatebillFromEmail = (e) => {
        setbillFromEmail(e.target.value);
    }
    const updatebillFromAddress = (e) => {
        setbillFromAddress(e.target.value);
    }
    const updatenotes = (e) => {
        setnotes(e.target.value);
    }
    const updatetaxRate = (e) => {
        settaxRate(e.target.value);
        handleCalculateTotal();
    }
    const updatediscountRate = (e) => {
        setdiscountRate(e.target.value);
        handleCalculateTotal();
    }

    const updateVBrand = (e) => {
        setVBrand(e.target.value);
    }
    const updateVNumber = (e , i) => {

        setVNumber(e.target.value);
        const list = [...Customers];
        const vbrand = list[e.target.selectedIndex].vehicleBrand ;
        const name = list[e.target.selectedIndex].name;
        const contactNo = list[e.target.selectedIndex].contactNo;
        const address = list[e.target.selectedIndex].address;
        const vehicleModel = list[e.target.selectedIndex].vehicleModel;
        const vehicleColor = list[e.target.selectedIndex].vehicleColor;
        const vehicleYear = list[e.target.selectedIndex].vehicleYear;
        const vehicleChassiNO =  list[e.target.selectedIndex].vehicleChassiNO;
        setVBrand(vbrand)
        setVModel(vehicleModel)
        setVColor(vehicleColor)
        setVYear(vehicleYear)
        setCNumber(vehicleChassiNO)
        setbillTo(name)
        setbillToEmail(contactNo)
        setbillToAddress(address)

    }
    const updateVModel = (e) => {
        setVModel(e.target.value);
    }
    const updateVColor = (e) => {
        setVColor(e.target.value);
    }
    const updateVYear = (e) => {
        setVYear(e.target.value);
    }
    const updateCNumber = (e) => {
        setCNumber(e.target.value);
    }



    const onCurrencyChange = (selectedOption) => {
        setcurrency(selectedOption);
    };


    const openModal = (event) => {
        event.preventDefault()
        handleCalculateTotal()
        setisOpen( true)
    };

    const closeModal = (event) => setisOpen( false)




    return (
        <Form onSubmit={openModal}>
            <Row>
                <Col md={8} lg={9}>
                    <Card className="p-4 p-xl-5 my-3 my-xl-4">
                        <div className="d-flex flex-row align-items-start justify-content-between mb-3">
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-column">
                                    <div className="mb-2">
                                        <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                                        <span className="current-date">{new Date().toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center">
                                    <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                                    <Form.Control type="date" value={dateOfIssue} name={"dateOfIssue"} onChange={(event) => updatedateOfIssue(event)} style={{
                                        maxWidth: '150px'
                                    }} required="required"/>
                                </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                                <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                                <Form.Control type="number" value={invoiceNumber} name={"invoiceNumber"} onChange={(event) => updateinvoiceNumber(event)} min="1" style={{
                                    maxWidth: '70px'
                                }} required="required"/>
                            </div>
                        </div>
                        <h1 style={{textAlign:"center"}}>{props.Heading}</h1>
                        <hr className="my-4"/>
                        <Row className="mb-5">
                            <Form.Label className="fw-bold">Vehicle Details</Form.Label>
                            <Col>
                                <Form.Select  placeholder={"Vehicle Number"} rows={3} value={VNumber} type="text" name="vnumber" className="my-2" onChange={(event) => updateVNumber(event)} autoComplete="vnumber" required="required">
                                    <option>Select the vehicle number</option>
                                    {Customers.map((items, i) => (
                                        <option key={i} value={items.vehicleNumber} >{items.vehicleNumber}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control placeholder={"Vehicle Brand"} value={VBrand} type="text" name="brand" className="my-2" onChange={(event) => updateVBrand(event)} autoComplete="text" required="required"/>
                                <Form.Control placeholder={"Vehicle Model"} value={VModel} type="text" name="VModel" className="my-2" autoComplete="VModel" onChange={(event) => updateVModel(event)} required="required"/>
                            </Col>
                            <Col>
                                <Form.Control placeholder={"Chassis Number"} rows={3} value={CNumber} type="text" name="CNumber" className="my-2" onChange={(event) => updateCNumber(event)} autoComplete="CNumber" required="required"/>
                                <Form.Control placeholder={"Vehicle Year"} value={VYear} type="number" name="VYear" className="my-2" onChange={(event) => updateVYear(event)} autoComplete="VYear" required="required"/>
                                <Form.Control placeholder={"Vehicle Color"} value={VColor} type="text" name="VColor" className="my-2" autoComplete="VColor" onChange={(event) => updateVColor(event)} required="required"/>
                            </Col>
                        </Row>
                        <hr className="my-4"/>
                        <Row className="mb-5">
                            <Col>
                                <Form.Label className="fw-bold">Bill to:</Form.Label>
                                <Form.Control placeholder={"Who is this invoice to?"} rows={3} value={billTo} type="text" name="billTo" className="my-2" onChange={(event) => updatebillTo(event)} autoComplete="name" required="required"/>
                                <Form.Control placeholder={"Mobile Number"} value={billToEmail} type="tel" name="billToEmail" className="my-2" onChange={(event) => updatebillToEmail(event)} autoComplete="tel" required="required"/>
                                <Form.Control placeholder={"Billing address"} value={billToAddress} type="text" name="billToAddress" className="my-2" autoComplete="address" onChange={(event) => updatebillToAddress(event)} required="required"/>
                            </Col>
                            <Col>
                                <Form.Label className="fw-bold">Bill from:</Form.Label>
                                <Form.Control placeholder={"Who is this invoice from?"} rows={3} value={billFrom} type="text" name="billFrom" className="my-2" onChange={(event) => updatebillFrom(event)} autoComplete="name" required="required"/>
                                <Form.Control placeholder={"Mobile Number"} value={billFromEmail} type="tel" name="billFromEmail" className="my-2" onChange={(event) => updatebillFromEmail(event)} autoComplete="tel" required="required"/>
                                <Form.Control placeholder={"Billing address"} value={billFromAddress} type="text" name="billFromAddress" className="my-2" autoComplete="address" onChange={(event) => updatebillFromAddress(event)} required="required"/>
                            </Col>
                        </Row>
                        <InvoiceItem onItemizedItemEdit={onItemizedItemEdit} onItemizedPartsEdit={onItemizedPartsEdit} onRowAdd={handleAddEvent} onRowPartAdd={handlePartAddEvent} onRowDel={handleRowDel} onPartRowDel={handlePartRowDel} currency={currency} items={items} item={service} dataparts={parts} parts={Parts}/>
                        <Row className="mt-4 justify-content-end">
                            <Col lg={6}>
                                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Subtotal:
                  </span>
                                    <span>{currency}
                                        {subTotal}</span>
                                </div>
                                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                                    <span className="fw-bold">Discount:</span>
                                    <span>
                    <span className="small ">({discountRate || 0}%)</span>
                                        {currency}
                                        {discountAmount || 0}</span>
                                </div>
                                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Tax:
                  </span>
                                    <span>
                    <span className="small ">({taxRate || 0}%)</span>
                                        {currency}
                                        {taxAmount || 0}</span>
                                </div>
                                <hr/>
                                <div className="d-flex flex-row align-items-start justify-content-between" style={{
                                    fontSize: '1.125rem'
                                }}>
                  <span className="fw-bold">Total:
                  </span>
                                    <span className="fw-bold">{currency}
                                        {total || 0}</span>
                                </div>
                            </Col>
                        </Row>
                        <hr className="my-4"/>
                        <Form.Label className="fw-bold">Notes:</Form.Label>
                        <Form.Control placeholder="Thanks for your business!" name="notes" value={notes} onChange={(event) => updatenotes(event)} as="textarea" className="my-2" rows={1}/>
                    </Card>
                </Col>
                <Col md={4} lg={3}>
                    <div className="sticky-top pt-md-3 pt-xl-4">
                        <Button variant="primary" style={{background:'#19335A' ,outline:"none", border:"none"}} type="submit" className="d-block w-100">Review Invoice</Button>
                        <br></br>
                        <Button variant="primary" style={{background:'#19335A' ,outline:"none", border:"none"}} type="submit" className="d-block w-100">Job Card</Button>
                        <InvoiceModal showModal={isOpen}  closeModal={closeModal} invoiceNumber={invoiceNumber} billTo={billTo} billToAddress={billToAddress} billToEmail={billToEmail} billFrom={billFrom} billFromAddress={billFromAddress} notes={notes} billFromEmail={billFromEmail} dateOfIssue={dateOfIssue} items={items} parts={parts} currency={currency} subTotal={subTotal} taxAmmount={taxAmount} discountAmmount={discountAmount} total={total} customer={VNumber} VBrand={VBrand} VModel={VModel} Chassis={CNumber} Year={VYear} color={VColor}/>
                        <Jobcard showModal={isOpen}  closeModal={closeModal} invoiceNumber={invoiceNumber} billTo={billTo} billToAddress={billToAddress} billToEmail={billToEmail} billFrom={billFrom} billFromAddress={billFromAddress} notes={notes} billFromEmail={billFromEmail} dateOfIssue={dateOfIssue} items={items} parts={parts} currency={currency} subTotal={subTotal} taxAmmount={taxAmount} discountAmmount={discountAmount} total={total} customer={VNumber} VBrand={VBrand} VModel={VModel} Chassis={CNumber} Year={VYear} color={VColor}/>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Currency:</Form.Label>
                            <Form.Select onChange={event => onCurrencyChange( event.target.value)} className="btn btn-light my-1" aria-label="Change Currency">
                                <option value="$">USD (United States Dollar)</option>
                                <option value="£">GBP (British Pound Sterling)</option>
                                <option value="¥">JPY (Japanese Yen)</option>
                                <option value="$">CAD (Canadian Dollar)</option>
                                <option value="$">AUD (Australian Dollar)</option>
                                <option value="$">SGD (Signapore Dollar)</option>
                                <option value="¥">CNY (Chinese Renminbi)</option>
                                <option value="₿">BTC (Bitcoin)</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Form.Label className="fw-bold">Tax rate:</Form.Label>
                            <InputGroup className="my-1 flex-nowrap">
                                <Form.Control name="taxRate" type="number" value={taxRate} onChange={(event) => updatetaxRate(event)} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                                    %
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Form.Label className="fw-bold">Discount rate:</Form.Label>
                            <InputGroup className="my-1 flex-nowrap">
                                <Form.Control name="discountRate" type="number" value={discountRate} onChange={(event) => updatediscountRate(event)} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                                    %
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                    </div>
                </Col>
            </Row>
        </Form>
    )

}

export default InvoiceForm;