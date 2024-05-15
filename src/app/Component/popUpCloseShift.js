import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { closeShiftDay, setCloseShift } from '../redux/slices/shiftSlice';

export default function ConfirmationDialog1() {
    const dispatch = useDispatch();
    const staffPosId = useSelector(state => state.staff.staffPosId);
    const dataWorkDayShiftList = useSelector(state => state.shift.dataWorkDayShiftList);


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        dispatch(closeShiftDay());
        dispatch(setCloseShift());
        setOpen(false);
    };

    return (
        <div className='w-[31%] h-[70px]'>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                    width: '100%', height: "100%",
                    fontSize: '10px',
                    borderRadius: '10px',
                    backgroundColor: dataWorkDayShiftList !== undefined && dataWorkDayShiftList !== null && dataWorkDayShiftList.length !== 0 ? '#CA9300' : '#FFD65A',
                    ":hover": {
                        backgroundColor: dataWorkDayShiftList !== undefined && dataWorkDayShiftList !== null && dataWorkDayShiftList.length !== 0 ? '#CA9300' : '#FFD65A',

                    }
                }}
                onClick={dataWorkDayShiftList !== undefined && dataWorkDayShiftList !== null && dataWorkDayShiftList.length !== 0 ? handleClickOpen : undefined}
            >
                Đóng ca làm việc
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
                        Xác nhận đóng ca làm việc hiện tại? Sau khi đóng ca, sẽ không thể tiếp tục bán hàng cho đến khi mở ca làm việc mới!
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
