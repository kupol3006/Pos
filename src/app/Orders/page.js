'use client';
import React, { useState } from 'react';
import { TextField, Button, Container, Stack, Box, MenuItem, InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectForm, updateCusType, updateCusQuan, updatePhone, updateBedNum, updateTest, updateOrderType, updateOrderChannel, updateStaff } from '../redux/slices/orderSlice';
import { useRouter } from "next/navigation";


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
        event.preventDefault();
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

            <form onSubmit={handleSubmit} className='flex flex-wrap mt-[74px] w-[80%] m-auto'>
                <Stack sx={{ marginBottom: 0, width: 1 / 2, height: '230px', border: '1px black solid' }}>
                    <h2 className='w-full bg-[#2688B2] p-[10px] text-[#fff] text-[20px]'>Loại khách</h2>
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
                        sx={{ marginTop: 4, margin: '20px 20px 10px 20px' }}
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
                        sx={{ marginTop: 4, margin: '0px 20px 0px 20px' }}
                    />
                </Stack>
                <Stack sx={{ marginBottom: 0, width: 1 / 2, height: '230px', border: '1px black solid' }}>
                    <h2 className='w-full bg-[#2688B2] p-[10px] text-[#fff] text-[20px]'>Chọn bàn</h2>
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
                        sx={{ marginTop: 4, margin: '20px 20px 10px 20px' }}
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
                        sx={{ marginTop: 4, margin: '0px 20px 0px 20px' }}
                    />
                    <InputLabel id="demo-simple-select-helper-label" sx={{ margin: '0px 20px 0px 20px' }}>Chọn giường</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        // label="Chọn giường"
                        value={bedNum}
                        size='small'
                        onChange={e => setBedNum(e.target.value)}
                        sx={{ marginTop: 4, margin: '5px 20px 0px 20px' }}
                    >
                        <MenuItem value={'Giường 1'}><em>Giường 1</em></MenuItem>
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
                <Stack sx={{ marginBottom: 0, width: 1 / 2, height: '230px', border: '1px black solid' }}>
                    <h2 className='w-full bg-[#2688B2] p-[10px] text-[#fff] text-[20px]'>Trung tâm doanh thu</h2>
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
                        sx={{ marginTop: 4, margin: '20px 20px 0px 20px' }}
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
                        sx={{ marginTop: 4, margin: '10px 20px 0px 20px' }}
                    />
                </Stack>
                <Stack sx={{ marginBottom: 0, width: 1 / 2, height: '230px', border: '1px black solid' }}>
                    <h2 className='w-full bg-[#2688B2] p-[10px] text-[#fff] text-[20px]'>Nhân viên đang chọn</h2>
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
                        sx={{ marginTop: 4, margin: '20px 20px 0px 20px' }}
                    />
                </Stack>
                <div className='w-full flex justify-end gap-1'>
                    <Button variant="contained" color="error" onClick={() => { handleBack() }} className='ml-auto'>Quay lại</Button>
                    <Button variant="contained" color="success" type="submit" className='ml-auto'>Tiếp theo</Button>
                </div>
            </form>
        </React.Fragment>
    )
}

export default RegisterForm;