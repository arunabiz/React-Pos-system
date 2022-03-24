import React, {useState,useEffect} from 'react'
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Sidebar from "../../components/sidebar/Sidebar";
import TopNav from "../../components/topnav/TopNav";
import "../../assets/css/salereport.css";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Form from 'react-bootstrap/Form';
import {DataGrid} from "@material-ui/data-grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Button from 'react-bootstrap/Button';
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    typography: {
        fontFamily: 'SF-Pro-Text',
    },
});


const Salereport = () => {
    const [value, setValue] = React.useState(0);

    const [dateOfFrom,setdateOfFrom] = useState()
    const [dateOfTo,setdateOfTo] = useState()
    const [status,setstatus] = useState(false)

    const[sales, setsales] = useState([])

    const[formError, setformError] = useState()
    const[formSuccess, setformSuccess] = useState()
    const[error, seterror] = useState()

    const[total_transaction, settotalValue] = useState(0)
    const[total_salerevenue, setsaleRevenue] = useState(0)
    const[total_salecost, setsaleCost] = useState(0)
    const[total_saleprofit, setsaleProfit] = useState(0)
    const[total_revenue, settotalRevenue] = useState(0)
    const[total_cost, settotalCost] = useState(0)
    const[total_profit, settotalProfit] = useState(0)

    const[invoice, setInvoice] = useState([])


    const updatedateOfFrom = (e) => {
        setdateOfFrom(e.target.value);
    }
    const updatedateOfTo = (e) => {
        setdateOfTo(e.target.value);
    }


    const submit =(e) =>{
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/api/invoice/get/search/', {
            start_date: dateOfFrom,
            end_date: dateOfTo,
        }, [status])
        .then((response) => {
  
            settotalValue(response.data.data.total_transaction);
            setsaleRevenue(response.data.data.total_revenue);
            setsaleCost(response.data.data.total_sale_cost);
            settotalValue(response.data.data.total_transaction);
            setsaleProfit(response.data.data.total_profit);
            setInvoice(response.data.data.invoice)
            // settotalValue(response.data.data.total_profit)
            // settotalValue(response.data.data.total_profit)
            // this.total_profit = response.data.data.total_profit;
            // setsales(response.data.data);
            console.log(response.data.data);

        });

    }

    const columns = [

        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'customer',
            headerName: 'Customer',
            width: 200,
        },
        {
            field: 'inv_date',
            headerName: 'Date Created',
            width: 150,
        },
        {
            field: 'discount',
            headerName: 'Discount',
            width: 150,
        },
        {
            field: 'total_vat',
            headerName: 'VAT',
            width: 150,
        },
        {
            field: 'total_sub_cost',
            headerName: 'Total Cost',
            width: 150,
        },
        {
            field: 'total_sub_profit',
            headerName: 'Total Profit',
            width: 150,
        },
        {
            field: 'totalAmount',
            headerName: 'Total Amount',
            width: 150,
        },
        {
            field: 'Action',
            headerName: 'action',
            width: 250,
        },

    ];

    const handletab = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
        <Sidebar/>
        <div id="main" className="layout__content">
            <TopNav/>
            <div className="layout__content-main">
                <div className="row">
                    <div className="col-12">
                        <div className="card__header">
                            <AppBar position="static" style={{
                                background: `#FFFFFF`,
                                color:"#001C2D",
                                borderRadius: "8px"
                            }}>
                                <Tabs TabIndicatorProps={{
                                    style: {
                                        marginBottom:"5px",
                                        marginLeft:"4px",
                                        backgroundColor: "#001C2D",

                                    }
                                }} value={value} onChange={handletab}>
                                    <Tab label={<div className="customertab"><i className='bx bxs-duplicate'></i>Sale Report</div>} {...a11yProps(0)} />
                                </Tabs>
                            </AppBar>
                        </div>
                        <br/><br/>


                        <TabPanel value={value} index={0}>
                           

                                    <div className="card full-height">
                                        <div>
                                            <h2 className="brandtitle">Sale Report</h2>
                                            <form onSubmit={submit}>
                                                <div className="row mb-5">
                                                    <div className="col-4">
                                                        <div className="rowcustomer">
                                                            <label>From Date :</label>
                                                            <Form.Control type="date" value={dateOfFrom} name={"dateOfFrom"} onChange={(event) => updatedateOfFrom(event)} required="required"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="rowcustomer">
                                                            <label>To Date:</label>
                                                            <Form.Control type="date" value={dateOfTo} name={"dateOfTo"} onChange={(event) => updatedateOfTo(event)} required="required"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div id="button" className="rowbrandsbutton">
                                                            <button type="submit" className="btn mx-1 w-100 btn-success">Filter</button>
                                                            <button type="button" className="btn mx-1 w-100 btn-warning">Clear</button>
                                                            <Button variant="outline-primary" className=" mx-1 w-100"> Download </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>

                                            <div className="row ">
                                                <div className="col-3">
                                                    <div className="info-box">
                                                        <span className="info-box-icon bg-navy">
                                                            <i className="bx bxs-cart text-white" width="55" height="55"></i>
                                                        </span>
                                                        <div className="info-box-content">
                                                            <span className="info-box-text">Total Transaction</span>
                                                            <span className="info-box-number">{total_transaction} </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="info-box">
                                                        <span className="info-box-icon bg-navy">
                                                            <i className="bx bx-money text-white" width="24" height="24"></i>
                                                        </span>
                                                        <div className="info-box-content">
                                                            <span className="info-box-text">Total Sale Revenue</span>
                                                            <span className="info-box-number">Rs.{total_salerevenue}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="info-box">
                                                        <span className="info-box-icon bg-navy">
                                                            <i className="bx bx-money text-white" width="24" height="24"></i>
                                                        </span>
                                                        <div className="info-box-content">
                                                            <span className="info-box-text">Total Sale Cost</span>
                                                            <span className="info-box-number">Rs.{total_salecost}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="info-box">
                                                        <span className="info-box-icon bg-navy">
                                                            <i className="bx bx-money text-white" width="24" height="24"></i>
                                                        </span>
                                                        <div className="info-box-content">
                                                            <span className="info-box-text">Total Sale Profit</span>
                                                            <span className="info-box-number">Rs.{total_saleprofit}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row ">
                                                <div className="  col-md-12 col-xs-12">
                                                    <div className="info-box"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="card full-height">
                                                    <div style={{ height: 400, width: '100%'}}>
                                                        <DataGrid
                                                            theme={useStyles}
                                                            rows={invoice }
                                                            columns={columns}
                                                            pageSize={10}
                                                            
                                                        
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>  
                    
                    </div>
                </div>
            </div>

        </div>

    </>
  )
}

export default Salereport