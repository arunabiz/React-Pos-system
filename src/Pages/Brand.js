import React, {useEffect, useState} from 'react'
// import {Link, Route, useHistory} from 'react-router-dom';
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import "../assets/css/Brands.css";
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    typography: {
        fontFamily: 'SF-Pro-Text',
    },
});

const Brands = () => {

    const [Name,setName] = useState()

    const[formError, setformError] = useState()
    const[formSuccess, setformSuccess] = useState()
    const[error, seterror] = useState()

    const[brands, setbrands] = useState([])

    const [status,setstatus] = useState(false)

    const updateName = (e) => {
        setName(e.target.value);
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/brand/get/').then((response) => {
            setbrands(response.data.data);
        });
    }, [status]);

    const submit =async() =>{
        let formField = new FormData()
        formField.append('name',Name)
        console.log(formField)
        await axios({
            method:'post',
            url:'https://posautotest.herokuapp.com/api/brand/register/',
            data:formField
        })
            .then((response)=>{
                console.log(response.data);
                // history.push('/')
            })
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Brand name',
            width: 200,
        },
        {
            field: 'Action',
            headerName: 'action',
            width: 250,
        },
    ];


    return (
        <>
            <Sidebar/>
            <div id="main" className="layout__content">
                <TopNav/>
                <div className="layout__content-main">
                    <div className="row">
                        <div className="col-6">
                            <div className="card full-height">
                                <div>
                                    <h2 className="brandtitle">Brand Details</h2>
                                    <form onSubmit={submit}>
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
                                        <div className="rowbrands">
                                            <label>Name *</label>
                                            <input type="text" autoFocus placeholder="" value={Name} onChange={(e) => updateName(e)}
                                                    required/>
                                        </div>
                                        <div className="rowbrands">
                                            <label>Name</label>
                                            <input type="text" autoFocus placeholder="" value="#"
                                                   required/>
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
                                            <button type="submit" >Create</button>
                                        </div>
                                    </form>
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
                                rows={brands}
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

            </div>

        </>
    )
}

export default Brands
