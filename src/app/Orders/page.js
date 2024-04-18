'use client';
import React, { useState } from 'react';
import { TextField, Button, Container, Stack, Box, MenuItem, InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectForm, updateCusType, updateCusQuan, updatePhone, updateBedNum, updateTest, updateOrderType, updateOrderChannel, updateStaff } from '../redux/slices/orderSlice';
import { useRouter } from "next/navigation";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const RegisterForm = () => {
    const [cusType, setCusType] = useState('AAA')
    const [cusQuan, setcusQuan] = useState('')
    const [phone, setPhone] = useState('')
    const [bedNum, setBedNum] = useState('')
    const [test, setTest] = useState('Khách lẻ')
    const [orderType, setOrderType] = useState('AAA')
    const [orderChannel, setOrderChannel] = useState('Dine In')
    const [staff, setStaff] = useState('')

    const form = useSelector(selectForm);
    const dispatch = useDispatch();

    const router = useRouter();
    const handleBack = () => {
        router.push('/');
    };
    function handleSubmit(event) {
        // event.preventDefault();
        console.log(cusType, cusQuan, phone, bedNum, test, orderType, orderChannel, staff)
        dispatch(updateCusType(cusType));
        dispatch(updateCusQuan(cusQuan));
        dispatch(updatePhone(phone));
        dispatch(updateBedNum(bedNum));
        dispatch(updateTest(test));
        dispatch(updateOrderType(orderType));
        dispatch(updateOrderChannel(orderChannel));
        dispatch(updateStaff(staff));
        router.push('/Purchase');
    }

    return (
        <React.Fragment>
            <div className='w-full h-screen flex flex-row'>
                <form onSubmit={handleSubmit} className='flex flex-wrap w-[79%] h-screen'>
                    <Stack sx={{ width: 1 / 2, height: '50%', border: '1px black solid' }}>
                        <h2 className='w-full bg-[#2688B2] p-[5px 10px 5px 10px] text-[#fff] text-[18px] text-center'>Loại khách</h2>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Loại khách"
                            onChange={e => setCusType(e.target.value)}
                            value={cusType}
                            size='small'
                            required
                            InputLabelProps={{ shrink: true }}
                            sx={{ marginTop: 1, margin: '10px 10px 10px 10px', '& input': { fontSize: '10px', }, }}
                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Số lượng khách"
                            onChange={e => setcusQuan(e.target.value)}
                            value={cusQuan}
                            size='small'
                            required
                            InputLabelProps={{ shrink: true }}
                            sx={{ marginTop: 1, margin: '0px 10px 0px 10px', '& input': { fontSize: '10px', }, }}
                        />
                    </Stack>
                    <Stack sx={{ width: 1 / 2, height: '50%', border: '1px black solid' }}>
                        <h2 className='w-full bg-[#2688B2] p-[5px 10px 5px 10px] text-[#fff] text-[18px] text-center'>Chọn bàn</h2>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Số điện thoại khách hàng"
                            onChange={e => setPhone(e.target.value)}
                            value={phone}
                            size='small'
                            required
                            InputLabelProps={{ shrink: true }}
                            sx={{ marginTop: 1, margin: '10px 10px 10px 10px', '& input': { fontSize: '10px', }, }}



                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            onChange={e => setTest(e.target.value)}
                            value={test}
                            size='small'
                            required
                            InputLabelProps={{ shrink: true }}
                            sx={{ marginTop: 1, margin: '0px 10px 0px 10px', '& input': { fontSize: '10px', }, }}
                        />
                        <InputLabel id="demo-simple-select-helper-label" sx={{ margin: '5px 20px 0px 12px', fontSize: '10px' }}>Chọn giường</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            // label="Chọn giường"
                            value={bedNum}
                            size='small'
                            onChange={e => setBedNum(e.target.value)}
                            sx={{ marginTop: 1, margin: '0px 10px 0px 10px', fontSize: '10px' }}
                        >
                            <MenuItem value={'Giường 1'}>Giường 1</MenuItem>
                            <MenuItem value={'Giường 2'}>Giường 2</MenuItem>
                            <MenuItem value={'Giường 3'}>Giường 3</MenuItem>
                            <MenuItem value={'Giường 4'}>Giường 4</MenuItem>
                            <MenuItem value={'Giường 5'}>Giường 5</MenuItem>
                            <MenuItem value={'Giường 6'}>Giường 6</MenuItem>
                            <MenuItem value={'Giường 7'}>Giường 7</MenuItem>
                            <MenuItem value={'Giường 8'}>Giường 8</MenuItem>
                            <MenuItem value={'Giường 9'}>Giường 9</MenuItem>
                            <MenuItem value={'Giường 10'}>Giường 10</MenuItem>
                        </Select>
                    </Stack>
                    <Stack sx={{ width: 1 / 2, height: '50%', border: '1px black solid' }}>
                        <h2 className='w-full bg-[#2688B2] p-[5px 10px 5px 10px] text-[#fff] text-[18px] text-center'>Trung tâm doanh thu</h2>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Loại Order"
                            onChange={e => setOrderType(e.target.value)}
                            value={orderType}
                            size='small'
                            required
                            InputLabelProps={{ shrink: true }}
                            sx={{ marginTop: 4, margin: '10px 10px 10px 10px', '& input': { fontSize: '10px', }, }}
                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Kênh Order"
                            onChange={e => setOrderChannel(e.target.value)}
                            value={orderChannel}
                            size='small'
                            required
                            InputLabelProps={{ shrink: true }}
                            sx={{ marginTop: 4, margin: '0px 10px 0px 10px', '& input': { fontSize: '10px', }, }}
                        />
                    </Stack>
                    <Stack sx={{ width: 1 / 2, height: '50%', border: '1px black solid' }}>
                        <h2 className='w-full bg-[#2688B2] p-[5px 10px 5px 10px] text-[#fff] text-[18px] text-center'>Nhân viên đang chọn</h2>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Nhân viên đang chọn"
                            onChange={e => setStaff(e.target.value)}
                            value={staff}
                            size='small'
                            required
                            InputLabelProps={{ shrink: true }}
                            sx={{ marginTop: 4, margin: '10px 10px 10px 10px', '& input': { fontSize: '10px', }, }}
                        />
                    </Stack>
                </form>
                <div className='w-[21%] h-screen m-[1px] flex flex-col text-[14px]'>
                    <div className='w-full h-[14%] mb-[1px] flex justify-center items-center bg-[#0044ff] text-[#fff] font-semibold rounded-[7px]'>
                        Nhập order
                    </div>
                    <div className='w-full h-[14%] mb-[1px] flex justify-center items-center bg-[#0044ff] text-[#fff] font-semibold rounded-[7px]'>
                        Chọn thành viên
                    </div>
                    <div className='w-full h-[15%] mb-[1px] flex text-[#fff] font-semibold rounded-[7px] gap-[1px]'>
                        <div className='w-[50%] h-full mb-[1px] flex justify-center items-center bg-[#0044ff] text-[#fff] font-semibold rounded-[7px]'>
                            Chọn visit
                        </div>
                        <div className='w-[50%] h-full mb-[1px] flex justify-center items-center bg-[#0044ff] text-[#fff] font-semibold rounded-[7px]'>
                            Khác
                        </div>
                    </div>
                    <div className='w-full h-[15%] mb-[1px] flex text-[#fff] font-semibold rounded-[7px] gap-[1px]'>
                        <Button variant="contained" color="error" onClick={() => { handleBack() }} className='w-[50%]'><CloseIcon /></Button>
                        <Button variant="contained" color="success" type="submit" className='w-[50%]' onClick={() => { handleSubmit() }}><CheckIcon /></Button>
                    </div>
                </div>
            </div>

        </React.Fragment >
        //     <div className='w-full flex justify-end gap-1 mt-[2px]'>
        //     
        // </div>
    )
}

export default RegisterForm;