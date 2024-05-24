import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { createShiftDay, setIsCreateShift } from '../redux/slices/shiftSlice';
import { toast, ToastContainer, Bounce, Flip } from 'react-toastify';

export default function CreateShift() {
    const dispatch = useDispatch();
    const dataWorkDayShiftList = useSelector(state => state.shift.dataWorkDayShiftList);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async () => {
        const resultAction = await dispatch(createShiftDay()).unwrap();
        const toastMessage = resultAction.id !== undefined ? 'Tạo ca làm việc thành công' : 'Tạo ca làm việc thất bại';
        localStorage.setItem('toastMessage', toastMessage);
        localStorage.setItem('status', resultAction.id !== undefined ? true : false)
        dispatch(setIsCreateShift());
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
                    backgroundColor: (dataWorkDayShiftList !== undefined && dataWorkDayShiftList !== null && dataWorkDayShiftList.length !== 0) ? '#086BFF80' : '#1976D2',
                    ":hover": {
                        backgroundColor: (dataWorkDayShiftList !== undefined && dataWorkDayShiftList !== null && dataWorkDayShiftList.length !== 0) ? '#086BFF80' : '#1976D2',
                    }
                }}
                onClick={(dataWorkDayShiftList !== undefined && dataWorkDayShiftList !== null && dataWorkDayShiftList.length !== 0) ? undefined : handleClickOpen}
            >
                Tạo ca
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
