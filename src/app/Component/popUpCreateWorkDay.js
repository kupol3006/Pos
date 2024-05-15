import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { createShiftDay } from '../redux/slices/shiftSlice';

export default function CreateWorkDay() {
    const dispatch = useDispatch();
    const dataWorkDayShiftList = useSelector(state => state.shift.dataWorkDayShiftList);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        dispatch(createShiftDay());
        setOpen(false);
    };

    return (
        <div className='w-[120px] h-full'>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                    width: '100%', height: "100%", borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0, fontSize: '10px',
                    backgroundColor: '#086BFF80',
                    ":hover": {
                        backgroundColor: '#086BFF80',
                    }
                }}
                onClick={undefined}
            >
                Tạo ngày
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xác nhận</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Xác nhận tạo ca làm việc mới cho ngày hiện tại?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" variant='outline' sx={{ border: '1px black solid' }}>
                        Không
                    </Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus variant='contained'>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
