'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoney } from '../redux/slices/moneySlice';
import { format } from 'date-fns-tz';
import { Box, TextField, Button } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function MonOut() {
    const router = useRouter();
    const currentDate = useRef(new Date().toLocaleDateString());
    const currentTime = useRef(new Date().toLocaleTimeString());
    const money = useSelector((state) => state.money.data);
    const total = money.reduce((acc, item) => acc + parseInt(item.amount), 0);
    const dispatch = useDispatch();
    const handleBack = () => {
        router.push('/');
    }
    useEffect(() => {
        dispatch(fetchMoney('sub'));
    }, [])

    // NumPad
    const handleNumPadClick = (num, event) => {
        setValue(prevValue => prevValue + `${num}`);
        event.preventDefault();
    }
    const [showNumPad, setShowNumPad] = useState(false);
    const styles = {
        open: {
            display: 'flex',
            transform: 'translateY(0)',
            transition: 'transform 0.3s ease-out',
        },
        closed: {
            display: 'none',
            transform: 'translateY(100%)',
            transition: 'transform 0.3s ease-in',
        },
    };
    const [value, setValue] = useState('');
    const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const handleChange = (num) => {
        setValue(prevValue => prevValue + `${num}`)
        console.log(value);
    }
    const handleDelete = (event) => {
        setValue(value.slice(0, -1));
        event.preventDefault();
    }
    const handleClose = () => {
        setShowNumPad(!showNumPad);
    }
    return (
        <div className="w-full h-screen flex flex-row">
            <h1 className="w-full p-[10px] text-center bg-[#424bf4] text-[#fff] fixed">Lịch sử rút tiền từ két</h1>
            <div className="w-[85%] h-screen pt-[44px] flex flex-col justify-start items-center">
                <h1 className='text-[16px] font-bold'>Lịch sử rút tiền</h1>
                <p className='text-[13px]'>Ngày: {currentDate.current}</p>
                <p className='text-[13px]'>Ca: 3 <p className='inline-block font-semibold'>lúc</p> [{currentTime.current}]</p>
                <div className='w-[65%] flex justify-between border-t-[2px] border-black border-dotted mt-[7px]'>
                    <p className='text-[12px] font-semibold'>Thời gian</p>
                    <p className='text-[12px] font-semibold'>Số tiền</p>
                </div>
                {money.map((item, index) => {
                    return (
                        <div key={index} className='w-[64%] flex justify-between border-t-[1px] border-black border-dotted'>
                            <p className='text-[12px]'>
                                {format(new Date(item.createTime), 'dd/MM/yyyy HH:mm', { timeZone: 'Asia/Ho_Chi_Minh' })}
                            </p>
                            <p className='text-[12px]'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.amount)}</p>
                        </div>
                    )
                })}
                <div className='w-[65%] flex justify-between border-t-[2px] border-black border-dotted mt-[7px]'>
                    <p className='text-[12px] font-semibold'>Tổng</p>
                    <p className='text-[12px] font-semibold'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</p>
                </div>
            </div>
            <div className="w-[15%] h-screen flex flex-col items-center justify-between bg-[#DEE7E7] pt-[44px]">
                <div className="w-[98%] h-[70px] bg-[#086BFF] m-[2px] flex flex-row items-center justify-center text-[#fff] rounded-[5px] cursor-pointer select-none" onClick={() => handleClose()}>Rút tiền</div>
                <div className="w-[98%] h-[70px] bg-[#6B737B] m-[2px] flex flex-row items-center justify-center text-[#fff] rounded-[5px] cursor-pointer select-none" onClick={() => { handleBack() }}>Thoát</div>
            </div>
            <Box style={showNumPad ? styles.open : styles.closed} className='bg-[#EFEFEF] w-full h-[40%] absolute bottom-0 left-0 flex flex-col items-center'>
                <Box sx={{ width: '70%', height: '30px', display: 'flex', marginTop: 2 }}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        // label="Loại khách"
                        // onChange={e => setCusType(e.target.value)}
                        // value={cusType}
                        size='small'
                        required
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: '87%', height: '40px', backgroundColor: '#fff', '& input': { fontSize: '16.5px', }, }}
                        InputProps={{ // Thêm dòng này
                            sx: { borderTopRightRadius: 0, borderBottomRightRadius: 0, fontSize: '15px', '&:focus': { borderColor: 'black' } }
                        }}

                        value={value}
                    />
                    <Button variant='contained' sx={{ width: '13%', height: '40px', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, fontSize: '10px' }}>Xác nhận</Button>

                </Box>
                <div className="w-[25%] h-full flex justify-center items-start pt-[20px]">
                    <div className='w-[75%] h-[205px]  flex flex-row items-start justify-center flex-wrap gap-[1px]'>
                        {num.map((item, index) => {
                            return (
                                <Button
                                    key={index}
                                    className='w-[33%] h-[25%]'
                                    variant="contained"
                                    sx={{
                                        color: 'black',
                                        background: '#fff',
                                        fontSize: '22px',
                                        minWidth: '0',
                                        '&:hover': {
                                            background: '#ddd',
                                        }
                                    }}
                                    value={item}
                                    onClick={() => handleChange(item)}
                                    onMouseDown={(event) => event.preventDefault()}
                                >
                                    {item}
                                </Button>
                            )
                        })}
                        <Button className='w-[33%] h-[25%]' variant="contained" sx={{ color: 'black', background: '#fff', fontSize: '22px', minWidth: '0', '&:hover': { background: '#ddd', } }} onClick={(event) => handleNumPadClick('.', event)} value='.'>.</Button>
                        <Button className='w-[33%] h-[25%]' variant="contained" sx={{ color: 'black', fontSize: '22px', minWidth: '0', backgroundColor: '#CECECE', '&:hover': { backgroundColor: 'darkgray', } }}><KeyboardReturnIcon /></Button>
                    </div>
                    <div className='w-[25%] h-[205px] flex flex-col justify-start flex-wrap gap-[1px] ml-[1px]'>
                        <Button className='w-full h-[25%]' variant="contained" sx={{ fontSize: '16px', minWidth: '0' }} color='error' onClick={() => handleClose()} value='.'>Đóng</Button>
                        <Button className='w-full h-[25%]' variant="contained" sx={{ color: 'black', fontSize: '22px', minWidth: '0', backgroundColor: '#CECECE', '&:hover': { backgroundColor: 'darkgray' } }} onClick={(event) => { handleDelete(event) }}><KeyboardBackspaceIcon /></Button>
                        <Button className='w-full h-[25%]' variant="contained" sx={{ color: 'black', fontSize: '22px', minWidth: '0', backgroundColor: '#CECECE', '&:hover': { backgroundColor: 'darkgray', } }} onClick={() => { setValue('') }}>C</Button>
                    </div>
                </div>

            </Box>
        </div>
    );
}