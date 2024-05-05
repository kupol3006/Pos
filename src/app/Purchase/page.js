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
import { useState, useEffect } from 'react';
import { fetchProduct, setTotal, setProductDetail, addItems, setToping, setToppingDetail, setToppingSelected, setStoreToppingSelected, resetStateToppingSelected, resetState, setProductId, setToppingId, addToppingDetail } from '../redux/slices/productSlice';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import EastIcon from '@mui/icons-material/East';
import { parseCookies } from "nookies";

const CollapsibleTable = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const staff = useSelector((state) => state.order.staff);
    const items = useSelector((state) => state.product.items);
    const toppingSelected = useSelector((state) => state.product.toppingSelected);
    // const storeToppingSelected = useSelector((state) => state.product.storeToppingSelected);

    return (
        <TableContainer component={Paper} sx={{ width: '100%', maxHeight: '74%' }} className='h-[74%]'>
            <Table aria-label="collapsible table">
                <TableHead size='small' sx={{ height: '10px' }}>
                    <TableRow size='small' sx={{ height: '10px' }}>
                        {/* <TableCell size='small' style={{ padding: '8px', width: '100px', borderRight: '1px black solid' }}>{currentDate}</TableCell>
                        <TableCell size='small' align="right" style={{ padding: '0px', width: '100px', borderRight: '1px black solid' }}>{currentTime}</TableCell>
                        <TableCell size='small' align="center" style={{ padding: '0px', width: '200px' }}>Phục vụ:</TableCell>
                        <TableCell size='small' align="center" style={{ padding: '0px', width: '150px', marginRight: '3px' }} colSpan={2}> {staff}</TableCell> */}
                        <Box className='flex flex-row w-full h-[20px] border-b border-black'>
                            <Typography sx={{ width: '25%', marginLeft: '2px', borderRight: '1px solid black', fontSize: '15px' }}>{currentDate}</Typography>
                            <Typography sx={{ width: '25%', marginLeft: '2px', borderRight: '1px solid black', fontSize: '15px' }}>{currentTime}</Typography>
                            <Typography sx={{ width: '25%', marginLeft: '2px', fontSize: '15px' }}>Phục vụ:</Typography>
                            <Typography sx={{ width: '25%', marginLeft: '2px', fontSize: '15px' }}>{staff}</Typography>
                        </Box>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items?.map((item, index) => (
                        <React.Fragment key={index}>
                            <TableRow className='h-[10px]'>

                                <Box className='w-[100%] h-[20px] flex flex-row justify-between items-center p-[5px] text-[12px] border-b-[1px]'>
                                    <p className='mt-1'><p className='w-[15px] h-[15px]  mr-1 inline-block text-center bg-black text-[#fff] rounded-[50%]'>{item.quantity}</p>{item.name}</p>
                                    {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                </Box>

                                {/* <TableCell size='small'></TableCell> */}
                            </TableRow>
                            <TableRow className=''>

                                <Box className='flex flex-row flex-wrap justify-start items-start pl-[6px] border-b-[1px]'>
                                    {items.length > 0 &&
                                        items[index].topping?.map((topping, index) => (
                                            <Box key={index} size='small' className='flex text-[10px] w-[25%]'>
                                                <p className='w-[13px] h-[13px] flex flex-row justify-center items-center text-center mr-1 bg-[#00000069] text-[#fff] rounded-[50%]'>{topping.quantity}</p>
                                                <p>{topping.topping.name}</p>
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
    const items = useSelector((state) => state.product.items);
    const toppings = useSelector((state) => state.product.topping);
    const toppingDetails = useSelector((state) => state.product.toppingDetail);

    const handleShow = () => {
        setShow(!show);
    }

    const handleShow1 = () => {
        dispatch(setToppingSelected());
        setShow1(!show1);
    }

    const handleProductClick = (productId, productDetail) => {
        setShow(true);
        dispatch(setProductDetail(productDetail));
    };

    const handleProductDetailClick = (producDetailtId2, topping, productId) => {
        setShow1(false);
        dispatch(setToping(topping));
        dispatch(addItems(producDetailtId2));
        dispatch(setProductId(productId));
        dispatch(setTotal());
        console.log(items);
    };
    const handleToppingClick = (toppingDetail, toppingName, topping) => {
        dispatch(setStoreToppingSelected(topping));
        dispatch(setToppingDetail(toppingDetail));
        dispatch(setToppingId(topping.id));
        // if (toppingDetail.length > 0) {
        //     setShow2(false);
        // }
    };

    const handleToppingDetailClick = (toppingDetail, toppingDetailId) => {

        dispatch(addToppingDetail(toppingDetail));
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
                                            className='w-[32%] h-[100px] m-[1px] flex justify-center items-center rounded-[10px] bg-[#ffdd00] hover:bg-[#ffdd00]'
                                            sx={{ color: 'primary.contrastText', cursor: 'pointer', userSelect: 'none' }}
                                            onClick={() => handleShow()} // Truyền tên sản phẩm vào hàm handleShow
                                        >
                                            <Typography variant="h6" component="div" sx={{ fontSize: '15px' }}><KeyboardBackspaceIcon /></Typography>
                                        </Box>
                                        {productDetail1.map((product_detail) => (
                                            <Box
                                                key={product_detail.id}
                                                className='w-[32%] h-[100px] m-[1px] flex justify-center items-center rounded-[10px] bg-[#64c776] hover:bg-[#64c776ef]'
                                                sx={{ color: 'primary.contrastText', cursor: 'pointer', userSelect: 'none' }}
                                                onClick={() => handleProductDetailClick(product_detail, product_detail.toppings, product_detail.id)}
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
                                                className='w-[32%] h-[100px] m-[1px] flex justify-center items-center rounded-[10px] bg-[#ffdd00] hover:bg-[#ffdd00]'
                                                sx={{ color: 'primary.contrastText', cursor: 'pointer', userSelect: 'none' }}
                                                onClick={() => handleShow1()}
                                            >
                                                <Typography variant="h6" component="div" sx={{ fontSize: '15px' }}><KeyboardBackspaceIcon /></Typography>
                                            </Box>
                                            {toppings.map((topping) => (
                                                <Box
                                                    key={topping.id}
                                                    className='w-[98%] h-[150px] m-[1px] flex flex-col justify-center items-center rounded-[10px]'
                                                    sx={{ color: 'primary.contrastText', cursor: 'pointer', userSelect: 'none', backgroundColor: topping.color }}
                                                    onClick={() => { handleToppingClick(topping.details, topping.name, topping) }}
                                                >
                                                    <Typography variant="h6" component="div" sx={{ fontSize: '15px', textAlign: 'center' }}>{topping.name}</Typography>
                                                    {topping.details.length > 0 ?
                                                        (
                                                            <Box className='w-full h-full flex flex-col justify-s items-center gap-[2px] m-auto text-[12px]'>
                                                                {topping.details.map((detail) => {
                                                                    const color = detail.color;
                                                                    return (
                                                                        <Box
                                                                            key={detail.id}
                                                                            sx={{ width: '90%', height: '35px', backgroundColor: color, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '5px' }}
                                                                            onClick={() => handleToppingDetailClick(detail)}
                                                                        >
                                                                            {detail.name}
                                                                        </Box>
                                                                    )
                                                                })}
                                                            </Box>
                                                        )
                                                        :
                                                        (
                                                            <></>
                                                        )
                                                    }

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
                                                    className='w-[32%] h-[100px] m-[1px] flex flex-col justify-center items-center rounded-[10px] bg-[#64c776] hover:bg-[#64c776ef]'
                                                    sx={{ color: 'primary.contrastText', cursor: 'pointer', userSelect: 'none' }}
                                                    onClick={() => handleToppingDetailClick(toppingDetail, toppingDetail.id)}
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
                                    className='w-[32%] h-[100px] m-[1px] flex flex-col flex-wrap justify-center items-center rounded-[10px] bg-[#648FC7] hover:bg-[#648fc7ec]'
                                    sx={{ color: 'primary.contrastText', cursor: 'pointer', userSelect: 'none' }}
                                    onClick={() => handleProductClick(product.id, product.details)} // Truyền ID và tên sản phẩm vào hàm handleProductClick
                                >
                                    <Typography variant="h6" component="div" sx={{ fontSize: '15px', textAlign: 'center' }}>{product.name}</Typography>
                                    <Typography variant="h6" component="div" sx={{ fontSize: '15px', textAlign: 'center' }}><EastIcon sx={{ fontSize: 15 }} /></Typography>
                                </Box>
                            ))}
                        </div>
                    )}
            </Box>

        </Box >
    );
};


export default function BoxSx() {
    const roomNum = useSelector((state) => state.order.roomNum);
    const cusQuan = useSelector((state) => state.order.cusQuan);
    const total = useSelector((state) => state.product.total);
    const dispatch = useDispatch();
    const formattedTotal = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total);
    const staff = useSelector((state) => state.order.staff);
    const currentTime = new Date().toLocaleTimeString();
    const router = useRouter();

    const [tax, setTax] = useState('0');
    // const [total, setTotal] = useState(0);
    // const [cusPay, setCusPay] = useState('0đ');
    const pathName = usePathname();
    const handleBack = () => {
        dispatch(resetState());
        router.push('/Orders');
    };
    const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [value, setValue] = useState('');

    const handleChange = (num) => {
        setValue(prevValue => prevValue + `${num}`)
        console.log(value);
    }

    const handleDelete = () => {
        let arr = value.split('');
        arr.splice(arr.length - 1, 1);
        setValue(arr.join(''));
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

    return (
        <Box>
            <Box className='flex flex-row w-full h-screen' sx={{ gap: '2px' }} >
                <Box className='flex flex-col w-[50%] h-screen' >
                    <Box className='flex flex-row w-full h-[10%]' >
                        <Box
                            sx={{
                                width: 1 / 2,
                                height: '100%',
                                padding: '1%',
                                borderRadius: 1,
                                bgcolor: '#00429F',
                                color: 'primary.contrastText',
                                borderRight: '2px #fff solid',
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ lineHeight: '150%', fontSize: '12px' }}>
                                Phòng hoặc giao hàng: {roomNum} ---- Số lượng khách: {cusQuan}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ lineHeight: '150%', fontSize: '12px' }}>
                                Thuế: {tax}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ lineHeight: '150%', fontSize: '12px', marginBottom: '2px' }}>
                                Tổng: {formattedTotal}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: 1 / 2,
                                height: '100%',
                                padding: '1%',
                                borderRadius: 1,
                                bgcolor: '#00429F',
                                color: 'primary.contrastText',
                                borderRight: '2px #fff solid',
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ lineHeight: '150%', fontSize: '12px' }}>
                                Tiền khách đưa: {formattedTotal}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ lineHeight: '150%', fontSize: '12px' }}>
                                Thanh toán: {formattedTotal}
                            </Typography>
                        </Box>
                    </Box>
                    <CollapsibleTable />
                    <div className='w-full h-[16%] mt-[2px] flex flex-row flex-wrap justify-center items-center border border-[#E7E7E7]'>
                        <div className='w-[24.6%] h-full flex-col mr-[2px]'>
                            <div className='w-full h-[31.8%] bg-[#0044ff] mb-[2px] flex items-center justify-center text-[#fff] p-[10%] rounded-[5px]'>Chuyển bàn</div>
                            <div className='w-full h-[31.8%] bg-[#0044ff] mb-[2px] flex items-center justify-center text-[#fff] p-[10%] rounded-[5px]'>Tăng SL món</div>
                            <div className='w-full h-[31.8%] bg-[#0044ff] flex items-center justify-center text-[#fff] p-[10%] rounded-[5px]'>Giảm SL món</div>
                        </div>
                        <div className='w-[24.6%] h-full flex-col mr-[2px]'>
                            <div className='w-full h-[33%] bg-[#0044ff] mb-[2px] flex items-center justify-center text-[#fff] p-[10%] rounded-[5px]'>Gộp bàn</div>
                            <div className='w-full h-[64.3%] bg-[#0044ff] flex items-center justify-center text-[#fff] p-[10%] rounded-[5px]'>Chọn món</div>
                        </div>
                        <div className='w-[24.6%] h-full flex-col mr-[2px]'>
                            <div className='w-full h-[33%] bg-[#0044ff] mb-[2px] flex items-center justify-center text-[#fff] p-[10%] rounded-[5px]'>Tách món</div>
                            <div className='w-full h-[64.3%] bg-[#0044ff] flex items-center justify-center text-[#fff] p-[10%] rounded-[5px]'>Ghi chú</div>
                        </div>
                        <div className='w-[24.6%] h-full flex-col'>
                            <div className='w-full h-[33%] bg-[#0044ff] mb-[2px] flex items-center justify-center text-[#fff] p-[10%] rounded-[5px]'>Tách đơn</div>
                            <div className='w-full h-[64.3%] bg-[#0044ff] flex items-center justify-center text-[#fff] p-[10%] rounded-[5px]'>Tìm kiếm</div>
                        </div>
                    </div>
                </Box >
                <Products />
                <div className='w-[19%] h-screen flex flex-col'>
                    <div className='w-full h-[50%] '>
                        <div className="w-full h-full flex flex-col items-center pt-[3px] bg-[#c5bcb425] rounded-[5px]">
                            <div className='w-full flex flex-row justify-between text-[#9B958E] text-[12px] p-[5px] mt-[10px] leading-[4px]'>
                                <p className=''>Nhân viên:</p>
                                <p className=''>{staff}</p>
                            </div>
                            <div className='w-full flex flex-row justify-between text-[#9B958E] text-[12px] p-[5px]'>
                                <p className=''>Thu ngân:</p>
                                <p className=''>{staff}</p>
                            </div>
                            <div className='w-full flex flex-row justify-between text-[#9B958E] text-[12px] p-[5px] leading-[4px] mb-[5px]'>
                                <p className=''>Lúc:</p>
                                <p className=''>{currentTime}</p>
                            </div>
                            <TextField
                                id="outlined-basic" variant="outlined" size='small'
                                sx={{ width: '98%', background: '#fff', borderRadius: '5px' }}
                                inputProps={{ style: { height: '20px' } }}
                                value={value}

                            />
                            <div className='w-full h-full flex flex-row items-center flex-wrap p-[3px] gap-[2px]'>
                                {num.map((item, index) => {
                                    return (
                                        <Button
                                            key={index} className='w-[32.7%] h-[24%]' variant="contained"
                                            sx={{ background: '#575851' }}
                                            value={item}
                                            onClick={() => handleChange(item)}
                                        >
                                            {item}
                                        </Button>
                                    )
                                })}
                                <Button className='w-[32.7%] h-[24%]' variant="contained" sx={{ background: '#575851' }} onClick={() => { handleChange('.') }} value='.'>.</Button>
                                <Button className='w-[32.7%] h-[24%]' variant="contained" color='error' onClick={() => { handleDelete() }}>xóa</Button>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-[50%] flex flex-col text-[11px]'>
                        <div className='w-full h-[16%] flex flex-row gap-[2px] mt-[2px]'>
                            <div className='w-[50%] h-[100%] flex justify-center items-center text-[#fff] bg-[#0044ff] rounded-[5px]'>Thực đơn</div>
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
                            <div className='w-[50%] h-[100%] flex justify-center items-center text-[#fff] bg-[#0044ff] rounded-[5px]'>Thanh toán</div>
                        </div>
                        <div className='w-full h-[16%] flex flex-row gap-[2px] mt-[2px]'>
                            <Button variant="contained" color="error" onClick={() => { handleBack() }} className='w-[50%]'><CloseIcon /></Button>
                            <Button variant="contained" color="success" type="submit" className='w-[50%]' onClick={() => { handleSubmit() }}><CheckIcon /></Button>
                        </div>
                    </div>
                </div>
            </Box >
        </Box>
    );
}
