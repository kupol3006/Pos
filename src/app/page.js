'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseCookies } from "nookies";
import Menu from './Header/page'
import ConfirmationDialog1 from './Component/popUpCloseShift';
import ConfirmationDialog2 from './Component/popUpCloseDay';
import { fetchWorkDayShiftList } from './redux/slices/shiftSlice';
import { toast, ToastContainer, Bounce, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePathname } from "next/navigation";
import { fetchWorkDayInfor } from "./redux/slices/workDaySlice";
import { Button } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  // const token = parseCookies()["token"];
  const [isTokenValid, setTokenValid] = useState(false);
  const dispatch = useDispatch();
  const dataWorkDayShiftList = useSelector(state => state.shift.dataWorkDayShiftList);
  const isCloseShift = useSelector(state => state.shift.isCloseShift);
  // const dataCloseShift = useSelector(state => state.shift.dataCloseShift);
  // const dataOrderUpdate = useSelector(state => state.order.dataOrderUpdate);

  useEffect(() => {
    handleTokenValidation();
    displayToastMessage();
    async function fetchData() {
      const resultShiftList = await dispatch(fetchWorkDayShiftList()).unwrap();
      const resultWorkDayInfor = await dispatch(fetchWorkDayInfor()).unwrap();
    }
    fetchData();
  }, [isCloseShift]);

  function handleTokenValidation() {
    const token = parseCookies()["token"];
    if (token) {
      setTokenValid(true);
    } else {
      router.push("/Login");
    }
  }

  function displayToastMessage() {
    const message = localStorage.getItem('toastMessage');
    const status = localStorage.getItem('status');
    if (message && status) {
      const toastFunction = status === 'true' ? toast.success : toast.error;
      toastFunction(message, {
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
      setTimeout(() => {
        clearToastMessage();
      }, 9);
    }
  }

  function clearToastMessage() {
    localStorage.removeItem('toastMessage');
    localStorage.removeItem('toastOptions');
    localStorage.removeItem('status');
  }

  const handlePush = (path) => {
    router.push(path);
  }

  return (
    <>
      {isTokenValid ?
        (
          <div>
            <Menu />
            {/* <div className="w-full flex flex-row mt-[64px]"> */}
            <div className="w-full grid grid-cols-5 grid-rows-[33.33%_66.66%] gap-2 pt-[64px]">
              <div className="w-[100%] h-full  p-[10px] col-start-1 col-end-3">
                <h1 className="font-semibold text-[18px] mt-3 mb-2">Đơn hàng</h1>
                <div className="grid grid-cols-2 grid-rows-2 gap-2">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: dataWorkDayShiftList?.length > 0 ? '#6BAD8C' : '#008000', color: '#fff', borderRadius: '10px', fontSize: '11px' }}
                    className="w-[100%] h-[100%] flex justify-center items-center row-start-1 row-end-3"
                    onClick={() => { dataWorkDayShiftList?.length > 0 ? undefined : handlePush('/Orders') }}
                  >
                    Lập order
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: dataWorkDayShiftList?.length > 0 ? '#6BAD8C' : '#008000', color: '#fff', borderRadius: '10px', fontSize: '11px' }}
                    className="w-[100%] h-[70px] flex justify-center items-center"
                    onClick={() => { dataWorkDayShiftList?.length > 0 ? undefined : handlePush('/Table') }}
                  >
                    Mở sơ đồ bàn
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: dataWorkDayShiftList?.length > 0 ? '#F5B7B1' : '#FF0000', color: '#fff', borderRadius: '10px', fontSize: '11px' }}
                    className="w-[100%] h-[70px] flex justify-center items-center"
                    onClick={() => { dataWorkDayShiftList?.length > 0 ? undefined : handlePush('/OrderFinished') }}
                  >
                    Các đơn hàng đã đóng
                  </Button>
                </div>
              </div>
              <div className="w-[100%] h-full p-[10px] col-start-3 col-end-6">
                <h1 className="font-semibold text-[18px] mt-3 mb-2">Nghiệp vụ ca làm việc</h1>
                <div className="grid grid-cols-3 grid-rows-2 gap-2">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#CA9300', color: '#fff', borderRadius: '10px', fontSize: '11px', gridColumn: '1/3', }}
                    className="w-[100%] h-[70px] flex justify-center items-center"
                    onClick={() => { handlePush('/Shift') }}
                  >
                    Cấu hình ngày làm việc
                  </Button>
                  <ConfirmationDialog1 />
                  {/* <ConfirmationDialog2 /> */}
                  <Button
                    variant="contained"
                    style={{ backgroundColor: dataWorkDayShiftList?.length > 0 ? '#FFD65A' : '#CA9300', color: '#fff', borderRadius: '10px', fontSize: '11px' }}
                    className="w-[100%] h-[70px] flex justify-center items-center"
                    onClick={() => { dataWorkDayShiftList?.length > 0 ? undefined : handlePush('/MonOut') }}
                  >
                    Rút tiền từ két
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: dataWorkDayShiftList?.length > 0 ? '#FFD65A' : '#CA9300', color: '#fff', borderRadius: '10px', fontSize: '11px', gridColumn: '-1/-3', }}
                    className="w-[100%] h-[70px] flex justify-center items-center"
                    onClick={() => { dataWorkDayShiftList?.length > 0 ? undefined : handlePush('/MonIn') }}
                  >
                    Nộp tiền từ két
                  </Button>
                </div>

              </div>
              <div className="w-[100%] h-full p-[10px] pt-[60px] col-start-1 col-end-6">
                <h1 className="font-semibold text-[18px] mt-3 mb-2">Báo cáo</h1>
                <div className="w-full h-full grid grid-cols-6 grid-rows-2 gap-2">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#CA9300', color: '#fff', borderRadius: '10px', fontSize: '11px' }}
                    className="w-[100%] h-[100%] flex justify-center items-center  row-start-1 row-end-3"
                    onClick={() => {/* handle navigation here */ }}
                  >
                    Doanh thu theo ca làm việc
                  </Button>

                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#CA9300', color: '#fff', borderRadius: '10px', fontSize: '11px' }}
                    className="w-[100%] h-[100%] flex justify-center items-center row-start-1 row-end-3"
                    onClick={() => {/* handle navigation here */ }}
                  >
                    Doanh thu theo ngày làm việc
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#CA9300', color: '#fff', borderRadius: '10px', fontSize: '11px' }}
                    className="w-[100%] h-[100%] flex justify-center items-center"
                    onClick={() => {/* handle navigation here */ }}
                  >
                    Doanh thu theo loại bán hàng
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#CA9300', color: '#fff', borderRadius: '10px', fontSize: '11px' }}
                    className="w-[100%] h-[100%] flex justify-center items-center"
                    onClick={() => {/* handle navigation here */ }}
                  >
                    Doanh thu theo kênh bán hàng
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#CA9300', color: '#fff', borderRadius: '10px', fontSize: '11px' }}
                    className="w-[100%] h-[100%] flex justify-center items-center"
                    onClick={() => {/* handle navigation here */ }}
                  >
                    Doanh thu theo kênh thanh toán
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#CA9300', color: '#fff', borderRadius: '10px', fontSize: '11px' }}
                    className="w-[100%] h-[100%] flex justify-center items-center"
                    onClick={() => {/* handle navigation here */ }}
                  >
                    Doanh thu theo mục sản phẩm
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#CA9300', color: '#fff', borderRadius: '10px', fontSize: '11px' }}
                    className="w-[100%] h-[100%] flex justify-center items-center col-start-5 col-end-7 row-start-1 row-end-3"
                    onClick={() => {/* handle navigation here */ }}
                  >
                    Doanh thu theo sản phẩm
                  </Button>
                </div>
              </div>
            </div>

          </div >
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
