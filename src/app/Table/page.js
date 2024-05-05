'use client';
import Box from '@mui/system/Box';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import EastIcon from '@mui/icons-material/East';
import Button from '@mui/material/Button';
import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import TableDetail from '../Component/tableDetail';
import { fetchTable, setFloorDetail } from '../redux/slices/tableSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Table() {
    const [show, setShow] = useState(true);
    const router = useRouter();
    const dispatch = useDispatch();
    const dataFloor = useSelector((state) => state.table.data);
    const room = useSelector((state) => state.table.floorDetail);

    useEffect(() => {
        dispatch(fetchTable());
    }, []);

    const handleBack = () => {
        router.push('/');
    };
    const handleSubmit = () => {

    };

    const handelFloorDetail = (floorDetail) => {
        dispatch(setFloorDetail(floorDetail));
    };

    return (
        <div className='w-full h-screen flex flex-row'>
            <h1 className="w-full p-[5px] text-center bg-[#424bf4] text-[#fff] fixed">Khu vực đang chọn: Tầng 1</h1>
            {show ?
                (
                    <div className="w-[80%] h-screen pt-[34px] flex flex-row justify-center items-center">
                        <div className='w-[23%] flex flex-row flex-wrap gap-[10px]'>
                            {room.map((room, index) => {
                                return (
                                    <Box key={room.id} className='w-[100px] h-[105px] text-[15px] border-[2px] border-lime-600 flex justify-center items-center relative rounded-[5px]'>
                                        {room.name}
                                        {room.activeOrders.length > 0 ?
                                            (
                                                <Box className='w-full h-full absolute top-0 left-0 bg-[#DE3242]'>
                                                    <Box className='w-full h-[30%] text-[#fff] text-[10px] text-center border-b-2 pt-[7px]'>Phòng - {room.name}</Box>
                                                    <Box className='w-full h-[40%] flex justify-center items-center text-[#fff] text-[12px] border-b-2'>{room.activeOrders.length}/Hóa đơn</Box>
                                                    <Box className='w-full h-[30%] text-[#fff] text-[10px] text-center pt-[7px]'>
                                                        {room.status === 'active' && 'Đang hoạt động'}
                                                        {room.status === 'deleted' && 'Đã xóa'}
                                                        {room.status === 'blocked' && 'Đã chặn'}
                                                    </Box>
                                                </Box>
                                            ) : (<></>)}
                                    </Box>
                                )
                            })}


                        </div>
                    </div>
                )
                :
                (<TableDetail />)}
            <div className='w-[20%] h-screen pt-[34px] bg-[#89878557] flex flex-col justify-between'>
                <div className='w-[100%] h-[100px] flex flex-row text-[#fff] gap-[3px] justify-center pt-[3px] cursor-pointer select-none'>
                    <Button variant="contained" className='w-[48%] h-full flex flex-row items-center justify-center rounded-[9px]' sx={{ backgroundColor: '#FFCA28', color: '#fff', '&:hover': { backgroundColor: '#FFCA28' } }} onClick={() => setShow(true)}>Sơ đồ bàn</Button>
                    <Button disabled={room.length === 0} variant="contained" className='w-[48%] h-full flex flex-row items-center justify-center rounded-[9px]'
                        sx={{
                            backgroundColor: room.length === 0 ? '#FFCA20' : '#FFCA28',
                            "&.Mui-disabled": {
                                background: "#FFCA20",
                                color: "#fff"
                            },
                            '&:hover': {
                                backgroundColor: room.length === 0 ? '#ffd95b' : '#FFCA28', // màu nhạt khi disabled và hover
                            },
                        }} onClick={() => setShow(false)}>Chi tiết</Button>
                </div>
                <div className='w-[100%] h-[70%] flex flex-col text-[#fff] justify-center items-center pt-[3px] cursor-pointer select-none gap-[2px]'>
                    {dataFloor.map((floor, index) => {
                        return (
                            <div key={index} onClick={() => (handelFloorDetail(floor.details))} className='w-[98%] h-[100px] bg-[#0380FF] flex flex-row items-center justify-center rounded-[9px]'>{floor.name}</div>
                        )
                    })}
                </div>
                <div className='w-[100%] h-[100px] flex flex-row text-[#fff] gap-[3px] justify-center pt-[3px] cursor-pointer select-none'>
                    <Button variant="contained" color="error" onClick={() => { handleBack() }} className='w-[48%]'><CloseIcon /></Button>
                    <Button variant="contained" color="success" type="submit" className='w-[48%]' onClick={() => { handleSubmit() }}><CheckIcon /></Button>
                </div>
            </div>
        </div>
    )
}
