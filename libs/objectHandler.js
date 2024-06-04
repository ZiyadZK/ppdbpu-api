exports.arrObj_countKey = (array, key, conditions = {}) => {
    return array.reduce((acc, obj) => {
        // Check if the object meets all the conditions
        const meetsConditions = Object.keys(conditions).every(conditionKey => obj[conditionKey] === conditions[conditionKey]);
        
        if (meetsConditions) {
            // Get the value of the key from the object
            const keyValue = obj[key];
            // If the keyValue is already a key in the accumulator object, increment its count
            if (acc[keyValue]) {
                acc[keyValue]++;
            } else {
                // Otherwise, initialize the key with a count of 1
                acc[keyValue] = 1;
            }
        }
        return acc;
    }, {}); // Start with an empty object as the accumulator
}