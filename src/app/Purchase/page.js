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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchProduct } from '../redux/slices/productSlice';

const createData = (name, calories, fat) => {
    return {
        name,
        calories,
        fat,
        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    };
}

const Row = (props) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {/* <TableCell component="th" scope="row">
                    {row.name}
                </TableCell> */}
                <TableCell align="left" >{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment >
    );
}

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

const rows = [
    createData('Frozen yoghurt', 159),
    createData('Ice cream sandwich', 237),
];

const CollapsibleTable = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const staff = useSelector((state) => state.order.staff);

    return (
        <TableContainer component={Paper} sx={{ width: '100%' }}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ padding: '8px', width: '100px', borderRight: '1px black solid' }} />
                        <TableCell style={{ padding: '8px', width: '100px', borderRight: '1px black solid' }}>{currentDate}</TableCell>
                        <TableCell align="right" style={{ padding: '8px', width: '100px', borderRight: '1px black solid' }}>{currentTime}</TableCell>
                        <TableCell align="center" style={{ padding: '8px', width: '100px' }}>Phục vụ:</TableCell>
                        <TableCell align="center" style={{ padding: '8px', width: '100px', borderRight: '1px black solid' }}>{staff}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

// const Products = () => {
//     const [show, setShow] = useState(true);
//     const [productName, setProductName] = useState('');
//     const dispatch = useDispatch();
//     const data = useSelector((state) => state.product.data);

//     useEffect(() => {
//         dispatch(fetchProduct());
//     }, []);

//     return (
//         <Box className='flex flex-row w-[50%]'>
//             {data.map((product, index) => (
//                 <Box key={product.id} className='flex flex-row w-[200px]'>
//                     {show ?
//                         <Box
//                             className='w-[200px] h-[100px] flex justify-center items-center rounded-[10px] bg-[#648FC7] hover:bg-[#648fc7ec] mr-1'
//                             sx={{ color: 'primary.contrastText' }}
//                             onClick={() => setShow(false) && setProductName(product.name)}
//                         >
//                             <Typography variant="h6" gutterBottom component="div">{product.name}</Typography>
//                             {console.log(productName)}
//                         </Box>
//                         :
//                         <Box className='flex flex-row  flex-wrap'>
//                             {product.product_detail.map((product_detail) => (
//                                 product_detail.name.includes(productName) &&
//                                 <Box
//                                     key={product_detail.id}
//                                     className='w-[200px] h-[100px] flex justify-center items-center rounded-[10px] bg-[#648FC7] hover:bg-[#648fc7ec]'
//                                     sx={{ color: 'primary.contrastText' }}
//                                     onClick={() => setShow(true)}
//                                 >
//                                     <Typography variant="h6" gutterBottom component="div">{product_detail.name}</Typography>
//                                 </Box>
//                             ))}
//                         </Box>

//                     }
//                 </Box>
//             ))}
//         </Box >
//     );

// }

const Products = () => {
    const [selectedProductId, setSelectedProductId] = useState(null);
    const dispatch = useDispatch();
    const data = useSelector((state) => state.product.data);

    useEffect(() => {
        dispatch(fetchProduct());
    }, []);

    const handleProductClick = (productId) => {
        setSelectedProductId(productId);
    };

    return (
        <Box className='flex flex-row w-[50%]'>
            {data.map((product) => (
                <Box key={product.id} className='flex flex-row w-[200px]'>
                    {selectedProductId === product.id ? (
                        <Box className='flex flex-row flex-wrap'>
                            {product.product_detail.map((product_detail) => (
                                <Box
                                    key={product_detail.id}
                                    className='w-[200px] h-[100px] flex justify-center items-center rounded-[10px] bg-[#648FC7] hover:bg-[#648fc7ec]'
                                    sx={{ color: 'primary.contrastText' }}
                                    onClick={() => setShow(true)}
                                >
                                    <Typography variant="h6" gutterBottom component="div">{product_detail.name}</Typography>
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        <Box
                            className='w-[200px] h-[100px] flex justify-center items-center rounded-[10px] bg-[#648FC7] hover:bg-[#648fc7ec] mr-1'
                            sx={{ color: 'primary.contrastText' }}
                            onClick={() => handleProductClick(product.id)}
                        >
                            <Typography variant="h6" gutterBottom component="div">{product.name}</Typography>
                        </Box>
                    )}
                </Box>
            ))}
        </Box>
    );
};


export default function BoxSx() {
    const bedNum = useSelector((state) => state.order.bedNum);
    const cusQuan = useSelector((state) => state.order.cusQuan);

    const [tax, setTax] = useState('0');
    const [total, setTotal] = useState('0đ');
    const [cusPay, setCusPay] = useState('0đ');
    const [purchase, setPurchase] = useState('0đ');

    return (
        <Box className='flex flex-row w-full' sx={{ marginTop: '70px' }} >
            <Box className='flex flex-col w-[50%]' >
                <Box className='flex flex-row w-[100%]' >
                    <Box
                        sx={{
                            width: 1 / 2,
                            height: 100,
                            borderRadius: 1,
                            bgcolor: 'success.main',
                            color: 'primary.contrastText',

                        }}
                    >
                        <Typography variant="subtitle1" gutterBottom>
                            Bàn: {bedNum} - Số lượng khách: {cusQuan}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Thuế: {tax}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Tổng: {total}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: 1 / 2,
                            height: 100,
                            borderRadius: 1,
                            bgcolor: 'success.main',
                            color: 'primary.contrastText',
                        }}
                    >
                        <Typography variant="subtitle1" gutterBottom>
                            Tiền khách đưa: {cusPay}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Thanh toán: {purchase}
                        </Typography>
                    </Box>


                </Box>
                <CollapsibleTable />

            </Box>
            <Products />
        </Box>
    );
}