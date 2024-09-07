import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomDatePickerProps {
    deliveryDate: Date;
    deliveryBy: string;
    setDeliveryBy: (date: Date | null) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ deliveryBy, setDeliveryBy, deliveryDate }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDateSelect = (date: Date | null) => {
        setDeliveryBy(date); 
        setIsOpen(false); 
    };

    return (
        <div style={{ position: "relative" }}>
            <p
                className="text-smTolg font-ibm font-[400] text-[#a4a4a4] cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                EDD: {deliveryBy}
            </p>
            {isOpen && (
                <div
                    style={{
                        position: "absolute",
                        zIndex: 1000, 
                        backgroundColor: "white", 
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
                    }}
                >
                    <DatePicker
                        selected={deliveryDate}
                        onChange={handleDateSelect}
                        onClickOutside={() => setIsOpen(false)} // Close when clicking outside
                        inline
                    />
                </div>
            )}
        </div>
    );
};

export default CustomDatePicker;
