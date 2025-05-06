"use client"

import React, { useState, useRef } from 'react';
import {
  Box,
  TextField,
  Popper,
  List,
  ListItemButton,
} from '@mui/material';
import { requiredDocuments } from '@/contants/main';
import { motion } from 'framer-motion';

const parentVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const MotionBox = motion(Box)
const MotionList = motion(List)
const MotionListItem = motion(ListItemButton)



const SearchableDropdown = ({ onSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const services = Object.keys(requiredDocuments)

  const filtered = services
    .filter((name) => name.toLowerCase().includes(inputValue.toLowerCase()));

  const handleSelect = (value) => {
    setInputValue(value);
    setOpen(false);
    // onSelect(value);
  };



  return (
    <MotionBox className="w-full">
      <TextField
        fullWidth
        placeholder="Select the Purpose"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setOpen(true);
        }}
        inputRef={anchorRef}
        size="small"
        
      />

      <Popper  open={open && filtered.length > 0} anchorEl={anchorRef.current} style={{ zIndex: 10 }} placement="bottom-start">
        <Box className="bg-slate-100 text-black h-[200px] overflow-scroll" sx={{ width: anchorRef.current?.offsetWidth }}>
          <MotionList initial="hidden" animate="visible" variants={parentVariants} dense>
            {filtered.map((name, index) => (
              <MotionListItem initial={"hidden"} animate="visible" variants={childVariants} key={index} onClick={() => handleSelect(name)}>
                {name}
              </MotionListItem>
            ))}
          </MotionList>
        </Box>
      </Popper>
    </MotionBox>
  );
};

export default SearchableDropdown;
