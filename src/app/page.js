'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseCookies } from "nookies";
import Menu from './Header/page'

export default function Home() {
  const router = useRouter();
  // const token = parseCookies()["token"];
  const [isTokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    const token = parseCookies()["token"];
    if (token !== undefined) {
      setTokenValid(true);
    } else {
      router.push("/Login");
    }
  }, []);
  return (
    <>
      {isTokenValid ?
        (
          <div>
            <Menu />
            <div className="w-full  flex flex-row mt-[64px]">
              <div className="w-[40%]  p-[10px]">
                <h1 className="font-semibold text-[18px] mt-3 mb-2">Đơn hàng</h1>
                <div className="flex flex-row flex-wrap justify-start gap-[10px]">
                  <Link href={'/Orders'} className="w-[43%] h-[70px] bg-[#008000] flex justify-center items-center text-[#fff] text-[13px] rounded-[10px]">
                    <h3>Lập order</h3>
                  </Link>
                  <Link href={'/Table'} className="w-[43%] h-[70px] bg-[#008000] flex justify-center items-center text-[#fff] text-[13px] rounded-[10px]">
                    <h3>Mở sơ đồ bàn</h3>
                  </Link>
                  <Link href={'/OrderFinished'} className="w-[43%] h-[70px] bg-[#FF0000] flex justify-center items-center text-[#fff] text-[13px] rounded-[10px]">
                    <h3>Các đơn hàng đã đóng</h3>
                  </Link>
                </div>
                <h1 className="font-semibold text-[18px] mt-3 mb-2">Menu bán hàng</h1>
                <div className="flex flex-row flex-wrap justify-start gap-[10px]">
                  <Link href={'/OutStock'} className="w-[43%] h-[70px] bg-[#00f2ff] flex justify-center items-center text-[#fff] text-[13px] rounded-[10px]">
                    <h3>Các món ngưng bán</h3>
                  </Link>
                  <Link href={''} className="w-[43%] h-[70px] bg-[#00f2ff] flex justify-center items-center text-[#fff] text-[13px] rounded-[10px]">
                    <h3>Các món ăn bị giới hạn</h3>
                  </Link>
                </div>
                <h1 className="font-semibold text-[18px] mt-3s mb-2">Menu bán hàng</h1>
                <div className="flex flex-row flex-wrap justify-start gap-[10px]">
                  <Link href={''} className="w-[43%] h-[70px] bg-[#0000FF] flex justify-center items-center text-[#fff] text-[13px] rounded-[10px]">
                    <h3>Lập order</h3>
                  </Link>
                </div>
              </div>
              <div className="w-[60%]  p-[10px]">
                <h1 className="font-semibold text-[18px] mt-3 mb-2">Đơn hàng</h1>
                <div className="flex flex-row flex-wrap justify-start gap-[10px]">
                  <Link href={'/Shift'} className="w-[31%] h-[70px] bg-[#CA9300] flex justify-center items-center text-[#fff] text-[13px] rounded-[10px]">
                    <h3>Cấu hình ngày làm việc</h3>
                  </Link>
                  <Link href={''} className="w-[31%] h-[70px] bg-[#CA9300] flex justify-center items-center text-[#fff] text-[13px] rounded-[10px]">
                    <h3>Mở sơ đồ bàn</h3>
                  </Link>
                  <Link href={''} className="w-[31%] h-[70px] bg-[#CA9300] flex justify-center items-center text-[#fff] text-[13px] rounded-[10px]">
                    <h3>Các đơn hàng đã đóng</h3>
                  </Link>
                  <Link href={'/MonOut'} className="w-[31%] h-[70px] bg-[#CA9300] flex justify-center items-center text-[#fff] text-[13px] rounded-[10px]">
                    <h3>Rút tiền từ két</h3>
                  </Link>
                  <Link href={'/MonIn'} className="w-[31%] h-[70px] bg-[#CA9300] flex justify-center items-center text-[#fff] text-[13px] rounded-[10px]">
                    <h3>Nộp tiền vào két</h3>
                  </Link>
                </div>
                <h1 className="font-semibold text-[18px] mt-3 mb-2">Đơn hàng</h1>
                <div className="flex flex-row flex-wrap justify-start gap-[10px]">
                  <Link href={''} className="w-[31%] h-[70px] bg-[#CA9300] flex justify-center items-center text-[#fff] text-[13px] rounded-[10px]">
                    <h3>Cấu hình ca làm việc</h3>
                  </Link>
                  <Link href={''} className="w-[31%] h-[70px] bg-[#CA9300] flex justify-center items-center text-[#fff] text-[13px] rounded-[10px]">
                    <h3>Đóng ca làm việc</h3>
                  </Link>
                  <Link href={''} className="w-[31%] h-[70px] bg-[#CA9300] flex justify-center items-center text-[#fff] text-[13px] rounded-[10px]">
                    <h3>Đóng ngày làm việc</h3>
                  </Link>
                  <Link href={''} className="w-[31%] h-[70px] bg-[#CA9300] flex justify-center items-center text-[#fff] text-[13px] rounded-[10px]">
                    <h3>Các đơn hàng đã đóng</h3>
                  </Link>
                  <Link href={''} className="w-[31%] h-[70px] bg-[#CA9300] flex justify-center items-center text-[#fff] text-[13px] rounded-[10px]">
                    <h3>Các đơn hàng đã đóng</h3>
                  </Link>
                  <Link href={''} className="w-[31%] h-[70px] bg-[#CA9300] flex justify-center items-center text-[#fff] text-[13px] rounded-[10px]">
                    <h3>Các đơn hàng đã đóng</h3>
                  </Link>
                  <Link href={''} className="w-[31%] h-[70px] bg-[#CA9300] flex justify-center items-center text-[#fff] text-[13px] rounded-[10px]">
                    <h3>Các đơn hàng đã đóng</h3>
                  </Link>
                  <Link href={''} className="w-[31%] h-[70px] bg-[#CA9300] flex justify-center items-center text-[#fff] text-[13px] rounded-[10px]">
                    <h3>Các đơn hàng đã đóng</h3>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
        :
        (
          <div className="w-full h-screen flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )
      }
    </>
  );
}
