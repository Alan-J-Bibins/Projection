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

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <button onClick={handleOpen} className="cursor-pointer">
                {trigger}
            </button>

            {mounted && isOpen && createPortal(
                <button
                    onClick={handleClose}
                    className="motion-preset-focus-md bg-black/20 backdrop-blur-sm fixed inset-0 w-full h-full z-50 flex justify-center items-center"
                >
                    <div
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                            if(event.key === 'Escape'){
                                handleClose();
                            }
                        }}
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        className="relative flex flex-col items-center justify-center bg-gradient-to-t from-background/80 to-background/20 border border-primary p-4 rounded-2xl 
                        shadow-lg max-w-md w-full m-4 overflow-y-auto">
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

