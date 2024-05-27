'use client';
import { useEffect, useState } from 'react';
import Box from '@mui/system/Box';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { Button } from '@mui/material';
import { fetchPaymentsMethod, setPaymentsMethodDetail, setPaymentChannel } from '../redux/slices/paymentsSlice';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function Payments() {
    const dispatch = useDispatch();
    const paymentsMethod = useSelector(state => state.payments.dataPaymentsMethod);
    const paymentsMethodDetail = useSelector(state => state.payments.paymentsMethodDetail);
    const paymentChannel = useSelector(state => state.payments.paymentChannel);

    const [open, setOpen] = useState(true);

    useEffect(() => {
        async function fetchData() {
            await dispatch(fetchPaymentsMethod()).unwrap();
        }
        fetchData();
    }, []);

    const handleGetPaymentsMethodDetail = async (payment) => {
        dispatch(setPaymentsMethodDetail(payment));
        setOpen(false);
    };
    const handleGetPaymentChannel = async (paymentChannel) => {
        dispatch(setPaymentChannel(paymentChannel));
    }

    return (
        <Box className='w-[31%] ml-[10px]'>
            <Box className='w-full flex flex-row justify-start flex-wrap'>
                {open ?
                    <Box className='w-full flex flex-row justify-start flex-wrap'>
                        {paymentsMethod.data?.map((payment, index) => {
                            return (
                                <Button
                                    key={index}
                                    variant="contained"
                                    sx={{ width: '32%', height: "100px", display: 'flex', backgroundColor: '#086BFF', color: '#fff', borderRadius: '10px', fontSize: '11px', margin: '1px' }}
                                    onClick={() => { handleGetPaymentsMethodDetail(payment) }}
                                >
                                    {payment.name}
                                </Button>
                            )
                        })}
                    </Box>
                    :
                    <Box className='w-full flex flex-row justify-start flex-wrap'>
                        <Button
                            variant="contained"
                            sx={{ width: '32%', height: "100px", display: 'flex', backgroundColor: '#086BFF', color: '#fff', borderRadius: '10px', fontSize: '11px', margin: '1px' }}
                            onClick={() => setOpen(true)}
                        >
                            <KeyboardBackspaceIcon />
                        </Button>
                        {paymentsMethodDetail.details?.map((detail, index) => {
                            return (
                                <Button
                                    key={index}
                                    variant="contained"
                                    sx={{
                                        width: '32%', height: "100px", display: 'flex',
                                        backgroundColor: detail.channel_id === paymentChannel.channel_id ? '#5DADE2 ' : '#086BFF',
                                        border: detail.channel_id === paymentChannel.channel_id ? '2px solid #086BFF' : 'none',
                                        color: '#fff', borderRadius: '10px', fontSize: '11px', margin: '1px'
                                    }}
                                    onClick={() => { handleGetPaymentChannel(detail) }}
                                >
                                    {detail.channel_name}
                                </Button>
                            )
                        })}
                    </Box>
                }
            </Box>
        </Box>
    );
}