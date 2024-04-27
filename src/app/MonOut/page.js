'use client'
import { useRouter } from 'next/navigation';


export default function MonOut() {
    const router = useRouter();
    const handleBack = () => {
        router.push('/');
    }
    return (
        <div className="w-full h-screen flex flex-row">
            <h1 className="w-full p-[10px] text-center bg-[#424bf4] text-[#fff] fixed">Lịch sử rút tiền từ két</h1>
            <div className="w-[85%] h-screen pt-[44px]">

            </div>
            <div className="w-[15%] h-screen flex flex-col items-center justify-between bg-[#DEE7E7] pt-[44px]">
                <div className="w-[98%] h-[70px] bg-[#086BFF] m-[2px] flex flex-row items-center justify-center text-[#fff] rounded-[5px]">Rút tiền</div>
                <div className="w-[98%] h-[70px] bg-[#6B737B] m-[2px] flex flex-row items-center justify-center text-[#fff] rounded-[5px]" onClick={() => { handleBack() }}>Thoát</div>
            </div>
        </div>
    );
}