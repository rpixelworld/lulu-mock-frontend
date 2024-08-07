import React, { useState, useEffect } from 'react';

const TaxCalculator = ({totalCost, province, onTaxAmountChange }) => {
    const [taxRate, setTaxRate] = useState(null);

    useEffect(() => {
        const fetchTaxRate = async () => {
            try {
                const response = await fetch(`http://localhost:3399/master/tax-rates/${province}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                console.log('API Response:', result); // Log response for debugging

                // Extract tax rate from the response. Assuming you want to use GST.
                const taxData = result.data;
                const Rate = taxData.gst + taxData.hst +taxData.pst

                setTaxRate(Rate);
            } catch (error) {
                console.error('Error fetching tax rate:', error);
            }
        };

        fetchTaxRate();
    }, [province]);

    useEffect(() => {
        if (taxRate !== null && !isNaN(totalCost)) {
            const calculatedTaxAmount = (totalCost * taxRate / 100).toFixed(2); // Assuming tax rate is a percentage
            onTaxAmountChange(parseFloat(calculatedTaxAmount));
        }
    }, [taxRate, totalCost, onTaxAmountChange]);

    return null; // No need to render anything, as the tax amount is handled in OrderSummary
};

export default TaxCalculator;


