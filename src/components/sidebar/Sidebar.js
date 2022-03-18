import React, {useState, useContext} from 'react'

import {Link} from 'react-router-dom'
// import UserContext from '../../userContext'
import './sidebar.css'
import logo from '../../assets/logo.png';
 
const sidebar_items3 = [
    {
        "display_name": "Users",
        "route": "/InnovigentUser",
        "icon": "bx bx-user"
    },
    {
        "display_name": "Devices",
        "route": "/Device",
        "icon": "bx bx-devices"
    }
]

const sidebar_items2 = [
    {
        "display_name": "Dashboard",
        "route": "/Dashboard",
        "icon": "bx bx-category-alt"
    }
]

const sidebar_items1 = [
    {
        "display_name": "Dashboard",
        "route": "/Dashboard",
        "icon": "bx bx-category-alt"
    },
    {
        "display_name": "Production Orders",
        "route": "/ProductCard",
        "icon": "bx bx-info-square"
    },
    {
        "display_name": "Product Sort",
        "route": "/ProductionSort",
        "icon": "bx bx-sort-up"
    },
    {
        "display_name": "Product Calendar",
        "route": "/ProductCalendar",
        "icon": "bx bx-calendar-event"
    },
    {
        "display_name": "Preventive Maintenance",
        "route": "/PreventiveMaintenance",
        "icon": "bx bx-cog"
    },
]

const sidebar_items = [
    {
        "display_name": "Dashboard",
        "route": "/Dashboard",
        "icon": "bx bx-tachometer"
    },
    // {
    //     "display_name": "Category",
    //     "route": "/Admin",
    //     "icon": "bx bx-category-alt"
    // },
    {
        "display_name": "Brands",
        "route": "/products/Brand",
        "icon": "bx bx-notepad"
    },
    {
        "display_name": "Customer",
        "route": "/register/customer",
        "icon": "bx bx-user-plus"
    },
    {
        "display_name": "Suppliers",
        "route": "/register/suppliers",
        "icon": "bx bxs-user"
    },
    {
        "display_name": "Products",
        "route": "/register/products",
        "icon": "bx bx-food-menu"
    },
    {
        "display_name": "Invoices",
        "route": "/billing/invoices",
        "icon": "bx bx-note"
    },
    {
        "display_name": "Return & Damage Items",
        "route": "/products/return",
        "icon": "bx bx-no-entry"
    },
    {
        "display_name": "Quotations",
        "route": "/billing/quotations",
        "icon": "bx bx-notepad"
    },
    {
        "display_name": "Sale Report",
        "route": "/sales/sales",
        "icon": "bx bx-book"
    },
    {
        "display_name": "Inventory Report",
        "route": "/inventory/inventory",
        "icon": "bx bx-book"
    },

]


const SidebarItem = props => {

    const active = props.active ? 'active' : ''

    return (
        <div className="sidebar__item">
            <div className={`sidebar__item-inner ${active}`}>
                <i className={props.icon}></i>
                <span>
                    {props.title}
                </span>
            </div>
        </div>
    )
}

