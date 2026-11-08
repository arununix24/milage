document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements for Efficiency Calculator
    const distanceInput = document.getElementById('distance');
    const fuelInput = document.getElementById('fuel');
    const efficiencyFuelPriceInput = document.getElementById('efficiency-fuel-price');
    const distanceUnitSelect = document.getElementById('distance-unit');
    const fuelUnitSelect = document.getElementById('fuel-unit');
    const efficiencyPriceUnitSelect = document.getElementById('efficiency-price-unit');
    const efficiencyCurrencySelect = document.getElementById('efficiency-currency');
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');
    const errorMessage = document.getElementById('error-message');
    const resultContainer = document.getElementById('result-container');
    const resultDisplay = document.getElementById('result');
    const resultUnit = document.getElementById('result-unit');
    const resultExplanation = document.getElementById('result-explanation');
    const efficiencyCostDisplay = document.getElementById('efficiency-cost');
    const efficiencyCurrencySymbol = document.getElementById('efficiency-currency-symbol');
    const costResultItem = document.getElementById('cost-result-item');

    // Get DOM elements for Trip Planner
    const tripDistanceInput = document.getElementById('trip-distance');
    const vehicleEfficiencyInput = document.getElementById('vehicle-efficiency');
    const fuelPriceInput = document.getElementById('fuel-price');
    const tripDistanceUnitSelect = document.getElementById('trip-distance-unit');
    const efficiencyUnitSelect = document.getElementById('efficiency-unit');
    const priceUnitSelect = document.getElementById('price-unit');
    const tripCurrencySelect = document.getElementById('trip-currency');
    const calculateTripBtn = document.getElementById('calculate-trip-btn');
    const resetTripBtn = document.getElementById('reset-trip-btn');
    const tripErrorMessage = document.getElementById('trip-error-message');
    const tripResultContainer = document.getElementById('trip-result-container');
    const fuelRequiredDisplay = document.getElementById('fuel-required');
    const fuelRequiredUnit = document.getElementById('fuel-required-unit');
    const fuelCostDisplay = document.getElementById('fuel-cost');
    const tripCurrencySymbol = document.getElementById('trip-currency-symbol');
    const tripExplanation = document.getElementById('trip-explanation');

    // Get elements for tab navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Currency symbols mapping
    const currencySymbols = {
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'JPY': '¥',
        'INR': '₹',
        'CAD': 'C$',
        'AUD': 'A$'
    };

    // Add event listeners for Efficiency Calculator
    calculateBtn.addEventListener('click', calculateMileage);
    resetBtn.addEventListener('click', resetCalculator);
    distanceUnitSelect.addEventListener('change', updateResultUnit);
    fuelUnitSelect.addEventListener('change', updateResultUnit);
    efficiencyCurrencySelect.addEventListener('change', updateCurrencySymbol);

    // Add event listeners for Trip Planner
    calculateTripBtn.addEventListener('click', calculateTrip);
    resetTripBtn.addEventListener('click', resetTripCalculator);
    tripDistanceUnitSelect.addEventListener('change', updateTripUnits);
    efficiencyUnitSelect.addEventListener('change', updateTripUnits);
    priceUnitSelect.addEventListener('change', updateTripUnits);
    tripCurrencySelect.addEventListener('change', updateTripCurrencySymbol);

    // Add event listeners for tab navigation
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Initial setup
    updateResultUnit();
    updateTripUnits();
    updateCurrencySymbol();
    updateTripCurrencySymbol();

    /**
     * Calculate fuel efficiency based on input values
     */
    function calculateMileage() {
        // Reset error state
        errorMessage.style.display = 'none';
        
        // Get input values
        const distance = parseFloat(distanceInput.value);
        const fuel = parseFloat(fuelInput.value);
        const fuelPrice = parseFloat(efficiencyFuelPriceInput.value);
        const distanceUnit = distanceUnitSelect.value;
        const fuelUnit = fuelUnitSelect.value;
        const priceUnit = efficiencyPriceUnitSelect.value;
        const currency = efficiencyCurrencySelect.value;

        // Validate inputs
        if (isNaN(distance) || isNaN(fuel)) {
            showError('Please enter valid numbers for both distance and fuel.');
            return;
        }

        if (distance <= 0 || fuel <= 0) {
            showError('Both distance and fuel values must be greater than zero.');
            return;
        }

        // Calculate mileage based on selected units
        let mileage;
        let totalCost = null;
        let explanation;

        if (distanceUnit === 'kilometers' && fuelUnit === 'liters') {
            mileage = distance / fuel;
            explanation = `Your vehicle traveled ${distance} kilometers using ${fuel} liters of fuel.`;
        } else if (distanceUnit === 'miles' && fuelUnit === 'gallons') {
            mileage = distance / fuel;
            explanation = `Your vehicle traveled ${distance} miles using ${fuel} gallons of fuel.`;
        } else if (distanceUnit === 'kilometers' && fuelUnit === 'gallons') {
            // Convert to km/l for consistency
            mileage = distance / (fuel * 3.78541);
            explanation = `Your vehicle traveled ${distance} kilometers using ${fuel} gallons of fuel.`;
        } else if (distanceUnit === 'miles' && fuelUnit === 'liters') {
            // Convert to mpg for consistency
            mileage = (distance * 0.621371) / (fuel * 0.264172);
            explanation = `Your vehicle traveled ${distance} miles using ${fuel} liters of fuel.`;
        }

        // Calculate cost if fuel price is provided
        if (!isNaN(fuelPrice) && fuelPrice > 0) {
            // Check if the fuel unit matches the price unit
            if (fuelUnit === 'liters' && priceUnit === 'gallon') {
                // Convert fuel to gallons for cost calculation
                totalCost = (fuel * 0.264172) * fuelPrice;
            } else if (fuelUnit === 'gallons' && priceUnit === 'liter') {
                // Convert fuel to liters for cost calculation
                totalCost = (fuel * 3.78541) * fuelPrice;
            } else {
                // Units match, straight calculation
                totalCost = fuel * fuelPrice;
            }

            // Add cost information to explanation
            const currencySymbol = currencySymbols[currency] || '$';
            explanation += ` The total fuel cost is ${currencySymbol}${totalCost.toFixed(2)}.`;
            
            // Show cost result item
            costResultItem.classList.remove('hidden');
            efficiencyCostDisplay.textContent = totalCost.toFixed(2);
        } else {
            // Hide cost result item if no price provided
            costResultItem.classList.add('hidden');
        }

        // Display result
        resultDisplay.textContent = mileage.toFixed(2);
        resultExplanation.textContent = explanation;
        resultContainer.style.display = 'block';
    }

    /**
     * Calculate trip fuel requirements and cost
     */
    function calculateTrip() {
        // Reset error state
        tripErrorMessage.style.display = 'none';
        
        // Get input values
        const tripDistance = parseFloat(tripDistanceInput.value);
        const vehicleEfficiency = parseFloat(vehicleEfficiencyInput.value);
        const fuelPrice = parseFloat(fuelPriceInput.value);
        const distanceUnit = tripDistanceUnitSelect.value;
        const efficiencyUnit = efficiencyUnitSelect.value;
        const priceUnit = priceUnitSelect.value;
        const currency = tripCurrencySelect.value;

        // Validate inputs
        if (isNaN(tripDistance) || isNaN(vehicleEfficiency) || isNaN(fuelPrice)) {
            showTripError('Please enter valid numbers for all fields.');
            return;
        }

        if (tripDistance <= 0 || vehicleEfficiency <= 0 || fuelPrice <= 0) {
            showTripError('All values must be greater than zero.');
            return;
        }

        // Calculate fuel required and cost based on selected units
        let fuelRequired, totalCost, fuelUnitText;

        // Standardize calculations based on unit combinations
        if (distanceUnit === 'kilometers' && efficiencyUnit === 'km/l') {
            fuelRequired = tripDistance / vehicleEfficiency;
            fuelUnitText = priceUnit === 'liter' ? 'liters' : 'gallons';
            
            // Convert if price unit differs from efficiency unit
            if (priceUnit === 'gallon') {
                fuelRequired = fuelRequired * 0.264172; // Convert liters to gallons
            }
        } 
        else if (distanceUnit === 'miles' && efficiencyUnit === 'mpg') {
            fuelRequired = tripDistance / vehicleEfficiency;
            fuelUnitText = priceUnit === 'liter' ? 'liters' : 'gallons';
            
            // Convert if price unit differs from efficiency unit
            if (priceUnit === 'liter') {
                fuelRequired = fuelRequired * 3.78541; // Convert gallons to liters
            }
        }
        else if (distanceUnit === 'kilometers' && efficiencyUnit === 'mpg') {
            // Convert km to miles for calculation
            const distanceInMiles = tripDistance * 0.621371;
            fuelRequired = distanceInMiles / vehicleEfficiency;
            
            if (priceUnit === 'liter') {
                fuelRequired = fuelRequired * 3.78541; // Convert gallons to liters
                fuelUnitText = 'liters';
            } else {
                fuelUnitText = 'gallons';
            }
        }
        else if (distanceUnit === 'miles' && efficiencyUnit === 'km/l') {
            // Convert miles to km for calculation
            const distanceInKm = tripDistance * 1.60934;
            fuelRequired = distanceInKm / vehicleEfficiency;
            
            if (priceUnit === 'gallon') {
                fuelRequired = fuelRequired * 0.264172; // Convert liters to gallons
                fuelUnitText = 'gallons';
            } else {
                fuelUnitText = 'liters';
            }
        }

        // Calculate cost
        totalCost = fuelRequired * fuelPrice;

        // Display results
        fuelRequiredDisplay.textContent = fuelRequired.toFixed(2);
        fuelRequiredUnit.textContent = fuelUnitText;
        fuelCostDisplay.textContent = totalCost.toFixed(2);
        
        // Get currency symbol
        const currencySymbol = currencySymbols[currency] || '$';
        
        // Generate explanation
        const efficiencyText = `${vehicleEfficiency} ${efficiencyUnit}`;
        const distanceText = `${tripDistance} ${distanceUnit}`;
        const fuelText = `${fuelRequired.toFixed(2)} ${fuelUnitText}`;
        const costText = `${currencySymbol}${totalCost.toFixed(2)}`;
        
        tripExplanation.textContent = `For a trip of ${distanceText} with a vehicle efficiency of ${efficiencyText}, you'll need approximately ${fuelText} of fuel, costing around ${costText}.`;
        
        tripResultContainer.style.display = 'block';
    }

    /**
     * Show error message for efficiency calculator
     */
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        resultContainer.style.display = 'none';
    }

    /**
     * Show error message for trip planner
     */
    function showTripError(message) {
        tripErrorMessage.textContent = message;
        tripErrorMessage.style.display = 'block';
        tripResultContainer.style.display = 'none';
    }

    /**
     * Reset calculator form and results
     */
    function resetCalculator() {
        distanceInput.value = '';
        fuelInput.value = '';
        efficiencyFuelPriceInput.value = '';
        errorMessage.style.display = 'none';
        resultContainer.style.display = 'none';
        distanceUnitSelect.selectedIndex = 0;
        fuelUnitSelect.selectedIndex = 0;
        efficiencyPriceUnitSelect.selectedIndex = 0;
        efficiencyCurrencySelect.selectedIndex = 0;
        updateResultUnit();
        updateCurrencySymbol();
    }

    /**
     * Reset trip calculator form and results
     */
    function resetTripCalculator() {
        tripDistanceInput.value = '';
        vehicleEfficiencyInput.value = '';
        fuelPriceInput.value = '';
        tripErrorMessage.style.display = 'none';
        tripResultContainer.style.display = 'none';
        tripDistanceUnitSelect.selectedIndex = 0;
        efficiencyUnitSelect.selectedIndex = 0;
        priceUnitSelect.selectedIndex = 0;
        tripCurrencySelect.selectedIndex = 0;
        updateTripUnits();
        updateTripCurrencySymbol();
    }

    /**
     * Update the result unit based on the selected distance and fuel units
     */
    function updateResultUnit() {
        const distanceUnit = distanceUnitSelect.value;
        const fuelUnit = fuelUnitSelect.value;

        if (distanceUnit === 'kilometers' && fuelUnit === 'liters') {
            resultUnit.textContent = 'km/l';
        } else if (distanceUnit === 'miles' && fuelUnit === 'gallons') {
            resultUnit.textContent = 'mpg';
        } else if (distanceUnit === 'kilometers' && fuelUnit === 'gallons') {
            resultUnit.textContent = 'km/l';
        } else if (distanceUnit === 'miles' && fuelUnit === 'liters') {
            resultUnit.textContent = 'mpg';
        }
    }

    /**
     * Update trip units based on selected options
     */
    function updateTripUnits() {
        const priceUnit = priceUnitSelect.value;
        fuelRequiredUnit.textContent = priceUnit === 'liter' ? 'liters' : 'gallons';
    }
    
    /**
     * Update currency symbol for efficiency calculator
     */
    function updateCurrencySymbol() {
        const currency = efficiencyCurrencySelect.value;
        efficiencyCurrencySymbol.textContent = currencySymbols[currency] || '$';
    }
    
    /**
     * Update currency symbol for trip planner
     */
    function updateTripCurrencySymbol() {
        const currency = tripCurrencySelect.value;
        tripCurrencySymbol.textContent = currencySymbols[currency] || '$';
    }
}); 