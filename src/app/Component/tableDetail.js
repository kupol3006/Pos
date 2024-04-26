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

export default function TableDetail() {
    return (
        <div className='w-[80%] h-screen p-[3px] pt-[34px] flex flex-row gap-[3px]'>
            <Box
                className='w-[25%] h-[180px] border-[1px] rounded-[5px] cursor-pointer'
            >
                <div className='w-full h-[17%] p-[9px] flex flex-row justify-between items-center bg-[#52A26A] text-[12px] text-[#fff] rounded-tl-[5px] rounded-tr-[5px]'>
                    <p># 12APR241712917268879</p>
                    <p><PersonOutlineIcon sx={{ fontSize: 16 }} /> 1</p>
                </div>
                <div className='w-full h-[66%] text-[12px] p-[5px]'>
                    <p><NotificationsNoneIcon sx={{ fontSize: 16, marginTop: '5px', marginBottom: '3px' }} />  AAA</p>
                    <p><GridViewIcon sx={{ fontSize: 16, marginBottom: '3px' }} />  AAA</p>
                    <p><AccessTimeIcon sx={{ fontSize: 16, marginBottom: '3px' }} />  AAA</p>
                    <p><AccountBalanceIcon sx={{ fontSize: 16 }} />  AAA</p>
                </div>
                <div className='w-full h-[17%] bg-[#DBDDE1] rounded-bl-[5px] rounded-br-[5px]'></div>
            </Box >
            <Box
                className='w-[25%] h-[180px] border-[1px] rounded-[5px] cursor-pointer'
            >
                <div className='w-full h-[17%] p-[9px] flex flex-row justify-between items-center bg-[#52A26A] text-[12px] text-[#fff] rounded-tl-[5px] rounded-tr-[5px]'>
                    <p># 12APR241712917268879</p>
                    <p><PersonOutlineIcon sx={{ fontSize: 16 }} /> 1</p>
                </div>
                <div className='w-full h-[66%] text-[12px] p-[5px]'>
                    <p><NotificationsNoneIcon sx={{ fontSize: 16, marginTop: '5px', marginBottom: '3px' }} />  AAA</p>
                    <p><GridViewIcon sx={{ fontSize: 16, marginBottom: '3px' }} />  AAA</p>
                    <p><AccessTimeIcon sx={{ fontSize: 16, marginBottom: '3px' }} />  AAA</p>
                    <p><AccountBalanceIcon sx={{ fontSize: 16 }} />  AAA</p>
                </div>
                <div className='w-full h-[17%] bg-[#DBDDE1] rounded-bl-[5px] rounded-br-[5px]'></div>
            </Box >
            <Box
                className='w-[25%] h-[180px] border-[1px] rounded-[5px] cursor-pointer'
            >
                <div className='w-full h-[17%] p-[9px] flex flex-row justify-between items-center bg-[#52A26A] text-[12px] text-[#fff] rounded-tl-[5px] rounded-tr-[5px]'>
                    <p># 12APR241712917268879</p>
                    <p><PersonOutlineIcon sx={{ fontSize: 16 }} /> 1</p>
                </div>
                <div className='w-full h-[66%] text-[12px] p-[5px]'>
                    <p><NotificationsNoneIcon sx={{ fontSize: 16, marginTop: '5px', marginBottom: '3px' }} />  AAA</p>
                    <p><GridViewIcon sx={{ fontSize: 16, marginBottom: '3px' }} />  AAA</p>
                    <p><AccessTimeIcon sx={{ fontSize: 16, marginBottom: '3px' }} />  AAA</p>
                    <p><AccountBalanceIcon sx={{ fontSize: 16 }} />  AAA</p>
                </div>
                <div className='w-full h-[17%] bg-[#DBDDE1] rounded-bl-[5px] rounded-br-[5px]'></div>
            </Box >
            <Box
                className='w-[25%] h-[180px] border-[1px] rounded-[5px] cursor-pointer'
            >
                <div className='w-full h-[17%] p-[9px] flex flex-row justify-between items-center bg-[#52A26A] text-[12px] text-[#fff] rounded-tl-[5px] rounded-tr-[5px]'>
                    <p># 12APR241712917268879</p>
                    <p><PersonOutlineIcon sx={{ fontSize: 16 }} /> 1</p>
                </div>
                <div className='w-full h-[66%] text-[12px] p-[5px]'>
                    <p><NotificationsNoneIcon sx={{ fontSize: 16, marginTop: '5px', marginBottom: '3px' }} />  AAA</p>
                    <p><GridViewIcon sx={{ fontSize: 16, marginBottom: '3px' }} />  AAA</p>
                    <p><AccessTimeIcon sx={{ fontSize: 16, marginBottom: '3px' }} />  AAA</p>
                    <p><AccountBalanceIcon sx={{ fontSize: 16 }} />  AAA</p>
                </div>
                <div className='w-full h-[17%] bg-[#DBDDE1] rounded-bl-[5px] rounded-br-[5px]'></div>
            </Box >
        </div >
    );
}
