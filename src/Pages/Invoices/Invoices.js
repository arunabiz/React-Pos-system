import React, {useEffect, useState} from 'react'
// import {Link, Route, useHistory} from 'react-router-dom';
import Sidebar from "../../components/sidebar/Sidebar";
import TopNav from "../../components/topnav/TopNav";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {DataGrid} from "@material-ui/data-grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import InvoiceForm from './InvoiceForm';
import axios from "axios";
import Button from '@mui/material/Button';
import InvoiceShow from "./InvoiceShow";

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

const Invoices = () => {

    const [value, setValue] = React.useState(0);
    const [status,setstatus] = useState(false)
    const[link,setLink] =useState()

    const[invoices, setinvoices] = useState([])

    const [open, setOpen] = useState(false)

    useEffect(() => {
        axios.get('https://posautotest.herokuapp.com/api/invoice/get/').then((response) => {
            setinvoices(response.data.data);
        });
    }, [status]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'customer',
            headerName: 'Vehicle Number',
            width: 200,
        },
        {
            field: 'dateCreated',
            headerName: 'Invoice Date',
            width: 150,
        },
        {
            field: 'pdf',
            headerName: 'Invoice',
            width: 150,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation();
                }

                return <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{marginLeft: 16}}
                    onClick={() => viewhandle(params.row.pdf)}
                >
                    Open
                </Button>;
            },
        },
        {
            field: 'Action',
            headerName: 'action',
            width: 250,
        },
    ];

    const viewhandle = (data)=>{
        setLink(data)
        setOpen(true)
    }
    const closehandle = ()=>{
        setOpen(false)
    }

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
                                        <Tab label={<div className="customertab"><i className='bx bxs-duplicate'></i>Create</div>} {...a11yProps(0)} />
                                        <Tab label={<div className="customertab"><i className="bx bxs-note"></i>Invoices History</div>} {...a11yProps(1)} />
                                    </Tabs>
                                </AppBar>
                            </div>
                            <br/>
                            <br/>


                            <TabPanel value={value} index={0}>
                                {/*<div className="card full-height">*/}
                                    <InvoiceForm
                                        Heading="Invoice"
                                    />
                                {/*</div>*/}
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <InvoiceShow showModal={open} link={link}  closeModal={closehandle}/>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card full-height">
                                            <div style={{ height: 400, width: '100%'}}>
                                                <DataGrid
                                                    theme={useStyles}
                                                    rows={invoices}
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

export default Invoices