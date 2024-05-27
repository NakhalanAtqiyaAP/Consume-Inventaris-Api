import { createBrowserRouter } from "react-router-dom";
import App from "./App";
//USER
import CreateUser from "./pages/User/Create";
import User from "./pages/User/Index";
import Login from "./pages/User/Login";
import EditUser from "./pages/User/Edit";
import TrashUser from "./pages/User/Restore"
import Profile from "./pages/User/Profile";
import Dashboard from "./pages/Dashboard";
//STUFF
import Stuff from "./pages/Stuff/Index";
import StuffCreate from "./pages/Stuff/Create";
import EditStuff from "./pages/Stuff/Edit";
import TrashStuff from "./pages/Stuff/Restore";
//Lending & Restoration
import Lending from "./pages/Lending/Index";
import CreateLending from "./pages/Lending/Create";
import EditLending from "./pages/Lending/Edit";
import TrashLending from "./pages/Lending/Restore";
import Restoration from "./pages/Lending/Restoration";
import CreateRestoration from "./pages/Lending/RestoCreate";
import EditRestoration from "./pages/Lending/RestoEdit";
import TrashRestoration from "./pages/Lending/RestoRestore";
//Stock
import StockStuff from "./pages/Stock/Index";
import CreateStock from "./pages/Stock/Create";
import EditStock from "./pages/Stock/Edit";
import TrashStock from "./pages/Stock/Restore";
//INBOUND
import Inbound from "./pages/Inbound/Index";
import CreateInbound from "./pages/Inbound/Create";
import EditInbound from "./pages/Inbound/Edit";
import RestoreInbound from "./pages/Inbound/Restore";

export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    //User
    { path: '/user/create', element: <CreateUser /> },
    { path: '/user/edit/:id', element: <EditUser /> },
    { path: '/user/trash', element: <TrashUser /> },
    { path: '/user', element: <User /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile /> },
    { path: '/dashboard', element: <Dashboard /> },
    //Stuff
    { path: '/stuff', element: <Stuff /> },
    { path: '/stuff/create', element: <StuffCreate /> },
    { path: '/stuff/edit/:id', element: <EditStuff /> },
    { path: '/stuff/trash', element: <TrashStuff /> },
    //Lending & Resotration
    { path: '/lending', element: <Lending /> },
    { path: '/lending/create', element: <CreateLending /> },
    { path: '/lending/edit/:id', element: <EditLending /> },
    { path: '/lending/trash', element: <TrashLending /> },
    { path: '/restoration', element: <Restoration /> },
    { path: '/restoration/create', element: <CreateRestoration /> },
    { path: '/restoration/edit/:id', element: <EditRestoration /> },
    { path: '/restoration/trash', element: <TrashRestoration /> },
    //Stock
    { path: '/stock', element: <StockStuff /> },
    { path: '/stock/create', element: <CreateStock /> },
    { path: '/stock/edit/:id', element: <EditStock /> },
    { path: '/stock/trash', element: <TrashStock /> },
    
    //inbound
    {path: '/inbound', element: <Inbound/>},
    {path: '/inbound/create', element: <CreateInbound/>},
    {path: '/inbound/edit/:id', element: <EditInbound/>},
    {path: '/inbound/trash', element: <RestoreInbound/>},

])