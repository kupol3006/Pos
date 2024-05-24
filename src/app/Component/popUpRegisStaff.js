import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { checkInOutStaff, resetStaffPosId, setRender } from '../redux/slices/staffSlice';
import { toast, ToastContainer, Bounce, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ConfirmationDialog({ value, type }) {
    const dispatch = useDispatch();
    const staffPosId = useSelector(state => state.staff.staffPosId);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async () => {
        const result = await dispatch(checkInOutStaff(type)).unwrap();
        const toastMessage = result.success ? 'Đăng ký thành công' : 'Đăng ký thất bại';
        localStorage.setItem('toastMessage', toastMessage);
        localStorage.setItem('status', result.success ? true : false)
        dispatch(resetStaffPosId());
        dispatch(setRender());
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
                    backgroundColor: (value && staffPosId !== '') ? '#1976D2' : '#086BFF80',
                    ":hover": {
                        backgroundColor: (value && staffPosId !== '') ? '#1976D2' : '#086BFF80',
                    }
                }}
                onClick={(value && staffPosId !== '') ? handleClickOpen : undefined}
            >
                Đăng ký NV
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
                        Bạn có chắc chắn muốn đăng ký cho nhân viên này?
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
