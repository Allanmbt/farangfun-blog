// components/Logo.tsx 的修改版本
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from "next-themes";
import { useEffect, useState } from 'react';

interface LogoProps {
    className?: string;
}

export function Logo({ className = '' }: LogoProps) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // 仅在客户端挂载后处理
    useEffect(() => {
        setMounted(true);
    }, []);

    // 默认使用暗色模式的 logo 用于服务器端渲染
    const logoSrc = mounted ?
        (resolvedTheme === 'dark' ? '/images/logo-dark.png' : '/images/logo.png') :
        '/images/logo-dark.png';

    return (
        <Link href="/" className={`flex items-center ${className}`}>
            <Image
                src={logoSrc}
                alt="FarangFun"
                // 使用响应式宽度和高度
                width={0}
                height={0}
                // 根据屏幕尺寸设置不同的大小类
                className="h-auto w-[140px] md:w-[180px] lg:w-[220px]"
                style={{ width: 'auto', height: 'auto' }}
                sizes="(max-width: 768px) 140px, (max-width: 1200px) 180px, 220px"
                priority
            />
        </Link>
    );
}