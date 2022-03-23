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


const Inventoryreport = () => {
    const [value, setValue] = React.useState(0);

    const [dateOfFrom,setdateOfFrom] = useState()
    const [dateOfTo,setdateOfTo] = useState()
    const [status,setstatus] = useState(false)

    const[formError, setformError] = useState()
    const[formSuccess, setformSuccess] = useState()
    const[error, seterror] = useState()

    const[total_transaction, settotalValue] = useState(0)

    const[total_salecost, setsaleCost] = useState(0)
    const[total_income, settotalIncome] = useState(0)
    const[total_inventory, setsaleInventory] = useState(0)
    const[total_productcost, settotalProductCost] = useState(0)
    const[total_productprofit, settotalProductsale] = useState(0)
    const[service_chages, setserviceChages] = useState(0)
   
   

    const[items, setItems] = useState([])


    const updatedateOfFrom = (e) => {
        setdateOfFrom(e.target.value);
    }
    const updatedateOfTo = (e) => {
        setdateOfTo(e.target.value);
    }
    


    const submit =(e) =>{
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/api/product/get/inventory/', {
            start_date: dateOfFrom,
            end_date: dateOfTo,
        }, [status])
        .then((response) => {
  
            settotalIncome(response.data.data.total_income)
            setsaleInventory(response.data.data.total_inventory)
            settotalProductCost(response.data.data.total_product_cost)
            settotalProductsale(response.data.data.total_product_sale)
            setItems(response.data.data.items)
            // setsaleProfit(response.data.data.total_profit)
            // setInvoice(response.data.data.invoice)
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
            field: 'productName',
            headerName: 'Product Name',
            width: 200,
        },
        {
            field: 'producttype',
            headerName: 'Product Type',
            width: 150,
        },
        {
            field: 'brand',
            headerName: 'Brand',
            width: 150,
        },
        {
            field: 'supplier',
            headerName: 'Supplier',
            width: 150,
        },
        {
            field: 'purchPrice',
            headerName: 'Purch Price',
            width: 150,
        },
        {
            field: 'quantity',
            headerName: 'QTY',
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
                                    <Tab label={<div className="customertab"><i className='bx bxs-duplicate'></i>Inventory Report</div>} {...a11yProps(0)} />
                                </Tabs>
                            </AppBar>
                        </div>
                        <br/><br/>


                        <TabPanel value={value} index={0}>
                           

                                    <div className="card full-height">
                                        <div>
                                            <h2 className="brandtitle">Inventory Report</h2>
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
                                                            <button type="submit" className="btn mx-2 btn-success">Filter</button>
                                                            <button className="btn btn-warning">Clear</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>

                                            <div className="row justify-content-center">
                                                <div className="col-3">
                                                    <div className="info-box">
                                                        <span className="info-box-icon bg-navy">
                                                            <i className="bx bxs-cart text-white" width="55" height="55"></i>
                                                        </span>
                                                        <div className="info-box-content">
                                                            <span className="info-box-text">Total Inventory</span>
                                                            <span className="info-box-number">{total_inventory}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="info-box">
                                                        <span className="info-box-icon bg-navy">
                                                            <i className="bx bx-money text-white" width="24" height="24"></i>
                                                        </span>
                                                        <div className="info-box-content">
                                                            <span className="info-box-text">Total Sale </span>
                                                            <span className="info-box-number">Rs.{total_productprofit}</span>
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
                                                            <span className="info-box-number">Rs.{total_productcost}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div className="row ">
                                                <div className="  col-md-12 col-xs-12">
                                                    <div className="info-box"></div>
                                                </div>
                                            </div>
                                            <div className="row mb-5 justify-content-center">
                                                <div className="col-md-3 col-xs-4">
                                                    <div className="info-box">
                                                        <span className="info-box-icon bg-teal">
                                                            <i className="bx bx-money text-white" width="24" height="24"></i>
                                                        </span>
                                                        <div className="info-box-content">
                                                            <span className="info-box-text">Total Income</span>
                                                            <span className="info-box-number">Rs. {total_income}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3 col-xs-4">
                                                    <div className="info-box">
                                                        <span className="info-box-icon bg-teal">
                                                            <i className="bx bx-money text-white" width="24" height="24"></i>
                                                        </span>
                                                        <div className="info-box-content">
                                                            <span className="info-box-text">Total Service Chages</span>
                                                            <span className="info-box-number">Rs. {service_chages}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="card full-height">
                                                    <div style={{ height: 400, width: '100%'}}>
                                                        <DataGrid
                                                            theme={useStyles}
                                                            rows={items}
                                                            columns={columns}
                                                            pageSize={5}
                                                            // checkboxSelection
                                                            disableSelectionOnClick
                                                            // onSelectionModelChange={(e) => {
                                                            //     const selectedIDs = new Set(e.selectionModel);
                                                            //     const selectedRowData = listData1.lists.filter((row) =>
                                                            //         selectedIDs.has(row.id)
                                                            //     );
                                                            //     setemailreceipents(selectedRowData)
                                                            //     console.log("selected rowData:", selectedRowData);
                                                            // }}
                                                            // selectionModel={selectionModel}
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

export default Inventoryreport