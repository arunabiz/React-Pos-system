import React, {useEffect, useState} from 'react'
// import {Link, Route, useHistory} from 'react-router-dom';
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import "../assets/css/Customer.css";
import {DataGrid} from "@material-ui/data-grid";
import {makeStyles} from "@material-ui/core/styles";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import axios from "axios";

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

const Suppliers = () => {

    const [value, setValue] = React.useState(0);

    const [Name,setName] = useState()
    const [Contact,setContact] = useState()
    const [Address,setAddress] = useState()

    const [status,setstatus] = useState(false)

    const[formError, setformError] = useState()
    const[formSuccess, setformSuccess] = useState()
    const[error, seterror] = useState()

    const[Suppliers, setSuppliers] = useState([])

    const updateName = (e) => {
        setName(e.target.value);
    }
    const updateContact = (e) => {
        setContact(e.target.value);
    }
    const updateAddress = (e) => {
        setAddress(e.target.value);
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/supplier/get/').then((response) => {
            setSuppliers(response.data.data);
        });

    }, [status]);

    const submit =(e) =>{
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/api/supplier/register/', {
            supplierName: Name,
            supplierContact: Contact,
            supplierAddress: Address,
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

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'supplierName',
            headerName: 'Name',
            width: 200,
        },
        {
            field: 'supplierContact',
            headerName: 'Contact No.',
            width: 150,
        },
        {
            field: 'supplierAddress',
            headerName: 'Address',
            width: 250,
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
                                        <Tab label={<div className="customertab"><i className="bx bxs-user-plus"></i>Add Supplier</div>} {...a11yProps(0)} />
                                        <Tab label={<div className="customertab"><i className="bx bxs-note"></i>Suppliers Details</div>} {...a11yProps(1)} />
                                    </Tabs>
                                </AppBar>
                            </div>
                            <br/>
                            <br/>


                            <TabPanel value={value} index={0}>
                                <div className="card full-height">
                                    <div>
                                        <h2 className="customertitle">Suppliers Details</h2>
                                        <form onSubmit={submit}>
                                            <div className="row">
                                                {formSuccess ? (
                                                    <Alert severity="success">
                                                        <AlertTitle>Success</AlertTitle>
                                                        user registration was <strong>successful!</strong>
                                                    </Alert>
                                                ) : null }
                                                {formError ? (
                                                    <Alert severity="error">
                                                        <AlertTitle>Error</AlertTitle>
                                                        {error} — <strong>check it out!</strong>
                                                    </Alert>
                                                ) : null
                                                }
                                                <div className="col-6">
                                                    <div className="rowcustomer">
                                                        <label>Name *</label>
                                                        <input type="text" name="name" autoFocus placeholder="" value={Name} onChange={(e) => updateName(e)}
                                                               required/>
                                                    </div>
                                                    <div className="rowcustomer">
                                                        <label>Contact No. *</label>
                                                        <input type="number" id="phone" name="phone" autoFocus placeholder="" value={Contact} onChange={(e) => updateContact(e)}
                                                               required/>
                                                    </div>
                                                    <div className="rowcustomer">
                                                        <label>Address *</label>
                                                        <input type="text" autoFocus placeholder="" value={Address} onChange={(e) => updateAddress(e)}
                                                               required/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="button" className="rowcustomerbutton">
                                                <button type="submit" >Register</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card full-height">
                                            <div style={{ height: 400, width: '100%'}}>
                                                <DataGrid
                                                    theme={useStyles}
                                                    rows={Suppliers}
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
                            </TabPanel>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Suppliers