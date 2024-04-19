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
import { useState, useEffect, useLayoutEffect } from 'react';
import { fetchProduct, setListProduct, setTotal, setProductDetail } from '../redux/slices/productSlice';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

// const createData = (name, calories, fat) => {
//     return {
//         name,
//         calories,
//         fat,
//         history: [
//             {
//                 date: '2020-01-05',
//                 customerId: '11091700',
//                 amount: 3,
//             },
//             {
//                 date: '2020-01-02',
//                 customerId: 'Anonymous',
//                 amount: 1,
//             },
//         ],
//     };
// }

// const Row = (props) => {
//     const { row } = props;
//     const [open, setOpen] = React.useState(false);

//     return (
//         <React.Fragment>
//             <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
//                 <TableCell>
//                     <IconButton
//                         aria-label="expand row"
//                         size="small"
//                         onClick={() => setOpen(!open)}
//                     >
//                         {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                     </IconButton>
//                 </TableCell>
//                 {/* <TableCell component="th" scope="row">
//                     {row.name}
//                 </TableCell> */}
//                 <TableCell align="left" >{row.calories}</TableCell>
//                 <TableCell align="right">{row.fat}</TableCell>
//             </TableRow>
//             <TableRow>
//                 <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
//                     <Collapse in={open} timeout="auto" unmountOnExit>
//                         <Box sx={{ margin: 1 }}>
//                             <Typography variant="h6" gutterBottom component="div">
//                                 History
//                             </Typography>
//                             <Table size="small" aria-label="purchases">
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableCell>Date</TableCell>
//                                         <TableCell>Customer</TableCell>
//                                         <TableCell align="right">Amount</TableCell>
//                                         <TableCell align="right">Total price ($)</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {row.history.map((historyRow) => (
//                                         <TableRow key={historyRow.date}>
//                                             <TableCell component="th" scope="row">
//                                                 {historyRow.date}
//                                             </TableCell>
//                                             <TableCell>{historyRow.customerId}</TableCell>
//                                             <TableCell align="right">{historyRow.amount}</TableCell>
//                                             <TableCell align="right">
//                                                 {Math.round(historyRow.amount * row.price * 100) / 100}
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </Box>
//                     </Collapse>
//                 </TableCell>
//             </TableRow>
//         </React.Fragment >
//     );
// }

// Row.propTypes = {
//     row: PropTypes.shape({
//         calories: PropTypes.number.isRequired,
//         carbs: PropTypes.number.isRequired,
//         fat: PropTypes.number.isRequired,
//         history: PropTypes.arrayOf(
//             PropTypes.shape({
//                 amount: PropTypes.number.isRequired,
//                 customerId: PropTypes.string.isRequired,
//                 date: PropTypes.string.isRequired,
//             }),
//         ).isRequired,
//         name: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         protein: PropTypes.number.isRequired,
//     }).isRequired,
// };

// const rows = [
//     createData('Frozen yoghurt', 159),
//     createData('Ice cream sandwich', 237),
// ];

