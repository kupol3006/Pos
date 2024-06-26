'use client';
import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Stack, Box, MenuItem, InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateCusType, updateCusQuan, updatePhone, updateFloorNum, updateRoomNumId, updateRoomName, updateTest, updateOrderType, updateOrderChannel, updateStaff, updateStaffName } from '../redux/slices/orderSlice';
import { useRouter } from "next/navigation";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { fetchStaffShift } from '../redux/slices/staffSlice';
import { usePathname } from 'next/navigation';
import { parseCookies } from "nookies";
import { fetchTable, setFloorDetail } from '../redux/slices/tableSlice';
import { fetchTableList } from '../redux/slices/tableListSlice';
import { fetchTableDetail, setPosId } from '../redux/slices/tableDetailSlice';
import { resetStateProductSlice } from '../redux/slices/productSlice';
import { toast, ToastContainer, Bounce, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {

    const staffData = useSelector((state) => state.staff.data);

    const phone1 = useSelector((state) => state.order.phone);
    const floorNum1 = useSelector((state) => state.order.floorNum);
    const roomNum1 = useSelector((state) => state.order.roomNum);
    const orderType1 = useSelector((state) => state.order.orderType);
    const orderChannel1 = useSelector((state) => state.order.orderChannel);
    const staff1 = useSelector((state) => state.order.staff);

    const dataFloor = useSelector((state) => state.table.data);
    const dataFloorDetail = useSelector((state) => state.table.floorDetail);
    const order = useSelector((state) => state.tableDetail.data);

    const items = useSelector((state) => state.product.items);


    const [cusType, setCusType] = useState('AAA')
    const [cusQuan, setcusQuan] = useState('1')
    const [phone, setPhone] = useState(phone1)
    const [floorNum, setfloorNum] = useState(floorNum1)
    const [room, setRoom] = useState(roomNum1)
    const [test, setTest] = useState('Khách lẻ')
    const [orderType, setOrderType] = useState(orderType1)
    const [orderChannel, setOrderChannel] = useState(orderChannel1)
    const [staff, setStaff] = useState(staff1)
    const router = useRouter();

    // const form = useSelector(selectForm);
    const dispatch = useDispatch();
    const pathname = usePathname();

    // const isClient = typeof window !== 'undefined';

    useEffect(() => {
        async function fetchData() {
            const resultTable = await dispatch(fetchTable()).unwrap();
            const resultTableList = await dispatch(fetchTableList()).unwrap();
            const resultStaff = await dispatch(fetchStaffShift('in')).unwrap();
            // dispatch(fetchStaffShift('in'));
            // dispatch(fetchTable());
            // dispatch(fetchTableList());
        }
        fetchData();
    }, []);

    useEffect(() => {
        const token = parseCookies()["token"];
        if (token === undefined) {
            router.push("/Login");
        }
    }, []);


    const handleBack = () => {
        if (items.length > 0) {
            dispatch(resetStateProductSlice());
        }
        router.push('/');
    };
    const handleOrderTypeDetail = (orderTypeDetail) => {
        // dispatch(setPosId(posId));
        // console.log(posId);
    };

    const handleSetPosId = (posId) => {
        dispatch(setPosId(posId));
    }

    const handleUpdateStaffName = (staffName) => {
        dispatch(updateStaffName(staffName));
    }

    function handleSubmit(event) {
        event.preventDefault();
        // console.log(cusType, cusQuan, phone, floorNum, test, orderType, orderChannel, staff)
        if (cusType !== '' && cusQuan !== '' && floorNum !== '' && test !== '' && orderType !== '' && staff !== '') {
            dispatch(updateCusType(cusType));
            dispatch(updateCusQuan(cusQuan));
            dispatch(updatePhone(phone));
            dispatch(updateFloorNum(floorNum));
            dispatch(updateRoomNumId(room));
            dispatch(updateTest(test));
            dispatch(updateOrderType(orderType));
            dispatch(updateOrderChannel(orderChannel));
            dispatch(updateStaff(staff));
            router.push('/Purchase');
        } else {
            toast.error('Vui lòng nhập đầy đủ thông tin', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Flip,
            });
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

    const handelFloorDetail = (floorDetail) => {
        dispatch(setFloorDetail(floorDetail));
    };

    const handleRoomDetail = (roomDetail) => {
        dispatch(fetchTableDetail(roomDetail))
        dispatch(updateRoomName(roomDetail.name));
    };

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
                            // required
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
                        <InputLabel id="demo-simple-select-helper-label" sx={{ margin: '5px 20px 0px 12px', fontSize: '12px' }}>Chọn Tầng hoặc phương thức đặt hàng</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            // label="Chọn giường"
                            value={floorNum || ''}
                            size='small'
                            onChange={e => setfloorNum(e.target.value)}
                            sx={{ marginTop: 1, margin: '0px 10px 0px 10px', fontSize: '10px' }}
                        >
                            {dataFloor?.map((floor, index) => {
                                return (
                                    <MenuItem key={floor.id} value={floor.id} onClick={() => (handelFloorDetail(floor.details))}>{floor.name}</MenuItem>
                                )
                            })}

                        </Select>
                        <InputLabel id="demo-simple-select-helper-label1" sx={{ margin: '5px 20px 0px 12px', fontSize: '12px' }}>Chọn Phòng hoặc phương thức giao hàng</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label1"
                            id="demo-simple-select-helper1"
                            // label="Chọn giường"
                            value={room || ''}
                            size='small'
                            onChange={e => setRoom(e.target.value)}
                            sx={{ marginTop: 1, margin: '0px 10px 0px 10px', fontSize: '10px' }}
                        >
                            {dataFloorDetail?.map((room, index) => {
                                return (
                                    <MenuItem disabled={room.status === 'deleted' || (room.multi_order === "0" && room.activeOrders.length > 0)} key={room.id} value={room.id} onClick={() => { handleRoomDetail(room) }}>{room.name}</MenuItem>
                                )
                            })}

                        </Select>
                    </Stack>
                    <Stack sx={{ width: '49.8%', height: '50%', border: '1px black solid', borderRadius: '5px' }}>
                        <h2 className='w-full bg-[#2688B2] p-[5px 10px 5px 10px] text-[#fff] text-[15px] text-center'>Trung tâm doanh thu</h2>
                        <InputLabel id="demo-simple-select-label" sx={{ margin: '5px 20px 0px 12px', fontSize: '12px' }}>Loại order</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={orderType || ''}
                            size='small'
                            onChange={e => setOrderType(e.target.value)}
                            sx={{ marginTop: 1, margin: '0px 10px 0px 10px', fontSize: '10px' }}
                        >
                            {order.details?.orderType?.map((item, index) => (
                                <MenuItem key={index} value={item.pos_id} onClick={() => (handleOrderTypeDetail(item.details))}>{item.name}</MenuItem>
                            ))}
                        </Select>
                        <InputLabel id="demo-simple-select-label1" sx={{ margin: '5px 20px 0px 12px', fontSize: '12px' }}>Kênh order</InputLabel>
                        <Select
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select1"
                            value={orderChannel || ''}
                            size='small'
                            onChange={e => setOrderChannel(e.target.value)}
                            sx={{ marginTop: 1, margin: '0px 10px 0px 10px', fontSize: '10px' }}
                        >

                            <MenuItem key={'uni'} value={order.details?.orderChannel.pos_id} onClick={() => handleSetPosId(order.details?.order_channel_id)}>{order.details?.orderChannel.name}</MenuItem>

                        </Select>
                    </Stack>
                    <Stack sx={{ width: '49.8%', height: '50%', border: '1px black solid', borderRadius: '5px' }}>
                        <h2 className='w-full bg-[#2688B2] p-[5px 10px 5px 10px] text-[#fff] text-[15px] text-center'>Nhân viên đang chọn</h2>
                        <InputLabel id="demo-simple-select-label1" sx={{ margin: '5px 20px 0px 12px', fontSize: '12px' }}>Nhân viên đang chọn</InputLabel>
                        <Select
                            labelId="demo-simple-select-label2"
                            id="demo-simple-select2"
                            value={staff || ''}
                            size='small'
                            onChange={e => setStaff(e.target.value)}
                            sx={{ marginTop: 1, margin: '0px 10px 0px 10px', fontSize: '10px' }}
                        >
                            {staffData?.map((item, index) => (
                                <MenuItem key={item.staff.code} value={item.staff.code} onClick={() => handleUpdateStaffName(item.staff.first_name)}>{item.staff.first_name}</MenuItem>
                            ))}
                        </Select>
                    </Stack>
                </form>
                <div className='w-[21%] h-screen p-[2px] flex flex-col text-[14px]'>
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
                    <div className="w-full h-[43.2%] flex flex-col items-center justify-end pt-[3px]">
                        <div className='w-full h-full flex flex-row items-center flex-wrap gap-[1px]'>
                            {num.map((item, index) => {
                                return (
                                    <Button
                                        key={index} className='w-[32.9%] h-[25%]' variant="contained"
                                        sx={{ background: '#575851', fontSize: '22px', minWidth: '0' }}
                                        value={item}
                                        onClick={(event) => handleNumPadClick(item, event)}
                                        onMouseDown={(event) => event.preventDefault()}
                                    >
                                        {item}
                                    </Button>
                                )
                            })}
                            <Button className='w-[32.9%] h-[25%]' variant="contained" sx={{ background: '#575851', fontSize: '22px', minWidth: '0' }} onClick={(event) => handleNumPadClick('.', event)} value='.'>.</Button>
                            <Button className='w-[32.9%] h-[25%]' variant="contained" sx={{ fontSize: '22px', minWidth: '0' }} color='error' onClick={(event) => { handleDelete(event) }}>xóa</Button>
                        </div>
                    </div>
                </div>
                {/* <ToastContainer /> */}
            </div>

        </React.Fragment >
    )
}

export default RegisterForm;