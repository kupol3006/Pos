import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { paymentOrder, finalOrder } from '../redux/slices/paymentsSlice';

export default function PaymentOrder() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async () => {
        const resultPaymentOrder = await dispatch(paymentOrder()).unwrap();
        console.log('resultFinalOrder', resultPaymentOrder.success, typeof resultPaymentOrder.success);
        if (resultPaymentOrder.success === true) {
            await dispatch(finalOrder()).unwrap();
        }
        setOpen(false);
    };

    return (
        <div className='w-[50%]'>
            <Button
                variant="contained"
                type="submit"
                sx={{
                    width: '100%', height: "100%",
                    fontSize: '10px',
                }}
                color="success"
                onClick={handleClickOpen}
            >
                Xác nhận thanh toán
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xác nhận lưu đơn hàng</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Xác nhận thanh toán đơn hàng này?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" variant='outline' sx={{ border: '1px black solid' }}>
                        Hủy bỏ
                    </Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus variant='contained'>
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
