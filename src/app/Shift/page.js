'use client'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useRouter } from 'next/navigation';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShift } from '../redux/slices/shiftSlice';
import { fetchStaff, setStaffPosId } from '../redux/slices/staffSlice';
import { format } from 'date-fns';
import { Box } from '@mui/material';
import ConfirmationDialog from '../Component/popUpRegisOrCreate';
import { fetchStaffShift } from '../redux/slices/staffSlice';

export default function Shift() {
    const router = useRouter();
    const dispatch = useDispatch();

    // Dữ liệu từ shiftSlice
    const shift = useSelector(state => state.shift.dataShift);

    // Dữ liệu từ staffSlice
    const staffList = useSelector(state => state.staff.dataStaffList);
    const staffPosId = useSelector(state => state.staff.staffPosId);
    const staffInShift = useSelector(state => state.staff.data);


    const [isChoose, setIsChoose] = useState(false);


    const handleBack = () => {
        router.push('/');
    }

    const handleStaffPosId = (posId) => {
        dispatch(setStaffPosId(posId));
        setIsChoose(true);
    }

    useEffect(() => {
        dispatch(fetchShift());
        dispatch(fetchStaff());
        dispatch(fetchStaffShift('in'));
    }, []);

    return (
        <div className="w-full h-screen flex flex-row bg-[#EFEFEF]">
            <h1 className="w-full p-[10px] text-center bg-[#424bf4] text-[#fff] fixed">Cấu hình ngày làm việc</h1>
            <div className="w-[21%] h-[55%] pt-[44px] bg-[#fff] rounded-[3px] ml-[3px] mr-[3px]">
                <div className='w-full h-[60%] p-[5px] flex flex-row flex-wrap'>
                    <div className="w-[50%] h-[17%] flex flex-row">
                        <div className='w-[24px] h-full flex items-start p-[3px] '>
                            <CalendarTodayIcon sx={{ color: '#095EFF' }} fontSize='small' />
                        </div>
                        <div className='pl-[3px]'>
                            <p className="text-[10px] font-semibold">Ngày làm việc</p>
                            <p className="text-[10px]">{shift.time_start ? format(new Date(shift.time_start), 'dd-MM-yyyy') : 'Invalid date'}</p>
                        </div>
                    </div>
                    <div className="w-[50%] h-[17%] flex flex-row">
                        <div className='w-[24px] h-full flex items-start p-[3px] '>
                            <AccessTimeIcon sx={{ color: '#095EFF' }} fontSize='small' />
                        </div>
                        <div className='pl-[3px]'>
                            <p className="text-[10px] font-semibold">Bắt đầu lúc</p>
                            <p className="text-[10px]">{shift.time_start ? format(new Date(shift.time_start), 'HH:mm') : 'Invalid date'}</p>
                        </div>
                    </div>
                    <div className="w-[50%] h-[17%] flex flex-row">
                        <div className='w-[24px] h-full flex items-start p-[3px] '>
                            <BookmarkBorderIcon sx={{ color: '#095EFF' }} fontSize='small' />
                        </div>
                        <div className='pl-[3px]'>
                            <p className="text-[10px] font-semibold">Mã</p>
                            <p className="text-[10px]">{shift.code}</p>
                        </div>
                    </div>
                    <div className="w-[50%] h-[17%] flex flex-row">
                        <div className='w-[24px] h-full flex items-start p-[3px] '>
                            <QueryStatsIcon sx={{ color: '#2D8046', backgroundColor: '#F7FFF7' }} fontSize='small' />
                        </div>
                        <div className='pl-[3px]'>
                            <p className="text-[10px] font-semibold">Trạng thái</p>
                            <p className="text-[10px]">{shift.status === 0 ? 'Đang mở' : 'Đã đóng'}</p>
                        </div>
                    </div>
                    {shift.staffShifts?.map((item, index) => {
                        return (
                            <div key={index} className={`w-[99%] h-[15%] flex justify-center items-center rounded-[5px] mb-[2px] text-[#fff] text-[10px] ${item.time_finish === null ? 'bg-[#086BFF]' : 'bg-[#086BFF80]'}`}>
                                Ca: [{item.time_start ? format(new Date(item.time_start), 'HH:mm') : '...'} - {item.time_finish ? format(new Date(item.time_finish), 'HH:mm') : '...'}]
                            </div>
                        )
                    })}
                </div>
                <div className='w-full flex flex-col flex-wrap'>
                    {staffInShift?.map((item, index, array) => {
                        return (
                            <div key={index} className='w-[99%] flex flex-row'>
                                <div className='w-[24px] flex justify-center items-center text-[11px]'>
                                    {index + 1}
                                </div>
                                <div className='pl-[3px]'>
                                    <p className="text-[10px] font-semibold">Nhân viên: {item.staff.first_name}</p>
                                    <p className="text-[10px]">MS: {item.staff.code} [{item.time_start ? format(new Date(item.time_start), 'HH:mm') : '...'} - {item.time_finish ? format(new Date(item.time_finish), 'HH:mm') : '...'}]</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
            <div className='w-[79%] h-screen flex flex-col'>
                <div className='w-full h-[95%] flex flex-row flex-wrap bg-[#fff] rounded-[5px] p-[2px] pt-[46px] gap-[1px]'>
                    <div className='w-full h-[200px] flex flex-row flex-wrap bg-[#fff] rounded-[5px] gap-[1px]'>
                        {staffList.map((staff, index) => {
                            return (
                                <Box key={index} sx={{
                                    width: '24.9%',
                                    height: '100px', display: 'flex',
                                    flexDirection: 'column', justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: isChoose && staff.pos_id === staffPosId ? '#086BFF80' : '#086BFF',
                                    border: isChoose && staff.pos_id === staffPosId ? '1px solid #086BFF' : 'none',
                                    borderRadius: '7px',
                                    cursor: 'pointer'
                                }}
                                    onClick={() => handleStaffPosId(staff.pos_id)}
                                >
                                    <p className="text-[15px] text-[#fff] font-semibold">{staff.first_name}</p>
                                    <p className="text-[10px] text-[#fff]">{staff.code}</p>
                                </Box>
                            )
                        })}
                    </div>
                </div>
                <div className='w-full h[5%] flex flex-row justify-end gap-[2px]'>
                    <Button variant="contained" className='w-[120px] h-full' color='error' onClick={() => { handleBack() }}><KeyboardBackspaceIcon /></Button>
                    <Button disabled variant="contained" className='w-[120px] h-full' style={{ color: 'white', backgroundColor: '#086BFF80' }}>Tạo ngày</Button>
                    <Button disabled variant="contained" className='w-[120px] h-full' style={{ color: 'white', backgroundColor: '#086BFF80' }}>Tạo ca</Button>
                    {/* <Button
                        variant="contained"
                        className='w-[120px] h-full'
                        style={{ backgroundColor: isChoose && staffPosId !== '' ? '#1976D2' : '#086BFF80' }}
                    >
                        Đăng ký NV
                    </Button> */}
                    <ConfirmationDialog value={isChoose} type='in' />
                </div>
            </div>
        </div>
    )
}