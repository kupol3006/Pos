'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoney } from '../redux/slices/moneySlice';
import { format } from 'date-fns-tz';

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
                <div className="w-[98%] h-[70px] bg-[#086BFF] m-[2px] flex flex-row items-center justify-center text-[#fff] rounded-[5px] cursor-pointer select-none">Rút tiền</div>
                <div className="w-[98%] h-[70px] bg-[#6B737B] m-[2px] flex flex-row items-center justify-center text-[#fff] rounded-[5px] cursor-pointer select-none" onClick={() => { handleBack() }}>Thoát</div>
            </div>
        </div>
    );
}