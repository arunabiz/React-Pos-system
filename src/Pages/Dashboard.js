import React from 'react'
// eslint-disable-next-line no-unused-vars
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import "../assets/css/Dashboard.css";


const Dashboard = () => {

    return (<div>
        <Sidebar />
        <div id="main" className="layout__content">
            <TopNav />
            <h1>Dashboard</h1>
                <div className="featured">
                    <div className="featuredItemsale">
                        <span className="featuredTitle">Sales</span>
                            <div className="featuredContainer">
                                <span className="featuredamount">0</span>
                            </div>
                                <span className="featuredSub">Compared to last month</span>
                    </div>
                    <div className="featuredItemuser">
                        <span className="featuredTitle">Users</span>
                            <div className="featuredContainer">
                                <span className="featuredamount">0</span>
                                </div>
                                <span className="featuredSub">Compared to last month</span>
                    </div>
                    <div className="featuredItemcustomer">
                        <span className="featuredTitle">Customers</span>
                            <div className="featuredContainer">
                                <span className="featuredamount">0</span>
                            </div>
                        <span className="featuredSub">Compared to last month</span>
                    </div>
                </div>
                <div className="featureddown">
                    <div className="featuredItemrevenue">
                        <span className="featureddownTitle">IQD</span>
                            <div className="featureddownContainer">
                                <span className="featureddownamount">0</span>
                            </div>
                                <span className="featureddownSub">Total Revenue</span>
                    </div>
                    <div className="featuredItemcost">
                        <span className="featureddownTitle">IDQ</span>
                            <div className="featureddownContainer">
                                <span className="featureddownamount">0</span>
                                </div>
                                <span className="featureddownSub">Total Cost</span>
                    </div>
                    <div className="featuredItemprofit">
                        <span className="featureddownTitle">IQD</span>
                            <div className="featureddownContainer">
                                <span className="featureddownamount">0</span>
                            </div>
                        <span className="featureddownSub">Total Profit</span>
                    </div>
                </div>
            </div></div>
  )
}

export default Dashboard