const Sidebar = props => {
    // const {userData} = useContext(UserContext);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const activeItem = sidebar_items.findIndex(item => item.route === window.location.pathname)
    // const activeItem1 = sidebar_items1.findIndex(item => item.route === window.location.pathname)
    // const activeItem2 = sidebar_items2.findIndex(item => item.route === window.location.pathname)
    // const activeItem3 = sidebar_items3.findIndex(item => item.route === window.location.pathname)

    // function closeNav() {
    //     setIsCollapsed(true)
    //     document.getElementById("mySidebar").style.width = "80px";
    //     document.getElementById("main").style.paddingLeft = "80px";
    // }
    //
    // function openNav() {
    //     setIsCollapsed(false)
    //     document.getElementById("mySidebar").style.width = "300px";
    //     // document.getElementById("main").style.paddingLeft = "300px";
    //     {
    //         window.matchMedia("(max-width: 800px)").matches ?
    //             (document.getElementById("main").style.paddingLeft = "80px") :
    //             document.getElementById("main").style.paddingLeft = "300px";
    //     }
    // }


    return (
        <>

                <div id="mySidebar" className='sidebar'>
                    {/*{isCollapsed === true ? <div className="sidebar__itemmenu">*/}
                    {/*        <button className="sidebar__item-inner" onClick={openNav}><i className='bx bx-menu'></i>*/}
                    {/*        </button>*/}
                    {/*    </div> :*/}
                    {/*    <div className="sidebar__itemmenu">*/}
                    {/*        <button className="sidebar__item-inner" onClick={closeNav}><i className='bx bx-menu'></i>*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*}*/}

                    <div className="sidebar__logo">
                        <img src={logo} alt="company logo"/>
                    </div>

                    {
                        sidebar_items.map((item, index) => (

                            <Link to={item.route} key={index}>
                                {isCollapsed === true ?
                                    <SidebarItem
                                        icon={item.icon}
                                        active={index === activeItem}
                                    /> :
                                    <SidebarItem
                                        title={item.display_name}
                                        icon={item.icon}
                                        active={index === activeItem}
                                    />
                                }

                            </Link>
                        ))
                    }
                </div>

            {/*{userData.role === 70 ? (*/}
            {/*    <div id="mySidebar" className='sidebar'>*/}
            {/*        {isCollapsed === true ? <div className="sidebar__itemmenu">*/}
            {/*                <button className="sidebar__item-inner" onClick={openNav}><i className='bx bx-menu'></i>*/}
            {/*                </button>*/}
            {/*            </div> :*/}
            {/*            <div className="sidebar__itemmenu">*/}
            {/*                <button className="sidebar__item-inner" onClick={closeNav}><i className='bx bx-menu'></i>*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*        }*/}

            {/*        <div className="sidebar__logo">*/}
            {/*            <img src={logo} alt="company logo"/>*/}
            {/*        </div>*/}

            {/*        {*/}
            {/*            sidebar_items1.map((item, index) => (*/}
            {/*                <Link to={item.route} key={index}>*/}
            {/*                    {isCollapsed === true ?*/}
            {/*                        <SidebarItem*/}
            {/*                            icon={item.icon}*/}
            {/*                            active={index === activeItem1}*/}
            {/*                        /> :*/}
            {/*                        <SidebarItem*/}
            {/*                            title={item.display_name}*/}
            {/*                            icon={item.icon}*/}
            {/*                            active={index === activeItem1}*/}
            {/*                        />*/}
            {/*                    }*/}
            {/*                </Link>*/}
            {/*            ))*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*) : null}*/}
            {/*{userData.role === 71 || userData.role === 72 || userData.role === 30 ? (*/}
            {/*    <div id="mySidebar" className='sidebar'>*/}
            {/*        {isCollapsed === true ? <div className="sidebar__itemmenu">*/}
            {/*                <button className="sidebar__item-inner" onClick={openNav}><i className='bx bx-menu'></i>*/}
            {/*                </button>*/}
            {/*            </div> :*/}
            {/*            <div className="sidebar__itemmenu">*/}
            {/*                <button className="sidebar__item-inner" onClick={closeNav}><i className='bx bx-menu'></i>*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*        }*/}

            {/*        <div className="sidebar__logo">*/}
            {/*            <img src={logo} alt="company logo"/>*/}
            {/*        </div>*/}

            {/*        {*/}
            {/*            sidebar_items2.map((item, index) => (*/}
            {/*                <Link to={item.route} key={index}>*/}
            {/*                    {isCollapsed === true ?*/}
            {/*                        <SidebarItem*/}
            {/*                            icon={item.icon}*/}
            {/*                            active={index === activeItem2}*/}
            {/*                        /> :*/}
            {/*                        <SidebarItem*/}
            {/*                            title={item.display_name}*/}
            {/*                            icon={item.icon}*/}
            {/*                            active={index === activeItem2}*/}
            {/*                        />*/}
            {/*                    }*/}
            {/*                </Link>*/}
            {/*            ))*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*) : null}*/}
            {/*{userData.role === 2 ? (*/}
            {/*    <div id="mySidebar" className='sidebar'>*/}
            {/*        {isCollapsed === true ? <div className="sidebar__itemmenu">*/}
            {/*                <button className="sidebar__item-inner" onClick={openNav}><i className='bx bx-menu'></i>*/}
            {/*                </button>*/}
            {/*            </div> :*/}
            {/*            <div className="sidebar__itemmenu">*/}
            {/*                <button className="sidebar__item-inner" onClick={closeNav}><i className='bx bx-menu'></i>*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*        }*/}

            {/*        <div className="sidebar__logo">*/}
            {/*            <img src={logo} alt="company logo"/>*/}
            {/*        </div>*/}

            {/*        {*/}
            {/*            sidebar_items3.map((item, index) => (*/}
            {/*                <Link to={item.route} key={index}>*/}
            {/*                    {isCollapsed === true ?*/}
            {/*                        <SidebarItem*/}
            {/*                            icon={item.icon}*/}
            {/*                            active={index === activeItem3}*/}
            {/*                        /> :*/}
            {/*                        <SidebarItem*/}
            {/*                            title={item.display_name}*/}
            {/*                            icon={item.icon}*/}
            {/*                            active={index === activeItem3}*/}
            {/*                        />*/}
            {/*                    }*/}
            {/*                </Link>*/}
            {/*            ))*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*) : null}*/}
            {/*            sidebar_items3.map((item, index) => (*/}
            {/*                <Link to={item.route} key={index}>*/}
            {/*                    {isCollapsed === true ?*/}
            {/*                        <SidebarItem*/}
            {/*                            icon={item.icon}*/}
            {/*                            active={index === activeItem3}*/}
            {/*                        /> :*/}
            {/*                        <SidebarItem*/}
            {/*                            title={item.display_name}*/}
            {/*                            icon={item.icon}*/}
            {/*                            active={index === activeItem3}*/}
            {/*                        />*/}
            {/*                    }*/}
            {/*                </Link>*/}
            {/*            ))*/}
            {/*        }*/}
        </>
    )
}

export default Sidebar