import React, {useState} from 'react'

import {BrowserRouter, Redirect, Route, Switch,Routes,Navigate  } from 'react-router-dom'


//import Logoing from '../Pages/login'
import Dashboard from '../Pages/Dashboard'
import Brands from "../Pages/Brand";
import Customer from "../Pages/Customer";
import Suppliers from "../Pages/Suppliers";
import Products from "../Pages/Products";
import Invoices from "../Pages/Invoices/Invoices";
import Quotations from "../Pages/Invoices/Quotations";
import Damage from "../Pages/Returns/Damage";
import Salereport from "../Pages/Reports/sales";
import Inventoryreport from "../Pages/Reports/inventory";




const Path = () => {

    return (

        <Routes>
            {/*<Route exact path="/">*/}
            {/*    <Redirect to="/Home"/>*/}
            {/*</Route>*/}

            <Route path="/Dashboard" element={<Dashboard/>} />
            <Route path="/" element={<Navigate to="/Dashboard" />}/>
            <Route path="/products/Brand" element={<Brands/>} />
            <Route path="/register/customer" element={<Customer/>} />
            <Route path="/register/suppliers" element={<Suppliers/>} />
            <Route path="/register/products" element={<Products/>} />
            <Route path="/billing/invoices" element={<Invoices/>} />
            <Route path="/billing/quotations" element={<Quotations/>} />
            <Route path="/products/return" element={<Damage/>} />
            <Route path="/sales/sales" element={<Salereport/>} />
            <Route path="/inventory/inventory" element={<Inventoryreport/>} />


        </Routes>


    )
}

export default Path