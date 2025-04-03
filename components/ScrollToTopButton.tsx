"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

export const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // 监听滚动事件
    useEffect(() => {
        const toggleVisibility = () => {
            // 如果页面滚动超过300px，显示按钮
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // 滚动到顶部
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed bottom-8 right-8 z-50"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.9, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ opacity: 1 }}
                >
                    <Button
                        onClick={scrollToTop}
                        size="icon"
                        aria-label="Scroll to top"
                        className="rounded-full shadow-md bg-primary hover:bg-primary/90 h-10 w-10"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m18 15-6-6-6 6" />
                        </svg>
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};