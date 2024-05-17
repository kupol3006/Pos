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
import { usePathname } from 'next/navigation';
import { resetStateTableSlice, setShow, setFloorName } from '../redux/slices/tableSlice';
import { resetStateProductSlice } from '../redux/slices/productSlice';
import { fetchOrderById, resetStateOrderByIdSlice } from '../redux/slices/orderByIdSlice';


export default function Table() {
    // const [show, setShow] = useState(true);
    const show = useSelector((state) => state.table.show);
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const dataFloor = useSelector((state) => state.table.data);
    const floorDetail = useSelector((state) => state.table.floorDetail);
    // const [floorName, setFloorName] = useState('');
    const floorName = useSelector((state) => state.table.floorName);

    useEffect(() => {
        async function fetchData() {
            const resultTable = await dispatch(fetchTable()).unwrap();
        }
        fetchData();
    }, [pathname]);

    const handleBack = () => {
        dispatch(resetStateTableSlice());
        dispatch(resetStateOrderByIdSlice());
        router.push('/');
    };
    const handleSubmit = () => {

    };

    const handelFloorDetail = (floorDetail, floorName) => {
        dispatch(setFloorDetail(floorDetail));
        dispatch(setFloorName(floorName));
    };

    const handleGetRoomData = async (room) => {
        // dispatch(setRoomData(room));
        await dispatch(fetchOrderById(room));
        dispatch(resetStateProductSlice());
        router.push('/Purchase');
    };

    return (
        <div className='w-full h-screen flex flex-row'>
            <h1 className="w-full p-[5px] text-center bg-[#424bf4] text-[#fff] fixed">Khu vực đang chọn: {floorName}</h1>
            {show ?
                (
                    <div className="w-[80%] h-screen pt-[34px] flex flex-row justify-center items-center">
                        <div className='w-[23%] flex flex-row flex-wrap gap-[5px]'>
                            {floorDetail.map((room, index) => {
                                return (
                                    <Box key={room.id} className='w-[45%] h-[107px] text-[15px] border-[2px] border-lime-600 flex justify-center items-center relative rounded-[5px] cursor-pointer select-none'>
                                        {room.name}
                                        {room.activeOrders.length > 0 ?
                                            (
                                                <Box className='w-full h-full absolute top-0 left-0 bg-[#DE3242]' onClick={() => { handleGetRoomData(room) }}>
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
                (<TableDetail floorDetail={floorDetail} />)}
            <div className='w-[20%] h-screen pt-[34px] bg-[#89878557] flex flex-col justify-between'>
                <div className='w-[100%] h-[100px] flex flex-row text-[#fff] gap-[3px] justify-center pt-[3px]  select-none'>
                    <Button variant="contained" className='w-[48%] h-full flex flex-row items-center justify-center rounded-[9px] cursor-pointer'
                        sx={{ backgroundColor: show ? '#FFCA28' : '#F7CE52', color: '#fff', '&:hover': { backgroundColor: show ? '#FFCA28' : '#F7CE52' } }} onClick={() => dispatch(setShow(true))}
                    >
                        Sơ đồ bàn
                    </Button>
                    <Button
                        variant="contained"
                        className='w-[48%] h-full flex flex-row items-center justify-center rounded-[9px]'
                        sx={{
                            backgroundColor: floorDetail.length === 0 || show ? '#F7CE52' : '#FFCA28',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: floorDetail.length === 0 || show ? '#F7CE52' : '#FFCA28',
                            },
                            cursor: floorDetail.length === 0 ? 'not-allowed' : 'pointer',
                        }}
                        onClick={floorDetail.length === 0 ? null : () => dispatch(setShow(false))}
                    >
                        Chi tiết
                    </Button>
                </div>
                <div className='w-[100%] h-[70%] flex flex-col text-[#fff] justify-center items-center pt-[3px] cursor-pointer select-none gap-[2px]'>
                    {dataFloor?.map((floor, index) => {
                        return (
                            <div key={index} onClick={() => (handelFloorDetail(floor.details, floor.name))} className='w-[98%] h-[100px] bg-[#0380FF] flex flex-row items-center justify-center rounded-[9px]'>{floor.name}</div>
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
