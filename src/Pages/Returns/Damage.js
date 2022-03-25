import React, {useEffect, useState} from 'react'
// import {Link, Route, useHistory} from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../../components/sidebar/Sidebar";
import TopNav from "../../components/topnav/TopNav";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {DataGrid} from "@material-ui/data-grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";



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

const Damage = () => {

    const [value, setValue] = React.useState(0);


    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'Name',
            headerName: 'Name',
            width: 200,
        },
        {
            field: 'ContactNo',
            headerName: 'Contact No.',
            width: 150,
        },
        {
            field: 'Action',
            headerName: 'action',
            width: 250,
        },
    ];

    const rows = [
        {
            "id": 1,
            "firstName": "mujeeb",
            "lastName": "singham",
            "email": "chandulagayan@gmail.com",
            "verificationtoken": "1234",
            "epfNo": null,
            "phoneNo": "0776465645",
            "image": null,
            "statusId": 1,
            "password": "$2y$10$zrrjILLqTKyxYiR3jrOdvuaE.tEG3U148gVPoe7zYQLpitytXpyU2 ",
            "createdAt": "2021-07-16T10:38:11.002Z",
            "updatedAt": "2021-07-16T10:38:11.002Z",
        },
        {
            "id": 9,
            "firstName": "Gayath",
            "lastName": "Chandula",
            "email": "chandulagayan1@gmail.com",
            "verificationtoken": "g96wx6",
            "epfNo": "47586598",
            "phoneNo": null,
            "image": "uploads/dashboard.JPG-1626512057383.jpeg",
            "statusId": 50,
            "password": "$2b$10$vqy4Pln0C.V88NOCdpOOFOKZYHbVGWv.yV/7XLn7cpYxLQnV2PzPi",
        }
    ];


    const handletab = (event, newValue) => {
        setValue(newValue);
    };

    //new
    const[damage, setdamage] = useState([])
    const [status,setstatus] = useState(false)

    // const[Return, setReturn] = useState([])
    // const [status,setstatus] = useState(false)

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/damage/get/').then((response) => {
            setdamage(response.data.data);
            console.log(response.data.data)
        });

    }, [status]);


    // useEffect(() => {
    //     axios.get('http://127.0.0.1:8000/api/return/get/').then((response) => {
    //         setdamage(response.data.data);
    //         console.log(response.data.data)
    //     });

    // }, [status]);

    //new

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
                                        <Tab label={<div className="customertab"><i className='bx bxs-duplicate'></i>Product Returns</div>} {...a11yProps(0)} />
                                        <Tab label={<div className="customertab"><i className="bx bxs-note"></i>Return Details</div>} {...a11yProps(1)} />
                                        <Tab label={<div className="customertab"><i className="bx bxs-note"></i>Damage Items</div>} {...a11yProps(2)} />
                                    </Tabs>
                                </AppBar>
                            </div>
                            <br/>
                            <br/>


                            <TabPanel value={value} index={0}>
                                {/*<div className="card full-height">*/}
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card full-height">
                                            <div>
                                                <h2 className="brandtitle">Product Returns</h2>
                                                <form onSubmit="#">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="rowcustomer">
                                                                <label>Product Brand</label>
                                                                <input type="text" autoFocus placeholder="" value="#"
                                                                       required/>
                                                            </div>
                                                            <div className="rowcustomer">
                                                                <label>Stock</label>
                                                                <select id="department" name="department" required>
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
                                                                <label>Product</label>
                                                                <input type="text" autoFocus placeholder="" value="#"
                                                                       required/>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="rowcustomer">
                                                                <label>Return Quantity</label>
                                                                <input type="number" required/>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="rowcustomer">
                                                            <span className="fw-bold">Current&nbsp;Date:&nbsp;</span><br></br>
                                                            <span className="current-date"  required>{new Date().toLocaleDateString()}</span> 
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
                                                    <div id="button" className="rowbrandsbutton">
                                                        <button type="submit" >Return</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*</div>*/}
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card full-height">
                                            <div style={{ height: 400, width: '100%'}}>
                                                <DataGrid
                                                    theme={useStyles}
                                                    rows={rows}
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
                            <TabPanel value={value} index={2}>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card full-height">
                                            <div style={{ height: 400, width: '100%'}}>
                                                <DataGrid
                                                    theme={useStyles}
                                                    rows={rows}
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

export default Damage