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
import { Typography, Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchProduct, setListProduct, setTotal, setProductDetail, addItems, setToping, setToppingDetail, setToppingSelected, setStoreToppingSelected, resetStateToppingSelected, resetState } from '../redux/slices/productSlice';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import EastIcon from '@mui/icons-material/East';


const CollapsibleTable = () => {
    // const currentDate = new Date().toLocaleDateString();
    // const currentTime = new Date().toLocaleTimeString();
    const staff = useSelector((state) => state.order.staff);
    const listProduct = useSelector((state) => state.product.listProduct);
    const items = useSelector((state) => state.product.items);
    const toppingSelected = useSelector((state) => state.product.toppingSelected);
    const storeToppingSelected = useSelector((state) => state.product.storeToppingSelected);

    return (
        <TableContainer component={Paper} sx={{ width: '100%', maxHeight: '70%' }} className='h-[70%]'>
            <Table aria-label="collapsible table">
                <TableHead size='small'>
                    <TableRow size='small'>
                        {/* <TableCell style={{ padding: '8px', width: '100px', borderRight: '1px black solid' }} /> */}
                        <TableCell size='small' style={{ padding: '8px', width: '100px', borderRight: '1px black solid' }}>{ }</TableCell>
                        <TableCell size='small' align="right" style={{ padding: '0px', width: '100px', borderRight: '1px black solid' }}>{ }</TableCell>
                        <TableCell size='small' align="center" style={{ padding: '0px', width: '200px' }}></TableCell>
                        <TableCell size='small' align="center" style={{ padding: '0px', width: '150px', borderRight: '1px black solid' }}>Phục vụ: {staff}</TableCell>
                    </TableRow>
                </TableHead>
                {/* <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody> */}
                {/* {listProduct.map((product) => (
                    <TableBody>
                        <TableCell colSpan={4}>Hồng trà</TableCell>
                        <TableCell>200000</TableCell>
                    </TableBody>
                ))} */}
                <TableBody>
                    {items?.map((item, index) => (
                        <React.Fragment key={index}>
                            <TableRow>
                                <TableCell size='small' colSpan={4}>
                                    <p className='w-[20px] h-[20px] text-center mr-1 inline-block bg-black text-[#fff] rounded-[100%]'>{item.quantity}</p>
                                    {item.name}
                                </TableCell>
                                <TableCell size='small'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</TableCell>
                            </TableRow>
                            <TableRow className='border-[1px solid black]'>

                                <TableCell size='small' key={index} colSpan={5}>
                                    <Box>
                                        <TableBody>
                                            <TableRow>
                                                {storeToppingSelected.length > 0 &&
                                                    storeToppingSelected[index]?.map((topping, index) => (
                                                        <TableCell key={index} size='small'>{topping}</TableCell>
                                                    ))
                                                }
                                            </TableRow>
                                        </TableBody>
                                    </Box>
                                </TableCell>

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
        // dispatch(setStoreToppingSelected());
        dispatch(setToppingSelected());
        setShow1(!show1);
    }

    const handleProductClick = (productId, productDetail) => {
        setShow(true);
        dispatch(setProductDetail(productDetail));
    };

    const handleProductDetailClick = (producDetailtId2, topping) => {
        setShow1(false);
        dispatch(setToping(topping));
        dispatch(setListProduct(producDetailtId2));
        dispatch(addItems(producDetailtId2));
        console.log(items);
    };
    const handleToppingClick = (toppingDetail, toppingName) => {
        dispatch(setStoreToppingSelected(toppingName));
        dispatch(setToppingDetail(toppingDetail));
        if (toppingDetail.length > 0) {
            setShow2(false);
        }
    };

    const handleToppingDetailClick = (toppingDetail) => {
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
                                                onClick={() => handleProductDetailClick(product_detail, product_detail.toppings)}
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
                                                    className='w-[32%] h-[100px] m-[1px] flex justify-center items-center rounded-[10px] bg-[#64c776] hover:bg-[#64c776ef]'
                                                    sx={{ color: 'primary.contrastText', cursor: 'pointer', userSelect: 'none' }}
                                                    onClick={() => handleToppingClick(topping.details, topping.name)}
                                                >
                                                    <Typography variant="h6" component="div" sx={{ fontSize: '15px', textAlign: 'center' }}>{topping.name}</Typography>
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
                                                    onClick={() => handleToppingDetailClick()}
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
    const bedNum = useSelector((state) => state.order.bedNum);
    const cusQuan = useSelector((state) => state.order.cusQuan);
    const total = useSelector((state) => state.product.total);
    const dispatch = useDispatch();
    const formattedTotal = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total);

    const [tax, setTax] = useState('0');
    // const [total, setTotal] = useState(0);
    // const [cusPay, setCusPay] = useState('0đ');
    const pathName = usePathname();
    const router = useRouter();
    const handleBack = () => {
        dispatch(resetState());
        router.push('/Orders');
    };

    useEffect(() => {
        dispatch(fetchProduct());
    }, [pathName]);

    return (
        <Box>
            <Box className='flex flex-row w-full h-screen' sx={{ gap: '2px' }} >
                <Box className='flex flex-col w-[50%] h-screen' >
                    <Box className='flex flex-row w-full h-[14%]' >
                        <Box
                            sx={{
                                width: 1 / 2,
                                // height: '90px',
                                padding: '10px',
                                borderRadius: 1,
                                bgcolor: '#00429F',
                                color: 'primary.contrastText',
                                borderRight: '2px #fff solid',
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ lineHeight: '1.2' }}>
                                Bàn: {bedNum} - Số lượng khách: {cusQuan}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ lineHeight: '1.2' }}>
                                Thuế: {tax}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ lineHeight: '1.2' }}>
                                Tổng: {formattedTotal}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: 1 / 2,
                                // height: '90px',
                                padding: '10px',
                                borderRadius: 1,
                                bgcolor: '#00429F',
                                color: 'primary.contrastText',
                                // border: '2px #fff solid',
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ lineHeight: '1.2' }}>
                                Tiền khách đưa: {formattedTotal}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ lineHeight: '1.2' }}>
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
                    <div className='w-full h-[50%] bg-black'></div>
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
