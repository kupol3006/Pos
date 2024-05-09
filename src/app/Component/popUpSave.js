import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../redux/slices/orderSlice';
import { resetStateProductSlice } from '../redux/slices/productSlice';
import { useRouter } from 'next/navigation';
import { resetStateTableSlice } from '../redux/slices/tableSlice';

export default function ConfirmationDialog(dataRoom) {
    const dispatch = useDispatch();
    const router = useRouter();
    const items = useSelector((state) => state.product.items);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {

        switch (dataRoom.length) {
            case undefined:
                if (items.length > 0) {
                    dispatch(createOrder());
                    dispatch(resetStateProductSlice());
                    dispatch(resetStateTableSlice());
                    router.push('/');
                } else {
                    alert('Không có sản phẩm nào trong giỏ hàng');
                }
                break;
            default:
                break;
        }
        setOpen(false);
    };

    return (
        <div className='w-[50%] h-full'>
            <Button variant="contained" color="success" type="submit" sx={{ width: '100%', height: "100%" }} onClick={handleClickOpen} >
                <CheckIcon />
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
                        Bạn có chắc chắn muốn lưu đơn hàng này không?
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
        </div>
    );
}