'use client';
import React, { useState } from 'react';
import { TextField, Button, Container, Stack, Box, Select, MenuItem, InputLabel } from '@mui/material';
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

            <form onSubmit={handleSubmit} className='flex flex-wrap mt-[64px]'>
                <Stack sx={{ marginBottom: 2, width: 1 / 2, height: '40%' }}>
                    <h2 className=''>Loại khách</h2>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Loại khách"
                        onChange={e => setCusType(e.target.value)}
                        value={cusType}
                        required
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginTop: 4 }}
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Số lượng khách"
                        onChange={e => setcusQuan(e.target.value)}
                        value={cusQuan}
                        required
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginTop: 4 }}
                    />
                </Stack>
                <Stack sx={{ marginBottom: 2, width: 1 / 2, height: '40%' }}>
                    <h2 className=''>Chọn bàn</h2>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Số điện thoại khách hàng"
                        onChange={e => setPhone(e.target.value)}
                        value={phone}

                        required
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginTop: 4 }}
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        onChange={e => setTest(e.target.value)}
                        value={test}

                        required
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginTop: 4 }}
                    />
                    <InputLabel id="demo-simple-select-label" sx={{ marginTop: 4 }}>Chọn giường</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={bedNum}
                        onChange={e => setBedNum(e.target.value)}

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
                <Stack sx={{ marginBottom: 2, width: 1 / 2, height: '40%' }}>
                    <h2 className=''>Trung tâm doanh thu</h2>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Loại Order"
                        onChange={e => setOrderType(e.target.value)}
                        value={orderType}

                        required
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginTop: 4 }}
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Kênh Order"
                        onChange={e => setOrderChannel(e.target.value)}
                        value={orderChannel}

                        required
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginTop: 4 }}
                    />
                </Stack>
                <Stack sx={{ marginBottom: 2, width: 1 / 2, height: '40%' }}>
                    <h2 className=''>Nhân viên đang chọn</h2>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Nhân viên đang chọn"
                        onChange={e => setStaff(e.target.value)}
                        value={staff}

                        required
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginTop: 4 }}
                    />
                </Stack>
                <Button variant="outlined" color="secondary" type="submit">Register</Button>
            </form>
        </React.Fragment>
    )
}

export default RegisterForm;