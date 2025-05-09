import * as React from "react";
import ReactDOM from "react-dom";

const Modal = ({
                setIsModal,
                children,
               }: {
    setIsModal: (value: boolean) => void;
    children: React.ReactNode;
}) => {
    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex flex-col justify-center items-center">
            <button
                className="absolute inset-0 z-10 bg-background-muted opacity-70 hover:cursor-pointer"
                onClick={() => {setIsModal(false);}}
            />
            <div className="bg-background-secondary w-[600px] h-[600px] rounded-2xl flex z-20 flex-col justify-start overflow-y-auto">
                {children}
            </div>

        </div>,
        document.getElementById("portal")!
    );
};

export default Modal;
