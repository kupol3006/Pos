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
import { fetchStaff, setStaffPosId, fetchStaffShift, checkStaffInshift } from '../redux/slices/staffSlice';
import { format } from 'date-fns';
import { Box } from '@mui/material';
import ConfirmationDialog from '../Component/popUpRegisStaff';
import CreateShift from '../Component/popUpCreateShift';
import CreateWorkDay from '../Component/popUpCreateWorkDay';
import { fetchWorkDayShiftList } from '../redux/slices/shiftSlice';
import { fetchWorkDayInfor } from '../redux/slices/workDaySlice';

export default function Shift() {
    const router = useRouter();
    const dispatch = useDispatch();

    // Dữ liệu từ workDaySlice
    const workDayInfor = useSelector(state => state.workDay.dataWorkdayInfor);

    // Dữ liệu từ shiftSlice
    // const shift = useSelector(state => state.shift.dataShiftDetail);
    const dataWorkDayShiftList = useSelector(state => state.shift.dataWorkDayShiftList);
    const isCreateShift = useSelector(state => state.shift.isCreateShift);

    // Dữ liệu từ staffSlice
    const staffList = useSelector(state => state.staff.dataStaffList);
    const staffPosId = useSelector(state => state.staff.staffPosId);
    const staffInShift = useSelector(state => state.staff.data);
    const staffInShiftReverse = [...staffInShift]?.reverse();
    const commonData = useSelector(state => state.staff.commonData);
    const renderData = useSelector(state => state.staff.render);


    const [isChoose, setIsChoose] = useState(false);


    const handleBack = () => {
        router.push('/');
    }

    const handleStaffPosId = (posId) => {
        dispatch(setStaffPosId(posId));
        setIsChoose(true);
    }

    useEffect(() => {
        async function fetchData() {
            await dispatch(fetchStaff());
            await dispatch(fetchStaffShift('in'));
            await dispatch(fetchWorkDayShiftList());
            await dispatch(fetchWorkDayInfor());
            dispatch(checkStaffInshift());
        }
        fetchData();
        console.log(workDayInfor);
    }, [renderData, isCreateShift]);

    return (
        <div className="w-full flex flex-row bg-[#EFEFEF]">
            <h1 className="w-full p-[10px] text-center bg-[#424bf4] text-[#fff] fixed">Cấu hình ngày làm việc</h1>
            <div className="w-[21%] h-[79%] pt-[44px] bg-[#fff] rounded-[3px] ml-[3px] mr-[3px] pb-[5px]">
                <div className='w-full  p-[5px] flex flex-row justify-center flex-wrap'>
                    <div className="w-[50%] h-[40px]  flex flex-row">
                        <div className='w-[24px] h-full flex items-start p-[3px] '>
                            <CalendarTodayIcon sx={{ color: '#095EFF' }} fontSize='small' />
                        </div>
                        <div className='pl-[3px]'>
                            <p className="text-[10px] font-semibold">Ngày làm việc</p>
                            <p className="text-[10px]">{workDayInfor?.time_start ? format(new Date(workDayInfor?.time_start), 'dd-MM-yyyy') : 'Invalid date'}</p>
                        </div>
                    </div>
                    <div className="w-[50%] h-[40px]  flex flex-row">
                        <div className='w-[24px] h-full flex items-start p-[3px] '>
                            <AccessTimeIcon sx={{ color: '#095EFF' }} fontSize='small' />
                        </div>
                        <div className='pl-[3px]'>
                            <p className="text-[10px] font-semibold">Bắt đầu lúc</p>
                            <p className="text-[10px]">{workDayInfor?.time_start ? format(new Date(workDayInfor?.time_start), 'HH:mm') : 'Invalid date'}</p>
                        </div>
                    </div>
                    <div className="w-[50%] h-[40px]  flex flex-row">
                        <div className='w-[24px] h-full flex items-start p-[3px] '>
                            <BookmarkBorderIcon sx={{ color: '#095EFF' }} fontSize='small' />
                        </div>
                        <div className='pl-[3px]'>
                            <p className="text-[10px] font-semibold">Mã</p>
                            <p className="text-[10px]">{workDayInfor?.code}</p>
                        </div>
                    </div>
                    <div className="w-[50%] h-[40px]  flex flex-row">
                        <div className='w-[24px] h-full flex items-start p-[3px] '>
                            <QueryStatsIcon sx={{ color: '#2D8046', backgroundColor: '#F7FFF7' }} fontSize='small' />
                        </div>
                        <div className='pl-[3px]'>
                            <p className="text-[10px] font-semibold">Trạng thái</p>
                            <p className="text-[10px]">{workDayInfor?.status === 0 ? 'Đang mở' : 'Đã đóng'}</p>
                        </div>
                    </div>
                    {workDayInfor.shifts?.map((item, index) => {
                        return (
                            <div key={index} className={`w-[95%] h-[20px] flex justify-center items-center rounded-[5px] mb-[2px] text-[#fff] text-[10px] ${item.time_finish === null ? 'bg-[#086BFF]' : 'bg-[#086BFF80]'}`}>
                                Ca: [{item.time_start ? format(new Date(item.time_start), 'HH:mm') : '...'} - {item.time_finish ? format(new Date(item.time_finish), 'HH:mm') : '...'}]
                            </div>
                        )
                    })}
                </div>
                <div className='w-full flex flex-col flex-wrap justify-center items-center gap-[2px]'>
                    {staffInShiftReverse?.map((item, index, array) => {
                        return (
                            (item.time_finish === null ?
                                <div key={index} className='w-[90%] flex flex-row'>
                                    <div className='w-[24px] flex justify-center items-center text-[11px]'>
                                        {index + 1}
                                    </div>
                                    <div className='pl-[3px]'>
                                        <p className="text-[10px] font-semibold">Nhân viên: {item.staff.first_name}</p>
                                        <p className="text-[10px]">MS: {item.staff.code} [{item.time_start ? format(new Date(item.time_start), 'HH:mm') : '...'} - {item.time_finish ? format(new Date(item.time_finish), 'HH:mm') : '...'}]</p>
                                    </div>
                                </div>
                                :
                                null
                            )
                        )
                    })}
                </div>

            </div>
            <div className='w-[79%] h-screen flex flex-col'>
                <div className='w-full h-[95%] flex flex-row flex-wrap bg-[#fff] rounded-[5px] p-[2px] pt-[46px] gap-[1px]'>
                    {dataWorkDayShiftList !== undefined && dataWorkDayShiftList !== null && dataWorkDayShiftList.length !== 0 ?
                        <div className='w-full h-[200px] flex flex-row flex-wrap bg-[#fff] rounded-[5px] gap-[1px]'>
                            {staffList.map((staff, index) => {
                                return (
                                    <Box key={index} sx={{
                                        width: '24.9%',
                                        height: '100px',
                                        display: commonData.find(item => item.pos_id === staff.pos_id) ? 'none' : 'flex',
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
                        :
                        null
                    }
                </div>
                <div className='w-full h[5%] flex flex-row justify-end gap-[2px]'>
                    <Button variant="contained" className='w-[120px] h-full' color='error' onClick={() => { handleBack() }}><KeyboardBackspaceIcon /></Button>
                    <CreateWorkDay />
                    <CreateShift />
                    <ConfirmationDialog value={isChoose} type="in" />
                </div>
            </div>
        </div>
    )
}