'use client'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useRouter } from 'next/navigation';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

export default function Shift() {
    const router = useRouter();
    const handleBack = () => {
        router.push('/');
    }

    return (
        <div className="w-full h-screen flex flex-row bg-[#EFEFEF]">
            <h1 className="w-full p-[10px] text-center bg-[#424bf4] text-[#fff] fixed">Cấu hình ngày làm việc</h1>
            <div className="w-[21%] h-[40%] pt-[44px] bg-[#fff] rounded-[3px] ml-[3px] mr-[3px]">
                <div className='w-full h-[60%] p-[5px] flex flex-row flex-wrap'>
                    <div className="w-[50%] h-[33%] flex flex-row">
                        <div className='w-[24px] h-full flex items-center '>
                            <CalendarTodayIcon sx={{ color: '#095EFF' }} fontSize='small' />
                        </div>
                        <div className='pl-[3px]'>
                            <p className="text-[10px] font-semibold">Ngày làm việc</p>
                            <p className="text-[10px]">4/26/2024</p>
                        </div>
                    </div>
                    <div className="w-[50%] h-[33%] flex flex-row">
                        <div className='w-[24px] h-full flex items-center '>
                            <AccessTimeIcon sx={{ color: '#095EFF' }} fontSize='small' />
                        </div>
                        <div className='pl-[3px]'>
                            <p className="text-[10px] font-semibold">Bắt đầu lúc</p>
                            <p className="text-[10px]">10:28</p>
                        </div>
                    </div>
                    <div className="w-[50%] h-[33%] flex flex-row">
                        <div className='w-[24px] h-full flex items-center '>
                            <BookmarkBorderIcon sx={{ color: '#095EFF' }} fontSize='small' />
                        </div>
                        <div className='pl-[3px]'>
                            <p className="text-[10px] font-semibold">Mã</p>
                            <p className="text-[10px]">W1712546939168</p>
                        </div>
                    </div>
                    <div className="w-[50%] h-[33%] flex flex-row">
                        <div className='w-[24px] h-full flex items-center '>
                            <QueryStatsIcon sx={{ color: '#2D8046', backgroundColor: '#F7FFF7' }} fontSize='small' />
                        </div>
                        <div className='pl-[3px]'>
                            <p className="text-[10px] font-semibold">Trạng thái</p>
                            <p className="text-[10px]">Đang mở</p>
                        </div>
                    </div>
                    <div className='w-[99%] flex justify-center items-center rounded-[5px] text-[#fff] text-[10px] bg-[#086BFF]'>Ca: [10:23-...]</div>

                </div>
                <div className='w-full p-[5px] flex flex-col flex-wrap'>
                    <div className='w-[99%] flex flex-row'>
                        <div className='w-[24px] flex justify-center items-center text-[11px]'>
                            1
                        </div>
                        <div className='pl-[3px]'>
                            <p className="text-[10px] font-semibold">Nhân viên: Anh Lân</p>
                            <p className="text-[10px]">MS: 50237815 [10:29 - ...]</p>
                        </div>
                    </div>
                    <div className='w-[99%] flex flex-row'>
                        <div className='w-[24px] flex justify-center items-center text-[11px]'>
                            2
                        </div>
                        <div className='pl-[3px]'>
                            <p className="text-[10px] font-semibold">Nhân viên: Bán hàng 01</p>
                            <p className="text-[10px]">MS: 50237815 [10:29 - ...]</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className='w-[79%] h-screen flex flex-col'>
                <div className='w-full h-[93%] bg-[#fff] rounded-[5px]'>

                </div>
                <div className='w-full h[7%] flex flex-row justify-end gap-[2px]'>
                    <Button variant="contained" className='w-[120px] h-full' color='error' onClick={() => { handleBack() }}><KeyboardBackspaceIcon /></Button>
                    <Button variant="contained" className='w-[120px] h-[50px]'>Tạo ngày</Button>
                    <Button variant="contained" className='w-[120px] h-full'>Tạo ca</Button>
                    <Button variant="contained" className='w-[120px] h-[50px]'>Đăng ký NV</Button>
                </div>
            </div>
        </div>
    )
}