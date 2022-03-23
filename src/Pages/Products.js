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
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

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

const Products = () => {

    const [value, setValue] = React.useState(0);
    const [Supplier,setSupplier] = useState()
    const [status,setstatus] = useState(false)

    const [input, setInput] = useState([
        {
            productName: "",
            brand: "",
            producttype: "",
            quantity:"",
            purchPrice:"",
            sellingPrice:""
        }
    ]);

    const[formError, setformError] = useState()
    const[formSuccess, setformSuccess] = useState()
    const[error, seterror] = useState()

    const[brands, setbrands] = useState([])
    const[suppliers, setsuppliers] = useState([])
    const[products, setproducts] = useState([])



    const updateSupplier = (e) => {
        setSupplier(e.target.value);
    }


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/brand/get/').then((response) => {
            setbrands(response.data.data);
        });
        axios.get('http://127.0.0.1:8000/api/supplier/get/').then((response) => {
            setsuppliers(response.data.data);
        });
        axios.get('http://127.0.0.1:8000/api/product/get/').then((response) => {
            setproducts(response.data.data);
            console.log(response.data.data);
        });
    }, [status]);
    // brand: 1
    // id: 1
    // productName: "Headlight"
    // producttype: "Part"
    // profitMargin: 0.65
    // purchPrice: "650.00"
    // quantity: 49
    // sellingPrice: "715.00"
    // supplier: 1
    // totalCost: 31850
    // totalProft: 3185
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'productName',
            headerName: 'Product Name',
            width: 200,
        },
        {
            field: 'brand',
            headerName: 'Brand',
            width: 150,
        },
        {
            field: 'producttype',
            headerName: 'Product Type',
            width: 150,
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            width: 150,
        },
        {
            field: 'purchPrice',
            headerName: 'Purchase Price',
            width: 150,
        },
        {
            field: 'sellingPrice',
            headerName: 'Selling Price',
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


    const onChangePrice = (e, index) => {
        const { name, value } = e.target;
        const price =parseInt(value);
        const percent =(value / 100) * 10;
        const saleprice = price + percent;
        const list = [...input];
        list[index][name] = value;
        setInput(list);
        list[index].sellingPrice = saleprice;
        setInput(list);
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...input];
        list[index][name] = value;
        setInput(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...input];
        list.splice(index, 1);
        setInput(list);
    };

    // handle click event of the Add button
    const addInput = () => {
        setInput([...input, {
            productName: "",
            brand: "",
            producttype: "",
            quantity:"",
            purchPrice:"",
            sellingPrice:""
        }]);
    };

    const submit =(e) =>{
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/api/product/register/', {
            supplier: Supplier,
            input
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
                                        <Tab label={<div className="customertab"><i className='bx bxs-food-menu'></i>Add Products</div>} {...a11yProps(0)} />
                                        <Tab label={<div className="customertab"><i className="bx bxs-note"></i>Products Details</div>} {...a11yProps(1)} />
                                    </Tabs>
                                </AppBar>
                            </div>
                            <br/>
                            <br/>


                            <TabPanel value={value} index={0}>
                                <div className="card full-height">
                                    <div>
                                        <h2 className="customertitle">Products Details</h2>
                                        <form onSubmit={submit}>
                                            <div className="row">
                                                {formSuccess ? (
                                                    <Alert severity="success">
                                                        <AlertTitle>Success</AlertTitle>
                                                        Product registration was <strong>successful!</strong>
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
                                                        <label>Supplier Name *</label>
                                                        <select id="supplier" name="supplier" value={Supplier} onChange={(e) => updateSupplier(e)} required>
                                                            <option value='' selected>Please Select Supplier</option>
                                                            {suppliers.map((items) => (
                                                                <option value={items.id} >{items.supplierName}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            {input.map((item, i) => {
                                                return (
                                                    <>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="rowcustomer">
                                                                <label>Product Name *</label>
                                                                <input type="text" name="productName" autoFocus placeholder="" value={item.productName} onChange={(e) => handleChange(e, i)}
                                                                       required/>
                                                            </div>
                                                            <div className="rowcustomer">
                                                                <label>Brand *</label>
                                                                <select id="brand" name="brand" value={item.brand} onChange={(e) => handleChange(e, i)} required>
                                                                    <option value='' selected>Please Select brand</option>
                                                                    {brands.map((items) => (
                                                                        <option value={items.id} >{items.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="rowcustomer">
                                                                <label>Product Type *</label>
                                                                <select id="producttype" name="producttype" value={item.producttype} onChange={(e) => handleChange(e, i)} required>
                                                                    <option value='' selected>Please Select Product type</option>
                                                                    <option value='Part' >Spare Part</option>
                                                                    <option value='Service' >Service</option>
                                                                </select>
                                                            </div>
                                                            <div className="rowcustomer">
                                                                <label>Quantity *</label>
                                                                <input type="number" name="quantity" autoFocus placeholder="" value={item.quantity} onChange={(e) => handleChange(e, i)}
                                                                       required/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="rowcustomer">
                                                            <label>Purchase Price *</label>
                                                            <input type="text" name="purchPrice" autoFocus placeholder="" value={item.purchPrice} onChange={(e) => onChangePrice(e, i)}
                                                                   required/>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="rowcustomer">
                                                            <label>Selling Price</label>
                                                            <input type="text" name="sellingPrice" autoFocus placeholder="" value={item.sellingPrice} onChange={(e) => handleChange(e, i)}
                                                                   required/>
                                                        </div>
                                                    </div>
                                                </div>

                                                        {input.length !== 1 && <button  onClick={() => handleRemoveClick(i)} className="fieldremovebutton">Remove</button>}
                                                        {input.length - 1 === i && <button onClick={addInput} className="fieldaddbutton">Add</button>}
                                                    </>
                                                );
                                            })}
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
                                                    rows={products}
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

export default Products