'use client'
import AddIcon from '@mui/icons-material/Add';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useRouter } from 'next/navigation';

export default function OutStock() {
    const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [value, setValue] = useState('');

    const handleChange = (num) => {
        setValue(prevValue => prevValue + `${num}`)
        console.log(value);
    }

    const handleDelete = () => {
        let arr = value.split('');
        arr.splice(arr.length - 1, 1);
        setValue(arr.join(''));
    }
    const router = useRouter();
    const handleBack = () => {
        router.push('/');
    }

    const handleSubmit = () => {

    }

    return (
        <div className="w-full h-screen flex flex-row">
            <h1 className="w-full p-[5px] text-center bg-[#424bf4] text-[#fff] fixed">Sản phẩm ngừng kinh doanh</h1>
            <div className="w-[80%] h-screen pt-[34px]">
                <div className='w-full h-[70%] flex flex-row'>
                    <TableContainer component={Paper} sx={{ width: '90%', maxHeight: '100%', border: 'none' }} className='h-[100%]'>
                        <Table aria-label="collapsible table">
                            <TableHead size='small'>
                                <TableRow size='small'>
                                    {/* <TableCell style={{ padding: '8px', width: '100px', borderRight: '1px black solid' }} /> */}
                                    {/* <TableCell size='small' style={{ padding: '8px', width: '100px', borderRight: '1px black solid' }}>{ }</TableCell>
                                <TableCell size='small' align="right" style={{ padding: '0px', width: '100px', borderRight: '1px black solid' }}>{ }</TableCell>
                                <TableCell size='small' align="center" style={{ padding: '0px', width: '200px' }}></TableCell>
                                <TableCell size='small' align="center" style={{ padding: '0px', width: '150px', borderRight: '1px black solid' }}>Phục vụ</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <React.Fragment>
                                    <TableRow>
                                        <TableCell size='small' colSpan={4}>
                                            <p className='w-[20px] h-[20px] text-center mr-1 inline-block bg-black text-[#fff] rounded-[100%]'>1</p>
                                            name
                                        </TableCell>
                                        <TableCell size='small'>price</TableCell>
                                    </TableRow>
                                    <TableRow className='border-[1px solid black]'>

                                        <TableCell size='small' colSpan={5}>
                                            <Box>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell size='small'></TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className='w-[10%] flex flex-col p-[3px] gap-[2px]'>
                        <Button variant="contained" className='w-full h-[70px]' sx={{ background: '#575851' }}><KeyboardDoubleArrowUpIcon /></Button>
                        <Button variant="contained" className='w-full h-[70px]'><KeyboardArrowUpIcon /></Button>
                        <Button variant="contained" className='w-full h-[70px]'><KeyboardArrowDownIcon /></Button>
                        <Button variant="contained" className='w-full h-[70px]' sx={{ background: '#575851' }}><KeyboardDoubleArrowDownIcon /></Button>
                    </div>
                </div>
            </div>
            <div className="w-[20%] h-screen flex flex-col bg-[#89878557] pt-[34px]">
                <div className="w-full h-[45%] flex flex-col items-center pt-[3px]">
                    <TextField
                        id="outlined-basic" variant="outlined" size='small'
                        sx={{ width: '98%', background: '#fff', borderRadius: '5px' }}
                        inputProps={{ style: { height: '20px' } }}
                        value={value}

                    />
                    <div className='w-full flex flex-row items-center flex-wrap p-[3px] gap-[2px]'>
                        {num.map((item, index) => {
                            return (
                                <Button
                                    key={index} className='w-[32.7%] h-[50px]' variant="contained"
                                    sx={{ background: '#575851' }}
                                    value={item}
                                    onClick={() => handleChange(item)}
                                >
                                    {item}
                                </Button>
                            )
                        })}
                        <Button className='w-[32.7%] h-[50px]' variant="contained" sx={{ background: '#575851' }} onClick={() => { handleChange('.') }} value='.'>.</Button>
                        <Button className='w-[32.7%] h-[50px]' variant="contained" color='error' onClick={() => { handleDelete() }}>xóa</Button>
                    </div>
                </div>
                <div className="w-full h-[55%] flex flex-col items-center gap-[2px]">
                    <div className="w-[98%] h-[25%] flex justify-center items-center text-[#fff] bg-[#0380FF] rounded-[5px]">
                        Số lượng
                    </div>
                    <div className="w-[98%] h-[25%] flex flex-row text-[#fff] gap-[2px]">
                        <div className="w-[50%] h-full flex justify-center items-center bg-[#C62828] rounded-[5px]"><AddIcon /></div>
                        <div className="w-[50%] h-full flex justify-center items-center bg-[#2E7D32] rounded-[5px]"><HorizontalRuleIcon /></div>
                    </div>
                    <div className="w-[98%] h-[25%] flex justify-center items-center text-[#fff] bg-[#0380FF] rounded-[5px]">
                        Tìm
                    </div>
                    <div className="w-[98%] h-[25%] flex flex-row text-[#fff] gap-[2px]">
                        <Button variant="contained" color="error" onClick={() => { handleBack() }} className='w-[50%]'><CloseIcon /></Button>
                        <Button variant="contained" color="success" type="submit" className='w-[50%]' onClick={() => { handleSubmit() }}><CheckIcon /></Button>
                    </div>
                </div>
            </div>
        </div >
    );
}
