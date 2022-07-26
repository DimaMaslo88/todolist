import React, {useEffect, useState} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from '../features/login/Login'
import {Navigate,Route, Routes} from 'react-router-dom'
import {initializeAppTC, loginOutTC} from "../features/TodolistsList/authReducer";
import {CircularProgress} from "@mui/material";
import style from './App.module.css'

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isLoaggedIn=useSelector<AppRootStateType,boolean>( state=>state.auth.isLoggedIn)
    const isInitialized = useSelector<AppRootStateType, boolean>(
        (state) => state.auth.isInitialized)

    const[active,setActive]=useState<boolean>(false)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(initializeAppTC())
    },[])
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

   const logOutHandler=()=>{
        dispatch(loginOutTC())
   }

   const clickMenuHandler=()=>{
        setActive(!active)

   }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu onClick={clickMenuHandler}/>
                    </IconButton>
                    {active  &&   <Typography variant="h6">
                        News
                    </Typography>}

                    {isLoaggedIn &&
                    <Button color="inherit" onClick={logOutHandler}>LogOut</Button>
                }

                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed className={style.container}>
                <Routes>
                    <Route path="/" element={<TodolistsList demo={demo}/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/404" element={<h1>404:Page Not Found 404</h1>}/>
                    <Route path="*" element={<Navigate to="/404"/>}/>

                </Routes>
            </Container>
        </div>
    )
}

export default App
