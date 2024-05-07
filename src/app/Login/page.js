'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginAsync } from '../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const defaultTheme = createTheme();

export default function SignInSide() {
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.login.isLogin);
    const [status, setStatus] = useState('');
    const [token, setToken] = useState(status !== undefined ? status : null);
    const [code, setCode] = useState('');
    const [pin, setPin] = useState('');
    const router = useRouter();
    const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const handleDelete = (event) => {
        event.preventDefault();
        if (focusedInput === 'code') {
            let arr = code.split('');
            arr.splice(arr.length - 1, 1);
            setCode(arr.join(''));
            // setcusQuan(prevValue => prevValue + `${num}`);
        } else if (focusedInput === 'pin') {
            let arr = pin.split('');
            arr.splice(arr.length - 1, 1);
            setPin(arr.join(''));
            // setPhone(prevValue => prevValue + `${num}`);
        }
    }
    const [focusedInput, setFocusedInput] = useState(null);

    const handleFocus = (inputName) => {
        setFocusedInput(inputName);
    }

    const handleNumPadClick = (num, event) => {
        event.preventDefault();
        if (focusedInput === 'code') {
            setCode(prevValue => prevValue + `${num}`);
        } else if (focusedInput === 'pin') {
            setPin(prevValue => prevValue + `${num}`);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (code === '65613728' && pin === '000000') {
            await dispatch(loginAsync({ code, pin }));
            setStatus(parseCookies()['token']);
            router.push('/');
        } else {
            alert('Sai code hoặc pin');
        }
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ width: '100%', height: '100vh' }} >
                {/* <Box item xs={12} sm={8} md={5} component={Paper} elevation={6} square className='m-auto flex'> */}
                <Box item='value' xs={12} sm={8} md={5} component={Paper} elevation={6} square className='m-auto flex'>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        className='flex'
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Đăng nhập
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }} >
                            <Box className=''>
                                <Box className='h-[50px] flex'>
                                    <h6 className='w-[80px] h-[34px] border border-[#DAE4E4] flex items-center rounded-tl-[5px] rounded-bl-[5px] p-[3px] text-[12px] font-bold'>Mã</h6>
                                    <TextField
                                        // margin="normal"
                                        required
                                        // fullWidth
                                        id="code"
                                        // label="Code"
                                        name="code"
                                        autoComplete="code"
                                        size='small'
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        onFocus={() => handleFocus('code')}
                                        InputLabelProps={{ shrink: true }}
                                        autoFocus
                                        InputProps={{ // Thêm dòng này
                                            sx: { borderRadius: 0, fontSize: '12px', width: '250px' }
                                        }}
                                    />
                                </Box>
                                <Box className='h-[50px] flex'>
                                    <h6 className='w-[80px] h-[34px] border border-[#DAE4E4] flex items-center rounded-tl-[5px] rounded-bl-[5px] p-[3px] text-[12px] font-bold'>Mật khẩu</h6>
                                    <TextField
                                        // margin="normal"
                                        required
                                        // fullWidth
                                        size='small'
                                        name="pin"
                                        onFocus={() => handleFocus('pin')}
                                        type="password"
                                        id="pin"
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                        autoComplete="current-password"
                                        InputProps={{ // Thêm dòng này
                                            sx: { borderRadius: 0, fontSize: '12px', width: '250px' }
                                        }}
                                    />
                                </Box>

                            </Box>

                        </Box>

                    </Box>
                    <Box className='p-[50px]'>
                        <div className='w-[260px] h-[300px] flex flex-row items-center justify-center flex-wrap gap-[2px]'>
                            {num.map((item, index) => {
                                return (
                                    <Button
                                        key={index} className='w-[32%] h-[24%]' variant="contained"
                                        sx={{ background: '#575851', fontSize: '22px' }}
                                        value={item}
                                        onClick={(event) => handleNumPadClick(item, event)}
                                        onMouseDown={(event) => event.preventDefault()}
                                    >
                                        {item}
                                    </Button>
                                )
                            })}
                            <Button className='w-[32%] h-[24%]' variant="contained" sx={{ background: '#575851', fontSize: '22px' }} onClick={(event) => handleNumPadClick('.', event)} value='.'>.</Button>
                            <Button className='w-[32%] h-[24%]' variant="contained" sx={{ fontSize: '22px' }} color='error' onClick={(event) => { handleDelete(event) }}>xóa</Button>
                        </div>
                        <Button
                            type="submit"
                            // fullWidth
                            variant="contained"
                            sx={{ width: '255px', height: '60px', marginLeft: '3px', marginTop: '2px' }}
                            // size='small'
                            onClick={handleSubmit}
                        >
                            Đăng nhập
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </ThemeProvider>
    );
}