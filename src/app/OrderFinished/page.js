'use client';
import { useState } from 'react';
import Box from '@mui/system/Box';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import EastIcon from '@mui/icons-material/East';
import Button from '@mui/material/Button';
import React from 'react';
import { useRouter } from 'next/navigation';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import GridViewIcon from '@mui/icons-material/GridView';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export default function OrderFinished() {
    const router = useRouter();
    const handleBack = () => {
        router.push('/');
    };
    return (
        <div className='w-full h-screen flex flex-row'>
            <h1 className="w-full p-[5px] text-center bg-[#424bf4] text-[#fff] fixed">Đơn hàng đã kết thúc</h1>

            <div className='w-[51%] h-screen  flex flex-row gap-[3px] pt-[34px]'>
                <Box
                    className='w-[25%] h-[160px] border-[1px] rounded-[5px] cursor-pointer'
                >
                    <div className='w-full h-[17%] p-[2px] flex flex-row justify-between items-center bg-[#52A26A] text-[9.5px] text-[#fff] rounded-tl-[5px] rounded-tr-[5px]'>
                        <p># 12APR241712917268879</p>
                        <p><PersonOutlineIcon sx={{ fontSize: 16 }} /> 1</p>
                    </div>
                    <div className='w-full h-[66%] text-[9.5px] p-[5px]'>
                        <p><NotificationsNoneIcon sx={{ fontSize: 16, marginTop: '5px', marginBottom: '3px' }} />  AAA</p>
                        <p><GridViewIcon sx={{ fontSize: 16, marginBottom: '3px' }} />  AAA</p>
                        <p><AccessTimeIcon sx={{ fontSize: 16, marginBottom: '3px' }} />  AAA</p>
                        <p><AccountBalanceIcon sx={{ fontSize: 16 }} />  AAA</p>
                    </div>
                    <div className='w-full h-[17%] bg-[#DBDDE1] rounded-bl-[5px] rounded-br-[5px]'></div>
                </Box >
                <Box
                    className='w-[25%] h-[160px] border-[1px] rounded-[5px] cursor-pointer'
                >
                    <div className='w-full h-[17%] p-[2px] flex flex-row justify-between items-center bg-[#52A26A] text-[9.5px] text-[#fff] rounded-tl-[5px] rounded-tr-[5px]'>
                        <p># 12APR241712917268879</p>
                        <p><PersonOutlineIcon sx={{ fontSize: 16 }} /> 1</p>
                    </div>
                    <div className='w-full h-[66%] text-[9.5px] p-[5px]'>
                        <p><NotificationsNoneIcon sx={{ fontSize: 16, marginTop: '5px', marginBottom: '3px' }} />  AAA</p>
                        <p><GridViewIcon sx={{ fontSize: 16, marginBottom: '3px' }} />  AAA</p>
                        <p><AccessTimeIcon sx={{ fontSize: 16, marginBottom: '3px' }} />  AAA</p>
                        <p><AccountBalanceIcon sx={{ fontSize: 16 }} />  AAA</p>
                    </div>
                    <div className='w-full h-[17%] bg-[#DBDDE1] rounded-bl-[5px] rounded-br-[5px]'></div>
                </Box >
                <Box
                    className='w-[25%] h-[160px] border-[1px] rounded-[5px] cursor-pointer'
                >
                    <div className='w-full h-[17%] p-[2px] flex flex-row justify-between items-center bg-[#52A26A] text-[9.5px] text-[#fff] rounded-tl-[5px] rounded-tr-[5px]'>
                        <p># 12APR241712917268879</p>
                        <p><PersonOutlineIcon sx={{ fontSize: 16 }} /> 1</p>
                    </div>
                    <div className='w-full h-[66%] text-[9.5px] p-[5px]'>
                        <p><NotificationsNoneIcon sx={{ fontSize: 16, marginTop: '5px', marginBottom: '3px' }} />  AAA</p>
                        <p><GridViewIcon sx={{ fontSize: 16, marginBottom: '3px' }} />  AAA</p>
                        <p><AccessTimeIcon sx={{ fontSize: 16, marginBottom: '3px' }} />  AAA</p>
                        <p><AccountBalanceIcon sx={{ fontSize: 16 }} />  AAA</p>
                    </div>
                    <div className='w-full h-[17%] bg-[#DBDDE1] rounded-bl-[5px] rounded-br-[5px]'></div>
                </Box >
                <Box
                    className='w-[25%] h-[160px] border-[1px] rounded-[5px] cursor-pointer'
                >
                    <div className='w-full h-[17%] p-[2px] flex flex-row justify-between items-center bg-[#52A26A] text-[9.5px] text-[#fff] rounded-tl-[5px] rounded-tr-[5px]'>
                        <p># 12APR241712917268879</p>
                        <p><PersonOutlineIcon sx={{ fontSize: 16 }} /> 1</p>
                    </div>
                    <div className='w-full h-[66%] text-[9.5px] p-[5px]'>
                        <p><NotificationsNoneIcon sx={{ fontSize: 16, marginTop: '5px', marginBottom: '3px' }} />  AAA</p>
                        <p><GridViewIcon sx={{ fontSize: 16, marginBottom: '3px' }} />  AAA</p>
                        <p><AccessTimeIcon sx={{ fontSize: 16, marginBottom: '3px' }} />  AAA</p>
                        <p><AccountBalanceIcon sx={{ fontSize: 16 }} />  AAA</p>
                    </div>
                    <div className='w-full h-[17%] bg-[#DBDDE1] rounded-bl-[5px] rounded-br-[5px]'></div>
                </Box >
            </div >
            <div className='w-[49%] h-screen flex flex-row pt-[34px]'>
                <div className='w-[67%]  h-full'>

                </div>
                <div className='w-[33%] h-full bg-[#89878557] flex flex-col justify-between'>
                    <div className='w-[100%] h-[100px] flex flex-row text-[#fff] justify-center pt-[3px] cursor-pointer select-none'>
                        <div className='w-[98%] h-full bg-[#FFCA28] flex flex-row items-center justify-center rounded-[9px]'>Hủy đơn</div>
                    </div>
                    <div className='w-[100%] h-[200px] flex flex-col text-[#fff] justify-center pt-[3px] cursor-pointer select-none gap-[2px]'>
                        <div className='w-[98%] h-full bg-[#A33B2C] flex flex-row items-center justify-center rounded-[9px]'>Bỏ chọn</div>
                        <div className='w-[98%] h-full bg-[#505352] flex flex-row items-center justify-center rounded-[9px] ' onClick={() => handleBack()}>Thoát</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
