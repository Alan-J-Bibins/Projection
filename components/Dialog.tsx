import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Dialog({ trigger, children, title, submit, handleSubmit }: {
    children: React.ReactNode,
    trigger: React.ReactNode
    submit?: React.ReactNode,
    handleSubmit?: () => void,
    title?: string
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    const handleExit = () => {
        setIsExiting(true);
        setTimeout(() => {
            // Actually remove the component after animation completes
            setIsOpen(false);
            setIsExiting(false);
        }, 150);
    };

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => handleExit();

    return (
        <>
            <button onClick={handleOpen} className="cursor-pointer">
                {trigger}
            </button>

            {mounted && isOpen && createPortal(
                <button
                    onClick={handleClose}
                    className={`${isExiting ? 'motion-opacity-out-0' : 'motion-preset-focus-md'} motion-duration-150 bg-black/20 fixed inset-0 w-full h-full z-50 
                    flex justify-center items-center cursor-default`}
                >
                    <div
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                            if (event.key === 'Escape') {
                                handleClose();
                            }
                        }}
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        className={`${isExiting ? 'motion-scale-out-75 motion-opacity-out-0' : 'motion-scale-in-75 motion-opacity-in-0'}
                        relative flex flex-col items-start justify-start motion-duration-150
                        bg-background border border-primary p-4 rounded-2xl transition-all
                        shadow-lg hover:shadow-xl hover:shadow-primary/25 max-w-xl w-full m-4 overflow-y-auto cursor-default`}>
                        <div className="flex w-full justify-between items-center border-b border-b-primary/20">
                            <h1 className="text-xl font-bold font-righteous">
                                {title || 'Title'}
                            </h1>
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 cursor-pointer"
                            >
                                <X size={20} className="hover:text-accent transition-colors" />
                            </button>
                        </div>
                        {children}
                        <div className="flex justify-between items-center w-full">
                            <div />
                            <button onClick={() => {
                                if (handleSubmit) handleSubmit();
                                handleClose();
                            }}>
                                {submit}
                            </button>
                        </div>
                    </div>
                </button>,
                document.body
            )}
        </>
    );
}

