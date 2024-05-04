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
import { useDispatch, useSelector } from 'react-redux';

export default function TableDetail() {
    const dispatch = useDispatch();
    const room = useSelector((state) => state.table.floorDetail);

    return (
        <div className='w-[80%] h-screen p-[3px] pt-[34px] flex flex-row gap-[3px] flex-wrap'>
            {room.map((room, index) => {
                return room.activeOrders.length > 0 ?
                    room.activeOrders.map((order, index) => {
                        return (
                            <Box
                                key={order.id}
                                className='w-[16.4%] h-[133px] border-[1px] rounded-[5px] cursor-pointer'
                            >
                                <div className='w-full h-[17%] p-[9px] flex flex-row justify-between items-center bg-[#52A26A] text-[12px] text-[#fff] rounded-tl-[5px] rounded-tr-[5px]'>
                                    <p># {order.bill_id}</p>
                                    <p><PersonOutlineIcon sx={{ fontSize: 16 }} />{order.order.count_customer}</p>
                                </div>
                                <div className='w-full h-[66%] text-[12px] p-[2px]'>
                                    <p><NotificationsNoneIcon sx={{ fontSize: 16, marginTop: '5px', marginBottom: '3px' }} />  {order.order.table.name}</p>
                                    <p><GridViewIcon sx={{ fontSize: 16, marginBottom: '3px' }} />  AAA</p>
                                    <p><AccessTimeIcon sx={{ fontSize: 16, marginBottom: '3px' }} />  AAA</p>
                                    <p><AccountBalanceIcon sx={{ fontSize: 16 }} />  {order.order.total}</p>
                                </div>
                                <div className='w-full h-[17%] bg-[#DBDDE1] rounded-bl-[5px] rounded-br-[5px]'></div>
                            </Box >
                        )
                    })
                    :
                    null;
            })}
        </div>
    );
}
