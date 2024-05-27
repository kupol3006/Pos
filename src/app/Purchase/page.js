'use client'
import * as React from 'react';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Typography, Box, Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { fetchProduct, setProductDetail, addItems, setToping, setToppingDetail, setStoreToppingSelected, resetStateToppingSelected, resetStateProductSlice, setProductId, setToppingId, addToppingDetail, setIdCard, setItemSelected, updateQuantity } from '../redux/slices/productSlice';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import EastIcon from '@mui/icons-material/East';
import { parseCookies } from "nookies";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
// import { createOrder } from '../redux/slices/orderSlice';
import { setUniqueID, updateQuantityOrderById, setOrderUpdate, setProductName, setGeneralID, updateToppingOrderById, resetStateOrderByIdSlice, setIsNew } from '../redux/slices/orderByIdSlice';
import ConfirmationDialog from '../Component/popUpSave';
import Payments from '../Component/payment';
import PaymentOrder from '../Component/popUpPaymentOrder';

const CollapsibleTable = () => {
    const currentDate = useRef(new Date().toLocaleDateString());
    const currentTime = useRef(new Date().toLocaleTimeString());
    const staff = useSelector((state) => state.order.staffName);
    const items = useSelector((state) => state.product.items);
    // const storeToppingSelected = useSelector((state) => state.product.storeToppingSelected);
    const dispatch = useDispatch();
    const [isNew, setIsNew] = useState(true);
    const isNew1 = useSelector((state) => state.orderById.isNew);
    const [isGray, setIsGray] = useState(true);
    const idCard = useSelector((state) => state.product.idCard);
    const itemSelected = useSelector((state) => state.product.itemSelected);

    // Dữ liệu mới từ orderByIdSlice
    const dataRoom = useSelector((state) => state.orderById.data);
    const dataOrderDetail = dataRoom.orderDetails;
    const staffOrderByID = dataRoom?.waiter?.first_name;
    const idUnique = useSelector((state) => state.orderById.idUnique);

    useEffect(() => {
        if (items.length > 0 && itemSelected.idCard !== idCard) {
            dispatch(setIdCard(items[items.length - 1].idCard));
            setIsNew(true);
            // dispatch(setIsNew(true));
        }
        // console.log(isNew);
    }, [items]);

    const updateIdCard = (item) => {
        // const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);
        if (item.idCard !== undefined && typeof item.idCard !== 'number') {
            dispatch(setIdCard(item.idCard));
            dispatch(setItemSelected(item));
            dispatch(setUniqueID(''));
            dispatch(setGeneralID(item.idCard));
        }
        else {
            dispatch(setUniqueID(item.id));
            dispatch(setProductName(item.name));
            dispatch(setIdCard(''));
            dispatch(setGeneralID(item.id));
        }


        setIsNew(false);
        // dispatch(setIsNew(false));
        // console.log(isNew);
    }

    return (
        <TableContainer component={Paper} sx={{ width: '100%', maxHeight: '74%' }} className='h-[74%]'>
            <Table aria-label="collapsible table">
                <TableHead size='small' className='w-[49.5%] bg-[#fff] text-[13px] border-b border-[black] fixed' >
                    <tr size='small'>
                        <td style={{ width: '25%', padding: '0px 10px 0px 10px', borderRight: '1px black solid' }}>{currentDate.current}</td>
                        <td align="right" style={{ width: '25%', padding: '0px 10px 0px 10px', borderRight: '1px black solid' }}>{currentTime.current}</td>
                        <td align="center" style={{ width: '25%', padding: '0px 10px 0px 10px', }}>Phục vụ:</td>
                        <td align="center" style={{ width: '25%', padding: '0px 10px 0px 10px', }}>{staffOrderByID || staff}</td>
                    </tr>
                </TableHead>
                <TableBody >
                    <TableRow className='h-[20px]'></TableRow>
                    {dataOrderDetail?.map((item, index) => (
                        <React.Fragment key={index}>
                            <TableRow
                                className='h-[10px] select-none cursor-pointer'
                                style={{ backgroundColor: '#EBEDEF' }}
                                onClick={() => updateIdCard(item)}
                            >
                                <td size='small' colSpan={4}
                                    className='h-[20px]'
                                    style={{ backgroundColor: isNew === false && item.id === idUnique ? 'red' : 'transparent' }}
                                >
                                    <Box
                                        className='w-full h-full flex flex-row justify-between items-center pl-[5px] pr-[5px] text-[12px] border-t border-[gray] [&:nth-child(1)]: border-none'
                                        style={{
                                            // backgroundColor: isNew === false && item.id === idUnique ? 'red' : 'transparent',
                                            color: isGray && item.id === idUnique && idCard === '' ? 'white' : 'black',
                                            width: '100%',
                                            height: '100%'
                                        }}
                                        autoFocus
                                    >
                                        <div className="mt-1">
                                            <div className='w-[15px] h-[15px] mr-1 inline-block text-center bg-[#3B44B6] text-[#fff] rounded-[50%]'>
                                                {item.quantity}
                                            </div>
                                            <span>{item.name}</span>
                                        </div>
                                        {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                    </Box>
                                </td>
                            </TableRow>
                            <TableRow
                                className='select-none cursor-pointer'
                                onClick={() => updateIdCard(item)}
                                style={{ backgroundColor: '#EBEDEF' }}
                            >
                                <td size='small' colSpan={4}>
                                    <Box className='flex flex-row flex-wrap justify-start items-start pl-[6px] '>
                                        {dataOrderDetail[index].details?.map((topping, index) => (
                                            <Box key={index} size='small' className='flex text-[10px] w-[25%]'>
                                                <p className='w-[13px] h-[13px] flex flex-row justify-center items-center text-center mr-1 bg-[#00000069] text-[#fff] rounded-[50%]'>{topping.quantity}</p>
                                                <p className='text-black'>{topping.name}</p>
                                            </Box>
                                        ))
                                        }
                                    </Box>
                                </td>
                            </TableRow>
                        </React.Fragment>
                    ))}
                    {items?.map((item, index) => (
                        <React.Fragment key={index}>
                            <TableRow
                                className='h-[10px] cursor-pointer select-none'
                                // style={{ backgroundColor: index === items.length - 1 && isNew ? 'gray' : 'transparent' }}
                                onClick={() => updateIdCard(item)}
                            >
                                <td size='small' colSpan={4}
                                    className='h-[20px]'
                                    style={{ backgroundColor: (isNew === false || isNew1) && item.idCard === idCard ? 'gray' : 'transparent' }}
                                >
                                    <Box
                                        className='w-full h-full flex flex-row justify-between items-center pl-[5px] pr-[5px] text-[12px] border-t border-[gray] [nth-child(1)]: border-none'
                                        style={{
                                            // backgroundColor: isNew === false && item.idCard === idCard ? 'gray' : 'transparent',
                                            color: isGray && item.idCard === idCard ? 'white' : 'black',
                                            width: '100%',
                                            height: '100%'
                                        }}
                                        autoFocus
                                    >
                                        <div className="mt-1">
                                            <div className='w-[15px] h-[15px] mr-1 inline-block text-center bg-[#3B44B6] text-[#fff] rounded-[50%]'>
                                                {item.quantity}
                                            </div>
                                            <span>{item.name}</span>
                                        </div>
                                        {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                    </Box>
                                </td>
                            </TableRow>
                            <TableRow
                                className='select-none cursor-pointer'
                                onClick={() => updateIdCard(item)}
                            >
                                <td size='small' colSpan={4} >
                                    <Box className='flex flex-row flex-wrap justify-start items-start pl-[6px] '>
                                        {items.length > 0 &&
                                            items[index].topping?.map((topping, index) => (
                                                <Box key={index} size='small' className='flex text-[10px] w-[25%]'>
                                                    <p className='w-[13px] h-[13px] flex flex-row justify-center items-center text-center mr-1 bg-[#00000069] text-[#fff] rounded-[50%]'>{topping.quantity}</p>
                                                    <p>{topping.topping.name || topping.topping.product.name}</p>
                                                </Box>
                                            ))
                                        }
                                        {items.length > 0 &&
                                            items[index].toppingDetail?.map((toppingDetail, index) => (
                                                <Box key={index} size='small' className='flex text-[10px] w-[25%]'>
                                                    <p className='w-[13px] h-[13px] flex flex-row justify-center items-center text-center mr-1 bg-[#00000069] text-[#fff] rounded-[50%]'>{toppingDetail.quantity}</p>
                                                    <p>{toppingDetail.toppingDetail.name}</p>
                                                </Box>
                                            ))
                                        }
                                    </Box>
                                </td>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
}

const Products = () => {
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(true);
    const [show2, setShow2] = useState(true);
    const dispatch = useDispatch();
    const data = useSelector((state) => state.product.data);
    const productDetail1 = useSelector((state) => state.product.productDetail);
    // const items = useSelector((state) => state.product.items);
    const toppings = useSelector((state) => state.product.topping);
    const toppingDetails = useSelector((state) => state.product.toppingDetail);
    const idCard = useSelector((state) => state.product.idCard);

    //Dư liệu từ OrderByIdSlice
    const idUnique = useSelector((state) => state.orderById.idUnique);
    const productName = useSelector((state) => state.orderById.productName);
    const idGeneral = useSelector((state) => state.orderById.idGeneral);

    const handleShow = () => {
        setShow(!show);
    }

    const handleShow1 = () => {
        setShow1(!show1);
    }

    const handleProductClick = (type, productDetail, productSpecialPrice, product, productModiGroups) => {

        if (type === 'category') {
            dispatch(setProductDetail(productDetail));
        } else if (type === 'product') {
            dispatch(addItems(product));
        } else if (type === 'service') {
            dispatch(setProductDetail(productSpecialPrice))
        } else if (type === 'combo') {
            dispatch(addItems(product))
            dispatch(setProductDetail(productModiGroups))
        }
        if (type !== 'product') {
            setShow(true);
        }
    };

    const handleProductDetailClick = (producDetailt2) => {
        if (idUnique !== '' && productName === producDetailt2.name && idCard === '') {
            dispatch(updateQuantityOrderById(producDetailt2.name));
            dispatch(setOrderUpdate());
        } else if (producDetailt2.price !== undefined) {
            dispatch(addItems(producDetailt2));
            dispatch(setToping(producDetailt2.toppings));
        } else {
            dispatch(setToping(producDetailt2.modifiers));
        }
        // dispatch(setToping(producDetailt2.toppings));
        dispatch(setProductId(producDetailt2.id));

        if (producDetailt2.pos_code === undefined) {
            setShow1(false);
        } else {
            setShow1(true);

        }
        // setShow1(false);
        dispatch(setIsNew(true));
    };
    const handleToppingClick = (toppingDetail, topping) => {
        if (typeof idGeneral === 'number' && idCard === '') {
            dispatch(updateToppingOrderById(topping));
        } else {
            if (topping.details?.length === 0) {
                dispatch(setStoreToppingSelected(topping));
            }
            // else if (topping.product.type === 'product') {
            //     dispatch(setStoreToppingSelected(topping));
            // }

        }
        dispatch(setToppingDetail(toppingDetail));
        dispatch(setToppingId(topping.id));

        if (toppingDetail?.length > 0) {
            setShow2(false);
        }


    };

    const handleToppingDetailClick = (toppingDetail) => {
        if (typeof idGeneral === 'number' && idCard === '') {
            dispatch(updateToppingOrderById(toppingDetail));
        } else {
            dispatch(addToppingDetail(toppingDetail));
        }
        setShow2(true);
    };

    return (
        <Box className='w-[31%] ml-[10px]'>
            <Box className='w-full flex flex-row justify-start flex-wrap'>
                {show ?
                    (
                        show1 ?
                            (
                                <Box className='w-full flex items-start'>
                                    <Box className='w-full flex flex-row flex-wrap'>
                                        <Box
                                            className='w-[32%] h-[100px] m-[1px] flex justify-center items-center rounded-[10px] bg-[#64c776] hover:bg-[#64c776ef]'
                                            sx={{ color: 'primary.contrastText', cursor: 'pointer', userSelect: 'none' }}
                                            onClick={() => handleShow()} // Truyền tên sản phẩm vào hàm handleShow
                                        >
                                            <Typography variant="h6" component="div" sx={{ fontSize: '15px' }}><KeyboardBackspaceIcon /></Typography>
                                        </Box>
                                        {productDetail1.map((product_detail) => (
                                            <Box
                                                key={product_detail.id || product_detail.pos_code}
                                                className='w-[32%] h-[100px] m-[1px] flex justify-center items-center rounded-[10px]'
                                                sx={{ color: 'primary.contrastText', cursor: 'pointer', userSelect: 'none', backgroundColor: product_detail.color || '#2E4053 ' }}
                                                onClick={() => handleProductDetailClick(product_detail)}
                                            >
                                                <Typography variant="h6" component="div" sx={{ fontSize: '15px', textAlign: 'center' }}>{product_detail.name}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            )
                            :
                            (
                                show2 ?
                                    (
                                        <div className='w-full flex flex-row flex-wrap'>
                                            <Box
                                                className='w-[32%] h-[100px] m-[1px] flex justify-center items-center rounded-[10px] bg-[#64c776] hover:bg-[#64c776ef]'
                                                sx={{ color: 'primary.contrastText', cursor: 'pointer', userSelect: 'none' }}
                                                onClick={() => handleShow1()}
                                            >
                                                <Typography variant="h6" component="div" sx={{ fontSize: '15px' }}><KeyboardBackspaceIcon /></Typography>
                                            </Box>
                                            {toppings?.map((topping) => (
                                                <Box
                                                    key={topping.id}
                                                    className='w-[32%] h-[100px] m-[1px] flex flex-col justify-center items-center rounded-[10px]'
                                                    sx={{ color: 'primary.contrastText', cursor: 'pointer', userSelect: 'none', backgroundColor: topping.color || topping.product.color }}
                                                    onClick={() => { handleToppingClick(topping.details, topping) }}
                                                >
                                                    <Typography variant="h6" component="div" sx={{ fontSize: '15px', textAlign: 'center' }}>{topping.name || topping.product.name}</Typography>
                                                </Box>
                                            ))}
                                        </div>
                                    )
                                    :
                                    (
                                        <div className='w-full flex flex-row flex-wrap'>
                                            {toppingDetails.map((toppingDetail) => (
                                                <Box
                                                    key={toppingDetail.id}
                                                    className='w-[32%] h-[100px] m-[1px] flex flex-col justify-center items-center rounded-[10px]'
                                                    sx={{ color: 'primary.contrastText', cursor: 'pointer', userSelect: 'none', backgroundColor: toppingDetail.color }}
                                                    onClick={() => handleToppingDetailClick(toppingDetail)}
                                                >
                                                    <Typography variant="h6" component="div" sx={{ fontSize: '15px', textAlign: 'center' }}>{toppingDetail.name}</Typography>
                                                    <Typography variant="h6" component="div" sx={{ fontSize: '15px', textAlign: 'center' }}><KeyboardBackspaceIcon sx={{ fontSize: 15 }} /></Typography>
                                                </Box>
                                            ))}
                                        </div>
                                    )
                            )
                    ) : (

                        <div className='w-full flex flex-row flex-wrap'>
                            {data?.map((product, index) => (
                                <Box
                                    key={index}
                                    className='w-[32%] h-[100px] m-[1px] flex flex-col flex-wrap justify-center items-center rounded-[10px]'
                                    sx={{ color: 'primary.contrastText', cursor: 'pointer', userSelect: 'none', backgroundColor: product.color }}
                                    onClick={() => handleProductClick(product.type, product.details, product.specialPrices, product, product.modiGroups)}
                                >
                                    <Typography variant="h6" component="div" sx={{ fontSize: '15px', textAlign: 'center' }}>{product.name}</Typography>
                                    {product.type === 'product' ? null : <Typography variant="h6" component="div" sx={{ fontSize: '15px', textAlign: 'center' }}><EastIcon sx={{ fontSize: 15 }} /></Typography>}
                                </Box>
                            ))}
                        </div>
                    )}
            </Box>

        </Box >
    );
};


export default function BoxSx() {
    const dispatch = useDispatch();
    const roomName = useSelector((state) => state.order.roomName);
    const cusQuan = useSelector((state) => state.order.cusQuan);

    const staff = useSelector((state) => state.order.staffName);
    const currentDate = useRef(new Date().toLocaleDateString());
    const currentTime = useRef(new Date().toLocaleTimeString());
    const router = useRouter();
    const items = useSelector((state) => state.product.items);

    const [tax, setTax] = useState('0');
    // const [cusPay, setCusPay] = useState('0đ');
    const pathName = usePathname();
    const idCard = useSelector((state) => state.product.idCard);


    // Dữ liệu mới từ chức năng cập nhật Order
    const dataRoom = useSelector((state) => state.orderById.data);
    const staffOrderByID = dataRoom?.cashier?.first_name;
    const totalOrderByID = dataRoom.orderDetails?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
    const totalToppingOrderByID = dataRoom.orderDetails?.reduce((total, item) => total + (item.details?.reduce((total, item) => total + item.price * item.quantity, 0) || 0), 0);
    const totalTopping = items.reduce((total, item) => total + (item.topping?.reduce((total, item) => total + item.topping.price * item.quantity, 0) || 0), 0);
    const totalToppingDetail = items.reduce((total, item) => total + (item.toppingDetail?.reduce((total, item) => total + item.toppingDetail.price * item.quantity, 0) || 0), 0);
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0) + totalTopping + totalToppingDetail + (totalOrderByID || 0) + (totalToppingOrderByID || 0);
    const formattedTotal = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total);
    const roomNameOrderByID = dataRoom.table?.name;
    const idGeneral = useSelector((state) => state.orderById.idGeneral);
    const idUnique = useSelector((state) => state.orderById.idUnique);


    const handleBack = () => {
        if (dataRoom.length === 0) {
            router.push('/Orders');
        } else {
            dispatch(resetStateOrderByIdSlice());
            router.push('/Table');
        }

    };
    const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [value, setValue] = useState('');

    const handleChange = (num) => {
        setValue(prevValue => prevValue + `${num}`)
        // console.log(value);
    }

    const handleDelete = () => {
        if (value !== '') {
            let arr = value.split('');
            arr.splice(arr.length - 1, 1);
            setValue(arr.join(''));
        }
        else if (typeof idGeneral === 'number' && idCard === '') {
            dispatch(updateQuantityOrderById('delete'));
            dispatch(setOrderUpdate());
        } else {
            dispatch(updateQuantity('delete'));
        }
        // let arr = value.split('');
        // arr.splice(arr.length - 1, 1);
        // setValue(arr.join(''));
    }

    useEffect(() => {
        dispatch(fetchProduct());
    }, [pathName]);

    useEffect(() => {
        const token = parseCookies()["token"];
        if (token === undefined) {
            router.push("/Login");
        }
    }, []);

    const handleUpdateQuantity = (value) => {
        if (typeof idGeneral === 'number' && idCard === '') {
            dispatch(updateQuantityOrderById(value));
            dispatch(setOrderUpdate());
        }
        else {
            dispatch(updateQuantity(value));
        }
        // dispatch(updateQuantity(value));
        // dispatch(updateQuantityOrderById(value));
        setValue('');
        // dispatch(setOrderUpdate());
    }

    // const handleSubmit = () => {
    //     dispatch(createOrder());
    // }

    const [showPayment, setShowPayment] = useState(false);
    const [cusPay, setCusPay] = useState(total);
    const handleCusPay = (value) => {
        setCusPay(value);
        setValue('');
    }

    return (
        <Box>
            <Box className='flex flex-row w-full h-screen' sx={{ gap: '2px' }} >
                <Box className='flex flex-col w-[50%] h-screens' >
                    <Box className='flex flex-row w-full h-[10%]' >
                        <img src='logoS3.png' style={{ width: '10%', height: '100%', backgroundColor: '#F4F6F6' }}></img>
                        <Box
                            sx={{
                                width: '45%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                padding: '0 0.5% 0 0.5%',

                                bgcolor: '#0059D4',
                                color: 'primary.contrastText',
                                borderRight: '2px #fff solid',
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ fontSize: '70%', lineHeight: '12px' }}>
                                {currentDate.current}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ fontSize: '70%', lineHeight: '12px' }}>
                                Phòng hoặc giao hàng: {roomNameOrderByID || roomName} ---- Số lượng khách: {cusQuan}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ fontSize: '70%', lineHeight: '12px' }}>
                                Thuế: {tax}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ fontSize: '70%', lineHeight: '12px' }}>
                                Tổng: {formattedTotal}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: '45%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                padding: '0 1% 0 1%',
                                bgcolor: '#0059D4',
                                color: 'primary.contrastText',
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ fontSize: '70%', lineHeight: '8px' }}>
                                Tiền khách đưa: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cusPay) || formattedTotal}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ fontSize: '70%' }}>
                                Thanh toán:
                            </Typography>
                            <Typography variant="subtitle1" sx={{ fontSize: '110%', lineHeight: '14px', fontWeight: 'bold' }}>
                                {formattedTotal}
                            </Typography>
                        </Box>
                    </Box>
                    <CollapsibleTable />
                    <div className='w-full h-[16%] mt-[2px] flex flex-row justify-center items-center border border-[#E7E7E7]'>
                        <div className='w-[24.76%] h-full flex-col mr-[2px]'>
                            <div className='w-full h-[31.8%] bg-[#0044ff] mb-[2px] flex items-center justify-center text-[#fff]  rounded-[5px]'>Chuyển bàn</div>
                            <div className='w-full h-[31.8%] bg-[#0044ff] mb-[2px] flex items-center justify-center text-[#fff]  rounded-[5px] cursor-pointer select-none' onClick={() => { handleUpdateQuantity('plus') }}>Tăng SL món</div>
                            <div className='w-full h-[31.8%] bg-[#0044ff] flex items-center justify-center text-[#fff]  rounded-[5px] cursor-pointer select-none' onClick={() => { handleUpdateQuantity('minus') }}>Giảm SL món</div>
                        </div>
                        <div className='w-[24.76%] h-full flex-col mr-[2px]'>
                            <div className='w-full h-[33%] bg-[#0044ff] mb-[2px] flex items-center justify-center text-[#fff]  rounded-[5px]'>Gộp bàn</div>
                            <div className='w-full h-[64.3%] bg-[#0044ff] flex items-center justify-center text-[#fff]  rounded-[5px]'>Chọn món</div>
                        </div>
                        <div className='w-[24.76%] h-full flex-col mr-[2px]'>
                            <div className='w-full h-[33%] bg-[#0044ff] mb-[2px] flex items-center justify-center text-[#fff]  rounded-[5px]'>Tách món</div>
                            <div className='w-full h-[64.3%] bg-[#0044ff] flex items-center justify-center text-[#fff]  rounded-[5px]'>Ghi chú</div>
                        </div>
                        <div className='w-[24.76%] h-full flex-col'>
                            <div className='w-full h-[33%] bg-[#0044ff] mb-[2px] flex items-center justify-center text-[#fff]  rounded-[5px]'>Tách đơn</div>
                            <div className='w-full h-[64.3%] bg-[#0044ff] flex items-center justify-center text-[#fff]  rounded-[5px]'>Tìm kiếm</div>
                        </div>
                    </div>
                </Box >
                {/* <Products />
                <Payments /> */}
                {showPayment ? <Payments /> : <Products />}
                <div className='w-[19%] h-screen flex flex-col'>
                    <div className='w-full h-[50%] '>
                        <div className="w-full h-full flex flex-col items-center pt-[3px] bg-[#c5bcb425]">
                            {showPayment ?
                                <div className='w-full h-[150px] flex flex-col justify-center items-center text-[20px]'>
                                    <h1>Tiền khách trả</h1>
                                    <h1>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cusPay) || formattedTotal}</h1>
                                </div>

                                :
                                <div className='w-full flex flex-col items-center'>
                                    <div className='w-full flex flex-row justify-between text-[#9B958E] text-[13px] p-[5px] mt-[10px] leading-[4px]'>
                                        <p className=''>Nhân viên:</p>
                                        <p className=''>{staffOrderByID || staff}</p>
                                    </div>
                                    <div className='w-full flex flex-row justify-between text-[#9B958E] text-[13px] p-[5px]'>
                                        <p className=''>Thu ngân:</p>
                                        <p className=''>{staffOrderByID || staff}</p>
                                    </div>
                                    <div className='w-full flex flex-row justify-between text-[#9B958E] text-[13px] p-[5px] leading-[4px] mb-[5px]'>
                                        <p className=''>Lúc:</p>
                                        <p className=''>{currentTime.current}</p>
                                    </div>
                                </div>
                            }
                            <TextField
                                id="outlined-basic" variant="outlined" size='small'
                                sx={{ width: '98%', background: '#fff', borderRadius: '5px' }}
                                inputProps={{ style: { height: '20px' } }}
                                value={value}

                            />
                            <div className='w-full h-full flex flex-wrap gap-[1px] p-[3px]'>
                                {num.map((item, index) => {
                                    return (
                                        <Button
                                            key={index} variant="contained"
                                            sx={{ background: '#575851', width: '32.7%', minWidth: '0%' }}
                                            value={item}
                                            onClick={() => handleChange(item)}
                                        >
                                            {item}
                                        </Button>
                                    )
                                })}
                                <Button sx={{ width: '32.7%', minWidth: '0%' }} variant="contained" color='error' onClick={() => { handleDelete() }}>xóa</Button>
                                <Button variant="contained" sx={{ backgroundColor: '#086BFF', width: '32.7%', minWidth: '0%' }} onClick={() => { showPayment ? handleCusPay(value) : handleUpdateQuantity(value) }} ><KeyboardReturnIcon /></Button>

                            </div>
                        </div>
                    </div>
                    {showPayment ?
                        <div className='w-full h-[9%] flex flex-row gap-[2px] p-[3px] pt-[0]'>
                            {/* <Button variant="contained" color="success" type="submit" className='w-[50%]'
                                onClick={() => handleSubmit()}
                                sx={{ fontSize: '10px' }}
                            >Xác nhận thanh toán</Button> */}
                            <PaymentOrder />
                            <Button variant="contained" color="error" onClick={() => { setShowPayment(false) }} className='w-[50%]'><CloseIcon /></Button>
                        </div>
                        :
                        <div className='w-full h-[50%] flex flex-col justify-end text-[11px] p-[3px]'>
                            <div className='w-full h-[16%] flex flex-row gap-[2px] mt-[2px]'>
                                <Button
                                    variant="contained"
                                    className='w-[50%] h-[100%] flex justify-center items-center text-[#fff] rounded-[5px]'
                                    sx={{ backgroundColor: '#0044ff', fontSize: '10px' }}
                                    onClick={() => { setShowPayment(false) }}
                                >
                                    Thực Đơn
                                </Button>
                                <div className='w-[50%] h-[100%] flex justify-center items-center text-[#fff] bg-[#0044ff] rounded-[5px]'>Topping</div>
                            </div>
                            <div className='w-full h-[16%] flex flex-row gap-[2px] mt-[2px]'>
                                <div className='w-[50%] h-[100%] flex justify-center items-center text-[#fff] bg-[#0044ff] rounded-[5px]'>Mã nhận từ bàn phím</div>
                                <div className='w-[50%] h-[100%] flex justify-center items-center text-[#fff] bg-[#0044ff] rounded-[5px]'>Bổ sung</div>
                            </div>
                            <div className='w-full h-[16%] flex flex-row gap-[2px] mt-[2px]'>
                                <div className='w-[50%] h-[100%] flex justify-center items-center text-[#fff] bg-[#0044ff] rounded-[5px]'>Thanh toán ví</div>
                                <div className='w-[50%] h-[100%] flex justify-center items-center text-[#fff] bg-[#0044ff] rounded-[5px]'>In kiểm món</div>
                            </div>
                            <div className='w-full h-[16%] flex flex-row gap-[2px] mt-[2px]'>
                                <div className='w-[50%] h-[100%] flex justify-center items-center text-[#fff] bg-[#0044ff] rounded-[5px]'>Tạm tính</div>
                                <div className='w-[50%] h-[100%] flex justify-center items-center text-[#fff] bg-[#0044ff] rounded-[5px]'>Mở két tiền</div>
                            </div>
                            <div className='w-full h-[16%] flex flex-row gap-[2px] mt-[2px]'>
                                <div className='w-[50%] h-[100%] flex justify-center items-center text-[#fff] bg-[#0044ff] rounded-[5px]'>Giảm giá</div>
                                <Button
                                    variant="contained"
                                    className='w-[50%] h-[100%] flex justify-center items-center text-[#fff] rounded-[5px]'
                                    sx={{ backgroundColor: '#0044ff', fontSize: '10px' }}
                                    onClick={() => { setShowPayment(true) }}
                                >
                                    Thanh toán
                                </Button>
                            </div>
                            <div className='w-full h-[16%] flex flex-row gap-[2px] mt-[2px]'>
                                <Button variant="contained" color="error" onClick={() => { handleBack() }} className='w-[50%]'><CloseIcon /></Button>
                                {/* <Button variant="contained" color="success" type="submit" className='w-[50%]' onClick={() => handleSubmit()}><CheckIcon /></Button> */}
                                <ConfirmationDialog dataRoom={dataRoom} />
                            </div>
                        </div>
                    }
                </div>

            </Box >
        </Box>
    );
}
