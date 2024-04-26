'use client';
import Box from '@mui/system/Box';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import EastIcon from '@mui/icons-material/East';
import Button from '@mui/material/Button';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TableDetail from '../Component/tableDetail';

export default function Table() {
    const [show, setShow] = useState(false);
    const router = useRouter();

    const handleBack = () => {
        router.push('/');
    };
    const handleSubmit = () => {

    };

    return (
        <div className='w-full h-screen flex flex-row'>
            <h1 className="w-full p-[5px] text-center bg-[#424bf4] text-[#fff] fixed">Khu vực đang chọn: Tầng 1</h1>
            {show ?
                (
                    <div className="w-[80%] h-screen pt-[34px] flex flex-row justify-center items-center">
                        <div className='w-[20%] flex flex-row flex-wrap gap-[10px]'>
                            <Box className='w-[80px] h-[80px] border-[2px] border-lime-600 flex justify-center items-center'>
                                Bàn 1
                            </Box>

                        </div>
                    </div>
                )
                :
                (<TableDetail />)}
            <div className='w-[20%] h-screen pt-[34px] bg-[#89878557] flex flex-col justify-between'>
                <div className='w-[100%] h-[100px] flex flex-row text-[#fff] gap-[3px] justify-center pt-[3px] cursor-pointer select-none'>
                    <div className='w-[48%] h-full bg-[#FFCA28] flex flex-row items-center justify-center rounded-[9px]' onClick={() => setShow(true)}>Sơ đồ bàn</div>
                    <div className='w-[48%] h-full bg-[#FFCA28] flex flex-row items-center justify-center rounded-[9px]' onClick={() => setShow(false)}>Chi tiết</div>
                </div>
                <div className='w-[100%] h-[100px] flex flex-row text-[#fff] justify-center pt-[3px] cursor-pointer select-none'>
                    <div className='w-[98%] h-full bg-[#0380FF] flex flex-row items-center justify-center rounded-[9px]'>Sơ đồ bàn</div>
                </div>
                <div className='w-[100%] h-[100px] flex flex-row text-[#fff] gap-[3px] justify-center pt-[3px] cursor-pointer select-none'>
                    <Button variant="contained" color="error" onClick={() => { handleBack() }} className='w-[48%]'><CloseIcon /></Button>
                    <Button variant="contained" color="success" type="submit" className='w-[48%]' onClick={() => { handleSubmit() }}><CheckIcon /></Button>
                </div>
            </div>
        </div>
    )
}
