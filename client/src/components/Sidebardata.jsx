import React from 'react';
import {MdAddCircle,MdImportExport,MdOutlineManageAccounts} from "react-icons/md";
import {BiSearchAlt} from "react-icons/bi";
import{CgProfile} from "react-icons/cg";
import {AiOutlineUserAdd} from "react-icons/ai";
export const Sidebardata = [
    {
        title: 'Search Asset',    
        path :'/viewAsset1'    ,  
        icon : <BiSearchAlt/> ,
        cName:'nav-text'
    },
    {
        title: 'Add Asset',
        path :'/addAsset1',
        icon : <MdAddCircle/>,
        cName:'nav-text'
    },

    
    // {
    //     title: 'Profile',
    //     path :'/profile',
    //     icon : <CgProfile/>,
    //     cName:'nav-text'
    // },
    {
        title: 'Import/Export',
        path :'/import-export',
        icon : <MdImportExport/>,
        cName:'nav-text'
    },
    {
        title: 'Manage Admins',
        path :'/ManageAdmins',
        icon : <AiOutlineUserAdd/>,
        cName:'nav-text'
    },
    {
        title: 'Profile',
        path :'/adminprofile',
        icon : <MdOutlineManageAccounts/>,
        cName:'nav-text'
    }
    
    
]