const CollapsibleTable = () => {
    // const currentDate = new Date().toLocaleDateString();
    // const currentTime = new Date().toLocaleTimeString();
    const staff = useSelector((state) => state.order.staff);
    // const producDetailtId = useSelector((state) => state.order.productDetailId);
    // const data = useSelector((state) => state.product.data);
    const listProduct = useSelector((state) => state.product.listProduct);
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
                    {listProduct.map((product, index) => (
                        <TableRow key={index} >
                            <TableCell size='small' colSpan={4}>{product.name}</TableCell>
                            <TableCell size='small'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const Products = () => {
    const [show, setShow] = useState(false);
    const [selectedProductName, setSelectedProductName] = useState(''); // Thêm state để lưu tên sản phẩm được chọn
    const dispatch = useDispatch();
    const data = useSelector((state) => state.product.data);
    const productDetail1 = useSelector((state) => state.product.productDetail);

    const handleShow = (productName) => {
        setShow(!show);
        setSelectedProductName(productName); // Lưu tên sản phẩm được nhấn
    }

    const handleProductClick = (productId, productDetail) => {
        setShow(true);
        // setSelectedProductName(productName); // Lưu tên sản phẩm được nhấn
        dispatch(setProductDetail(productDetail));
    };

    const handleProductDetailClick = (producDetailtId2) => {
        // setShow(false);
        dispatch(setListProduct(producDetailtId2));
    };

    return (
        <Box className='w-[31%] ml-[10px]'>

            <Box className='w-full flex flex-row justify-start flex-wrap'>

                {show ? (
                    <Box className='w-full flex items-start'>
                        <Box className='w-full flex flex-row flex-wrap'>
                            <Box
                                className='w-[32%] h-[100px] m-[1px] flex justify-center items-center rounded-[10px] bg-[#ffdd00] hover:bg-[#ffdd00]'
                                sx={{ color: 'primary.contrastText' }}
                                onClick={() => handleShow()} // Truyền tên sản phẩm vào hàm handleShow
                            >
                                <Typography variant="h6" component="div" sx={{ fontSize: '15px' }}><KeyboardBackspaceIcon /></Typography>
                            </Box>
                            {productDetail1.map((product_detail) => (

                                <Box
                                    key={product_detail.id}
                                    className='w-[32%] h-[100px] m-[1px] flex justify-center items-center rounded-[10px] bg-[#648FC7] hover:bg-[#648fc7ec]'
                                    sx={{ color: 'primary.contrastText' }}
                                    onClick={() => handleProductDetailClick(product_detail)}
                                >
                                    <Typography variant="h6" component="div" sx={{ fontSize: '15px', textAlign: 'center' }}>{product_detail.name}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ) : (

                    <div className='w-full flex flex-row flex-wrap'>
                        {data?.map((product, index) => (
                            <Box
                                key={index}
                                className='w-[32%] h-[100px] m-[1px] flex justify-center items-center rounded-[10px] bg-[#648FC7] hover:bg-[#648fc7ec]'
                                sx={{ color: 'primary.contrastText' }}
                                onClick={() => handleProductClick(product.id, product.details)} // Truyền ID và tên sản phẩm vào hàm handleProductClick
                            >
                                <Typography variant="h6" component="div" sx={{ fontSize: '15px', textAlign: 'center' }}>{product.name}</Typography>
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
        router.push('/Orders');
    };

    useEffect(() => {
        dispatch(fetchProduct());
    }, [router.pathName]);

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
                    <div className='w-full h-[50%] flex flex-col'>
                        <div className='w-full h-[16%] flex flex-row gap-[2px] mt-[2px]'>
                            <div className='w-[50%] h-[100%] flex justify-center items-center text-[#fff] bg-[#0044ff] rounded-[5px]'>Thực đơn</div>
                            <div className='w-[50%] h-[100%] flex justify-center items-center text-[#fff] bg-[#0044ff] rounded-[5px]'>Topping</div>
                        </div>
                        <div className='w-full h-[16%] flex flex-row gap-[2px] mt-[2px]'>
                            <div className='w-[50%] h-[100%] flex justify-center items-center text-[#fff] bg-[#0044ff] rounded-[5px]'>Thực đơn</div>
                            <div className='w-[50%] h-[100%] flex justify-center items-center text-[#fff] bg-[#0044ff] rounded-[5px]'>Topping</div>
                        </div>
                        <div className='w-full h-[16%] flex flex-row gap-[2px] mt-[2px]'>
                            <div className='w-[50%] h-[100%] flex justify-center items-center text-[#fff] bg-[#0044ff] rounded-[5px]'>Thực đơn</div>
                            <div className='w-[50%] h-[100%] flex justify-center items-center text-[#fff] bg-[#0044ff] rounded-[5px]'>Topping</div>
                        </div>
                        <div className='w-full h-[16%] flex flex-row gap-[2px] mt-[2px]'>
                            <div className='w-[50%] h-[100%] flex justify-center items-center text-[#fff] bg-[#0044ff] rounded-[5px]'>Thực đơn</div>
                            <div className='w-[50%] h-[100%] flex justify-center items-center text-[#fff] bg-[#0044ff] rounded-[5px]'>Topping</div>
                        </div>
                        <div className='w-full h-[16%] flex flex-row gap-[2px] mt-[2px]'>
                            <div className='w-[50%] h-[100%] flex justify-center items-center text-[#fff] bg-[#0044ff] rounded-[5px]'>Thực đơn</div>
                            <div className='w-[50%] h-[100%] flex justify-center items-center text-[#fff] bg-[#0044ff] rounded-[5px]'>Topping</div>
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
