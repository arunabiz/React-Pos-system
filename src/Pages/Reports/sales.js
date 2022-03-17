import React, {useState,useEffect} from 'react'
// eslint-disable-next-line no-unused-vars
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

    const updatedateOfFrom = (e) => {
        setdateOfFrom(e.target.value);
    }
    const updatedateOfTo = (e) => {
        setdateOfTo(e.target.value);
    }

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
                            {/*<div className="card full-height">*/}

                                    <div className="card full-height">
                                        <div>
                                            <h2 className="brandtitle">Sale Report</h2>
                                            <form onSubmit="#">
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
                                                            <button type="submit" className="btn btn-warning">Clear</button>
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
                                                            <span className="info-box-text">Total Sale Profit</span>
                                                            <span className="info-box-number">Rs.&nbsp;650</span>
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
                                                            <span className="info-box-number">Rs.&nbsp;650</span>
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
                                                            <span className="info-box-number">Rs.&nbsp;650</span>
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
                                                            <span className="info-box-number">Rs.&nbsp;650</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="  col-md-12 col-xs-12">
                                                    <div className="info-box"></div>
                                                </div>
                                            </div>
                                            <div className="row justify-content-center">
                                                <div className="col-md-3 col-xs-4">
                                                    <div className="info-box">
                                                        <span className="info-box-icon bg-teal">
                                                            <i className="bx bx-money text-white" width="24" height="24"></i>
                                                        </span>
                                                        <div className="info-box-content">
                                                            <span className="info-box-text">Total Revenue</span>
                                                            <span className="info-box-number">Rs. &nbsp;75,282</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3 col-xs-4">
                                                    <div className="info-box">
                                                        <span className="info-box-icon bg-teal">
                                                            <i className="bx bx-money text-white" width="24" height="24"></i>
                                                        </span>
                                                        <div className="info-box-content">
                                                            <span className="info-box-text">Total Cost</span>
                                                            <span className="info-box-number">Rs. &nbsp;308,004</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3 col-xs-4">
                                                    <div className="info-box">
                                                        <span className="info-box-icon bg-teal">
                                                            <i className="bx bx-money text-white" width="24" height="24"></i>
                                                        </span>
                                                        <div className="info-box-content">
                                                            <span className="info-box-text">Total Profit</span>
                                                            <span className="info-box-number">Rs. &nbsp;-232,722</span>
                                                        </div>
                                                    </div>
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
                    </div>
                </div>
            </div>

        </div>

    </>
  )
}

export default Salereport