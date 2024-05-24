'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoney } from '../redux/slices/moneySlice';
import { format } from 'date-fns-tz';
import { Box, TextField, Button } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { postMoney } from '../redux/slices/moneySlice';
import { toast, ToastContainer, Bounce, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MonIn() {
    const router = useRouter();
    const currentDate = useRef(new Date().toLocaleDateString());
    const currentTime = useRef(new Date().toLocaleTimeString());
    const money = useSelector((state) => state.money.data || []);
    const total = money.reduce((acc, item) => acc + parseInt(item.amount, 10), 0);
    const dataWorkdayInfor = useSelector((state) => state.workDay.dataWorkdayInfor);
    const dataShiftsOfDay = useSelector((state) => state.workDay.dataShiftsOfDay);
    const shiftWorking = dataShiftsOfDay.find(item => item.status === 0);

    const [load, setLoad] = useState(false);


    const dispatch = useDispatch();
    const handleBack = () => {
        router.push('/');
    }
    useEffect(() => {
        async function fetchData() {
            const result = await dispatch(fetchMoney('add')).unwrap();
        }
        fetchData();
        console.log(dataShiftsOfDay);
    }, [load])



    // NumPad
    const handleNumPadClick = (num, event) => {
        setValue(prevValue => prevValue + `${num}`);
        event.preventDefault();
    }
    const [showNumPad, setShowNumPad] = useState(false);
    const styles = {
        open: {
            // display: 'flex',
            transform: 'translateY(0)',
            transition: 'transform 0.3s ease-out',
        },
        closed: {
            // display: 'none',
            transform: 'translateY(100%)',
            transition: 'transform 0.3s ease-in',
        },
    };
    const [value, setValue] = useState('');

    const handleAddMoney = async () => {
        if (typeof parseInt(value) === 'number' && parseInt(value) > 0 && value !== '') {
            const resultPostMoney = await dispatch(postMoney({ type: 'add', amount: parseInt(value) })).unwrap();
            // setValue('');
            setShowNumPad(!showNumPad);
            setLoad(!load);
            const toastMessage = resultPostMoney.data.message;
            const toastFunction = resultPostMoney.data.success ? toast.success : toast.error;
            toastFunction(toastMessage, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Flip,
            });
        } else {
            toast.error('Số tiền không hợp lệ!', {
                position: "bottom-center",
                autoClose: 2000,
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

    const handleChange = (num, event) => {
        event.preventDefault();
        setValue(prevValue => prevValue + `${num}`)
        // console.log(value);
    }
    const handleDelete = (event) => {
        event.preventDefault();
        setValue(value.slice(0, -1));
    }
    const handleClose = () => {
        setShowNumPad(!showNumPad);
    }
    return (
        <div className="w-full h-screen flex flex-row relative overflow-hidden">
            <h1 className="w-full p-[10px] text-center bg-[#424bf4] text-[#fff] fixed">Lịch sử nộp tiền vào két</h1>
            <div className="w-[85%] h-screen pt-[44px] flex flex-col justify-start items-center">
                <h1 className='text-[16px] font-bold'>Lịch sử rút tiền</h1>
                <p className='text-[13px]'>Ngày: {format(new Date(dataWorkdayInfor.time_start), 'dd/MM/yyyy', { timeZone: 'Asia/Ho_Chi_Minh' })}</p>
                <p className='text-[13px]'>Ca: {dataShiftsOfDay.length} <span className='inline-block font-semibold'>lúc</span> [{format(new Date(shiftWorking.time_start), 'HH:mm', { timeZone: 'Asia/Ho_Chi_Minh' })}]</p>
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
                <div className="w-[98%] h-[70px] bg-[#086BFF] m-[2px] flex flex-row items-center justify-center text-[#fff] rounded-[5px] cursor-pointer select-none" onClick={() => handleClose()}>Nộp tiền</div>
                <div className="w-[98%] h-[70px] bg-[#6B737B] m-[2px] flex flex-row items-center justify-center text-[#fff] rounded-[5px] cursor-pointer select-none" onClick={() => { handleBack() }}>Thoát</div>
            </div>
            <Box style={showNumPad ? styles.open : styles.closed} className='bg-[#EFEFEF] w-full h-[40%] absolute bottom-0 left-0 flex flex-col items-center'>
                <Box sx={{ width: '70%', height: '10%', display: 'flex', marginTop: 1 }}>
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
                    <Button variant='contained' sx={{ width: '13%', height: '40px', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, fontSize: '10px' }} onClick={() => handleAddMoney()}>Xác nhận</Button>
                    {/* <ConfirmationDialog value={value} /> */}

                </Box>
                <div className="w-[25%] h-[90%] flex justify-center items-start pt-[20px]">
                    <div className='w-[75%] h-[94%]  flex flex-row items-start justify-center flex-wrap gap-[1px]'>
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
                                    onClick={(event) => handleChange(item, event)}
                                    onMouseDown={(event) => event.preventDefault()}
                                >
                                    {item}
                                </Button>
                            )
                        })}
                        <Button className='w-[33%] h-[25%]' variant="contained" sx={{ color: 'black', background: '#fff', fontSize: '22px', minWidth: '0', '&:hover': { background: '#ddd', } }} onClick={(event) => handleNumPadClick('.', event)} value='.'>.</Button>
                        <Button className='w-[33%] h-[25%]' variant="contained" sx={{ color: 'black', fontSize: '22px', minWidth: '0', backgroundColor: '#CECECE', '&:hover': { backgroundColor: 'darkgray', } }} onClick={() => handleAddMoney()}><KeyboardReturnIcon /></Button>
                    </div>
                    <div className='w-[25%] h-[94%] flex flex-col justify-start flex-wrap gap-[1px] ml-[1px]'>
                        <Button className='w-full h-[25%]' variant="contained" sx={{ fontSize: '16px', minWidth: '0' }} color='error' onClick={() => handleClose()} value='.'>Đóng</Button>
                        <Button className='w-full h-[25%]' variant="contained" sx={{ color: 'black', fontSize: '22px', minWidth: '0', backgroundColor: '#CECECE', '&:hover': { backgroundColor: 'darkgray' } }} onClick={(event) => { handleDelete(event) }}><KeyboardBackspaceIcon /></Button>
                        <Button className='w-full h-[25%]' variant="contained" sx={{ color: 'black', fontSize: '22px', minWidth: '0', backgroundColor: '#CECECE', '&:hover': { backgroundColor: 'darkgray', } }} onClick={() => { setValue('') }}>C</Button>
                    </div>
                </div>

            </Box>
            <ToastContainer
                toastStyle={{
                    minHeight: '20px',
                    padding: '8px',
                    fontSize: '12px',
                }}
                bodyStyle={{
                    margin: 0,
                    padding: 0,
                }}
            />
        </div>
    );
}