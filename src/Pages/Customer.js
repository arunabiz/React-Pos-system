import React, {useEffect, useState} from 'react'
// import {Link, Route, useHistory} from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import "../assets/css/Customer.css";
import {DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton} from "@material-ui/data-grid";
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
function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

const Customer = () => {

    const [value, setValue] = React.useState(0);
    const [Name,setName] = useState()
    const [Contact,setContact] = useState()
    const [Address,setAddress] = useState()
    const [VName,setVName] = useState()
    const [VBrand,setVBrand] = useState()
    const [VNumber,setVNumber] = useState()
    const [VModel,setVModel] = useState()
    const [VColor,setVColor] = useState()
    const [VYear,setVYear] = useState()
    const [CNumber,setCNumber] = useState()
    const [status,setstatus] = useState(false)

    const[formError, setformError] = useState()
    const[formSuccess, setformSuccess] = useState()
    const[error, seterror] = useState()

    const[customers, setcustomers] = useState([])

    const updateName = (e) => {
        setName(e.target.value);
    }
    const updateContact = (e) => {
        setContact(e.target.value);
    }
    const updateAddress = (e) => {
        setAddress(e.target.value);
    }

    const updateVName = (e) => {
        setVName(e.target.value);
    }
    const updateVBrand = (e) => {
        setVBrand(e.target.value);
    }
    const updateVNumber = (e) => {
        setVNumber(e.target.value);
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

    const submit =(e) =>{
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/api/customer/register/', {
            name: Name,
            contactNo: Contact,
            address: Address,
            vehicleName: VName,
            vehicleBrand: VBrand,
            vehicleNumber: VNumber,
            vehicleModel: VModel,
            vehicleColor: VColor,
            vehicleYear: VYear,
            vehicleChassiNO: CNumber,
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

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/customer/get/').then((response) => {
            setcustomers(response.data.data);
            // console.log(setcustomers);
        });

    }, [status]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
        },
        {
            field: 'contactNo',
            headerName: 'Contact No.',
            width: 150,
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 250,
        },
        {
            field: 'vehicleName',
            headerName: 'Vehicle Name',
            width: 150  ,
        },
        {
            field: 'vehicleNumber',
            headerName: 'Vehicle Number',
            width: 150,
        },
        {
            field: 'vehicleBrand',
            headerName: 'Vehicle Brand',
            width: 150,
        },
        {
            field: 'vehicleModel',
            headerName: 'Vehicle Model',
            width: 150,
        },
        {
            field: 'vehicleColor',
            headerName: 'Vehicle Color',
            width: 100  ,
        },
        {
            field: 'vehicleYear',
            headerName: 'Vehicle Year',
            width: 150,
        },
        {
            field: 'vehicleChassiNO',
            headerName: 'Vehicle ChassiNO',
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
                                        <Tab label={<div className="customertab"><i className="bx bxs-user-plus"></i>Add Customer</div>} {...a11yProps(0)} />
                                        <Tab label={<div className="customertab"><i className="bx bxs-note"></i>Customer Details</div>} {...a11yProps(1)} />
                                    </Tabs>
                                </AppBar>
                            </div>
                            <br/>
                            <br/>


                                <TabPanel value={value} index={0}>
                                    <div className="card full-height">
                                    <div>
                                        <h2 className="customertitle">Customer Details</h2>
                                        <form  onSubmit={submit}>
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
                                                    <input type="text" autoFocus placeholder="" value={Name} onChange={(e) => updateName(e)}
                                                           required/>
                                                </div>
                                                <div className="rowcustomer">
                                                    <label>Contact No. *</label>
                                                    <input type="tel" id="phone" name="phone"  autoFocus placeholder="" value={Contact} onChange={(e) => updateContact(e)}
                                                           required/>
                                                </div>
                                                <div className="rowcustomer">
                                                    <label>Address *</label>
                                                    <input type="text" autoFocus placeholder="" value={Address} onChange={(e) => updateAddress(e)}
                                                           required/>
                                                </div>
                                            </div>
                                            </div>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <h2 className="customertitle">Vehicle Details</h2>
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="rowcustomer">
                                                        <label>Vehicle Name *</label>
                                                        <input type="text" autoFocus placeholder="" value={VName} onChange={(e) => updateVName(e)}
                                                               required/>
                                                    </div>
                                                    <div className="rowcustomer">
                                                        <label>Vehicle Brand *</label>
                                                            <select id="department" name="department" value={VBrand} onChange={(e) => updateVBrand(e)} required>
                                                                <option value="Toyota" selected>Toyota</option>
                                                                <option value="Mazda" selected>Mazda</option>
                                                                <option value="Honda" selected>Honda</option>
                                                                <option value="Benz" selected>Benz</option>
                                                                <option value="Bmw" selected>Bmw</option>
                                                            </select>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="rowcustomer">
                                                        <label>Vehicle Number *</label>
                                                        <input type="text" autoFocus placeholder="" value={VNumber} onChange={(e) => updateVNumber(e)}
                                                               required/>
                                                    </div>
                                                    <div className="rowcustomer">
                                                        <label>Vehicle Model *</label>
                                                        <input type="text" autoFocus placeholder="" value={VModel} onChange={(e) => updateVModel(e)}
                                                               required/>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="rowcustomer">
                                                            <label>Vehicle Color *</label>
                                                            <input type="text" autoFocus placeholder="" value={VColor} onChange={(e) => updateVColor(e)}
                                                                   required/>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="rowcustomer">
                                                        <label>Vehicle Year *</label>
                                                        <input type="number" autoFocus placeholder="" value={VYear} onChange={(e) => updateVYear(e)}
                                                               required/>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="rowcustomer">
                                                        <label>Chassis Number *</label>
                                                        <input type="text" autoFocus placeholder="" value={CNumber} onChange={(e) => updateCNumber(e)}
                                                               required/>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<div className="rowuser">*/}
                                            {/*    <label>Device Type</label>*/}
                                            {/*    <select id="department" name="department" value={deviceTypeId}*/}
                                            {/*            onChange={(e) => setdeviceTypeId(e.target.value)} required>*/}
                                            {/*        <option value="" selected></option>*/}
                                            {/*        {listData4.lists.map((country, key) => (*/}
                                            {/*            <option key={key} value={country.id}>*/}
                                            {/*                {country.deviceTypename}*/}
                                            {/*            </option>*/}
                                            {/*        ))}*/}
                                            {/*    </select>*/}
                                            {/*</div>*/}
                                            <br/>
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
                                                          rows={customers}
                                                          columns={columns}
                                                          pageSize={10}
                                                          components={{
                                                              Toolbar: CustomToolbar,
                                                          }}
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

export default Customer