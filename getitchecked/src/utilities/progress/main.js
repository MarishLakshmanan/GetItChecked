import { Box, Modal } from '@mui/material'
import React from 'react'
import { ProgressBar } from './progressBar'

const CustomProgressBar = ({ modal, close,progress,service,status,msg,doc }) => {

    // if(progress?.percent==100){
    //     setModal(false)
    // }
    return (
        <Modal className='w-full flex items-center justify-center from-top' open={modal} onClose={close}>
            <Box className="w-[80%] bg-white">
                <ProgressBar progress={progress} service={service} close={close} status={status} msg={msg} doc={doc} />
            </Box>
        </Modal>

    )
}

export default CustomProgressBar