'use client';
import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Stack, Box, MenuItem, InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectForm, updateCusType, updateCusQuan, updatePhone, updateBedNum, updateTest, updateOrderType, updateOrderChannel, updateStaff } from '../redux/slices/orderSlice';
import { useRouter } from "next/navigation";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { fetchOrderType, setOrderTypeDetail, setPosId } from '../redux/slices/orderTypeSlice';
import { fetchStaff } from '../redux/slices/staffSlice';
import { usePathname } from 'next/navigation';
import { parseCookies } from "nookies";

const RegisterForm = () => {
    const data = useSelector((state) => state.orderType.data);
    const staffData = useSelector((state) => state.staff.data);
    const orderTypeDetail = useSelector((state) => state.orderType.orderTypeDetail);
    const pos_id = useSelector((state) => state.orderType.pos_id);
    const phone1 = useSelector((state) => state.order.phone);
    const bedNum1 = useSelector((state) => state.order.bedNum);
    const orderType1 = useSelector((state) => state.order.orderType);
    const orderChannel1 = useSelector((state) => state.order.orderChannel);
    const staff1 = useSelector((state) => state.order.staff);
    const isLoading = useSelector((state) => state.orderType.isLoading);

    const [cusType, setCusType] = useState('AAA')
    const [cusQuan, setcusQuan] = useState('1')
    const [phone, setPhone] = useState(phone1)
    const [bedNum, setBedNum] = useState(bedNum1)
    const [test, setTest] = useState('Khách lẻ')
    const [orderType, setOrderType] = useState(orderType1)
    const [orderChannel, setOrderChannel] = useState(orderChannel1)
    const [staff, setStaff] = useState(staff1)
    const router = useRouter();

    const form = useSelector(selectForm);
    const dispatch = useDispatch();
    const pathname = usePathname();

    // const isClient = typeof window !== 'undefined';

    useEffect(() => {
        dispatch(fetchOrderType());
        dispatch(fetchStaff());
    }, []);

    useEffect(() => {
        const token = parseCookies()["token"];
        if (token === undefined) {
            router.push("/Login");
        }
    }, []);


    const handleBack = () => {
        router.push('/');
    };
    const handleOrderTypeDetail = (orderTypeDetail, posId) => {
        dispatch(setOrderTypeDetail(orderTypeDetail));
        dispatch(setPosId(posId));
        console.log(orderTypeDetail);
        console.log(posId);
    };
    function handleSubmit(event) {
        event.preventDefault();
        // console.log(cusType, cusQuan, phone, bedNum, test, orderType, orderChannel, staff)
        if (cusType !== '' && cusQuan !== '' && phone !== '' && bedNum !== '' && test !== '' && orderType !== '' && orderChannel !== '' && staff !== '') {
            dispatch(updateCusType(cusType));
            dispatch(updateCusQuan(cusQuan));
            dispatch(updatePhone(phone));
            dispatch(updateBedNum(bedNum));
            dispatch(updateTest(test));
            dispatch(updateOrderType(orderType));
            dispatch(updateOrderChannel(orderChannel));
            dispatch(updateStaff(staff));
            router.push('/Purchase');
        } else {
            alert('Vui lòng nhập đầy đủ thông tin');
        }
    }

    const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const handleChange = (num) => {
        setValue(prevValue => prevValue + `${num}`)
        console.log(value);
    }

    const handleDelete = (event) => {
        event.preventDefault();
        if (focusedInput === 'cusQuan') {
            let arr = cusQuan.split('');
            arr.splice(arr.length - 1, 1);
            setcusQuan(arr.join(''));
            // setcusQuan(prevValue => prevValue + `${num}`);
        } else if (focusedInput === 'phone') {
            let arr = phone.split('');
            arr.splice(arr.length - 1, 1);
            setPhone(arr.join(''));
            // setPhone(prevValue => prevValue + `${num}`);
        }
    }
    const [focusedInput, setFocusedInput] = useState(null);

    const handleFocus = (inputName) => {
        setFocusedInput(inputName);
    }

    const handleNumPadClick = (num, event) => {
        event.preventDefault();
        if (focusedInput === 'cusQuan') {
            setcusQuan(prevValue => prevValue + `${num}`);
        } else if (focusedInput === 'phone') {
            setPhone(prevValue => prevValue + `${num}`);
        }
    }
    return (
        <React.Fragment>
            <div className='w-full h-screen flex flex-row'>
                <form onSubmit={(event) => handleSubmit(event)} className='flex flex-wrap w-[79%] h-screen p-[2px] gap-[2px]'>
                    <Stack sx={{ width: '49.8%', height: '50%', border: '1px black solid', borderRadius: '5px' }}>
                        <h2 className='w-full bg-[#2688B2] p-[5px 10px 5px 10px] text-[#fff] text-[15px] text-center'>Loại khách</h2>
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
                            onFocus={() => handleFocus('cusQuan')}
                            onChange={e => setcusQuan(e.target.value)}
                            value={cusQuan}
                            size='small'
                            required
                            InputLabelProps={{ shrink: true }}
                            sx={{ marginTop: 1, margin: '0px 10px 0px 10px', '& input': { fontSize: '10px', }, }}
                        />
                    </Stack>
                    <Stack sx={{ width: '49.8%', height: '50%', border: '1px black solid', borderRadius: '5px' }}>
                        <h2 className='w-full bg-[#2688B2] p-[5px 10px 5px 10px] text-[#fff] text-[15px] text-center'>Chọn bàn</h2>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Số điện thoại khách hàng"
                            onFocus={() => handleFocus('phone')}
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
                        <InputLabel id="demo-simple-select-helper-label" sx={{ margin: '5px 20px 0px 12px', fontSize: '12px' }}>Chọn giường</InputLabel>
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
                    <Stack sx={{ width: '49.8%', height: '50%', border: '1px black solid', borderRadius: '5px' }}>
                        <h2 className='w-full bg-[#2688B2] p-[5px 10px 5px 10px] text-[#fff] text-[15px] text-center'>Trung tâm doanh thu</h2>
                        <InputLabel id="demo-simple-select-label" sx={{ margin: '5px 20px 0px 12px', fontSize: '12px' }}>Loại order</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={orderType}
                            size='small'
                            onChange={e => setOrderType(e.target.value)}
                            sx={{ marginTop: 1, margin: '0px 10px 0px 10px', fontSize: '10px' }}
                        >
                            {data?.map((item, index) => (
                                <MenuItem key={index} value={item.name} onClick={() => (handleOrderTypeDetail(item.details, item.pos_id))}>{item.name}</MenuItem>
                            ))}
                        </Select>
                        <InputLabel id="demo-simple-select-label1" sx={{ margin: '5px 20px 0px 12px', fontSize: '12px' }}>Kênh order</InputLabel>
                        <Select
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select1"
                            value={orderChannel}
                            size='small'
                            onChange={e => setOrderChannel(e.target.value)}
                            sx={{ marginTop: 1, margin: '0px 10px 0px 10px', fontSize: '10px' }}
                        >
                            {orderTypeDetail.map((item, index) => (
                                <MenuItem key={index} value={item.channel_name}>{item.channel_name}</MenuItem>
                            ))}
                        </Select>
                    </Stack>
                    <Stack sx={{ width: '49.8%', height: '50%', border: '1px black solid', borderRadius: '5px' }}>
                        <h2 className='w-full bg-[#2688B2] p-[5px 10px 5px 10px] text-[#fff] text-[15px] text-center'>Nhân viên đang chọn</h2>
                        <InputLabel id="demo-simple-select-label1" sx={{ margin: '5px 20px 0px 12px', fontSize: '12px' }}>Nhân viên đang chọn</InputLabel>
                        <Select
                            labelId="demo-simple-select-label2"
                            id="demo-simple-select2"
                            value={staff}
                            size='small'
                            onChange={e => setStaff(e.target.value)}
                            sx={{ marginTop: 1, margin: '0px 10px 0px 10px', fontSize: '10px' }}
                        >
                            {staffData?.map((item, index) => (
                                <MenuItem key={index} value={item.staff.first_name}>{item.staff.first_name}</MenuItem>
                            ))}
                        </Select>
                    </Stack>
                </form>
                <div className='w-[21%] h-screen p-[2px 1px 2px 1px] flex flex-col text-[14px]'>
                    <div className='w-full h-[14%] mb-[1px] flex justify-center items-center bg-[#0044ff] text-[#fff] font-semibold rounded-[7px]'>
                        Nhập order
                    </div>
                    <div className='w-full h-[14%] mb-[1px] flex justify-center items-center bg-[#0044ff] text-[#fff] font-semibold rounded-[7px]'>
                        Chọn thành viên
                    </div>
                    <div className='w-full h-[14%] mb-[1px] flex text-[#fff] font-semibold rounded-[7px] gap-[1px]'>
                        <div className='w-[50%] h-full mb-[1px] flex justify-center items-center bg-[#0044ff] text-[#fff] font-semibold rounded-[7px]'>
                            Chọn visit
                        </div>
                        <div className='w-[50%] h-full mb-[1px] flex justify-center items-center bg-[#0044ff] text-[#fff] font-semibold rounded-[7px]'>
                            Khác
                        </div>
                    </div>
                    <div className='w-full h-[14%] mb-[1px] flex text-[#fff] font-semibold rounded-[7px] gap-[1px]'>
                        <Button variant="contained" color="error" onClick={() => { handleBack() }} className='w-[50%]'><CloseIcon /></Button>
                        <Button variant="contained" color="success" type="submit" className='w-[50%]' onClick={(event) => { handleSubmit(event) }}><CheckIcon /></Button>
                    </div>
                    <div className="w-full h-[43%] flex flex-col items-center pt-[3px]">
                        {/* <TextField
                            id="outlined-basic" variant="outlined" size='small'
                            sx={{ width: '98%', background: '#fff', borderRadius: '5px' }}
                            inputProps={{ style: { height: '20px' } }}
                            value={value}

                        /> */}
                        <div className='w-full h-full flex flex-row items-center flex-wrap p-[3px] gap-[2px]'>
                            {num.map((item, index) => {
                                return (
                                    <Button
                                        key={index} className='w-[32.7%] h-[25%]' variant="contained"
                                        sx={{ background: '#575851', fontSize: '22px' }}
                                        value={item}
                                        onClick={(event) => handleNumPadClick(item, event)}
                                        onMouseDown={(event) => event.preventDefault()}
                                    >
                                        {item}
                                    </Button>
                                )
                            })}
                            <Button className='w-[32.7%] h-[25%]' variant="contained" sx={{ background: '#575851', fontSize: '22px' }} onClick={(event) => handleNumPadClick('.', event)} value='.'>.</Button>
                            <Button className='w-[32.7%] h-[25%]' variant="contained" sx={{ fontSize: '22px' }} color='error' onClick={(event) => { handleDelete(event) }}>xóa</Button>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment >
    )
}

export default RegisterForm;