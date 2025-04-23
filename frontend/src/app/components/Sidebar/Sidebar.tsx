'use client'

import styles from './Sidebar.module.css'
import Link from 'next/link';
import Image from 'next/image'
import { useEffect } from 'react';

interface SidebarProps {
    isOpen: boolean;
    onCloseAction: () => void;
}

export default function Sidebar({ isOpen, onCloseAction }: SidebarProps) {
    return (
        <div 
        id="sidebar" 
        className={styles.sidebar} 
        style={{ 
            width: isOpen ? "25%" : "0",
            transition: "width 0.4s",
        }}>
            
        </div>
    )
}