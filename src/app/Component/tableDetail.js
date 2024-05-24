'use client';
import { use, useState } from 'react';
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
import { format, parseISO } from 'date-fns';
import { useEffect } from 'react';
import { fetchOrderById } from '../redux/slices/orderByIdSlice';
import { resetStateProductSlice } from '../redux/slices/productSlice';

export default function TableDetail({ floorDetail }) {
    // const floorDetail = useSelector((state) => state.table.floorDetail);
    const dispatch = useDispatch();
    const router = useRouter();
    const handleGetRoomData = async (order) => {
        // dispatch(setRoomData(room));
        await dispatch(fetchOrderById(order.bill_id)).unwrap();
        dispatch(resetStateProductSlice());
        router.push('/Purchase');
    };

    return (
        <div className='w-[80%] h-[200px] p-[3px] pt-[34px] flex flex-row flex-wrap gap-[3px]'>
            {floorDetail.map((room, roomIndex) => {
                return room.activeOrders.length > 0 ?
                    room.activeOrders.map((order, orderIndex) => {
                        return (
                            <Box
                                key={`${room.id}${orderIndex}`}
                                className='w-[16.4%] h-[110px] border-[1px] rounded-[5px] cursor-pointer'
                                onClick={() => handleGetRoomData(order)}
                            >
                                <div className='w-full h-[17%] p-[9px] flex flex-row justify-between items-center bg-[#52A26A] text-[12px] text-[#fff] rounded-tl-[5px] rounded-tr-[5px]'>
                                    <p># {order.order.code}</p>
                                    <p><PersonOutlineIcon sx={{ fontSize: 14, marginBottom: '2px' }} />{order.order.count_customer}</p>
                                </div>
                                <div className='w-full h-[66%] text-[11px] p-[2px]'>
                                    <p className='flex flex-row items-center'><NotificationsNoneIcon sx={{ fontSize: 14, marginRight: '7px' }} />AAA</p>
                                    <p><GridViewIcon sx={{ fontSize: 14, marginRight: '7px' }} />{order.order.table.name}</p>
                                    <p><AccessTimeIcon sx={{ fontSize: 14, marginRight: '7px' }} />{format(parseISO(order.order.date_order), 'HH:mm')}</p>
                                    <p><AccountBalanceIcon sx={{ fontSize: 14, marginRight: '7px' }} />{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.order.total)}</p>
                                </div>
                                <div className='w-full h-[17%] bg-[#DBDDE1] rounded-bl-[5px] rounded-br-[5px]'></div>
                            </Box >
                        )
                    })
                    :
                    (<React.Fragment key={roomIndex}></React.Fragment>);
            })}
        </div>
    );
}
