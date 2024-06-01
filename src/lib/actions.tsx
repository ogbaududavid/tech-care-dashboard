/**
 * Fetches the list of patients from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of patient data.
 */
export const getPatients = () => {
    try {
        const result =  require("./patients_data.json")

        if (!result) {
            throw new Error(`Request was not successful`);
        }

        if (result) {
            return result;
        }

    } catch (e) {
        console.error(e);
    }
};

export const getSearchedPatients = (searchParam: string) => {
    try {
        const result = getPatients();
        if (result) {
            const matchedResult = result.filter((patient: any) => {
                // Use return to indicate whether the patient includes the searchParam
                return patient.name.toLowerCase().includes(searchParam.toLowerCase());
            });
            return matchedResult
            // setPatientsData(matchedResult)
        }
    } catch (e) {
        console.error(e);
    }
};

/**
 * Fetches the details of a specific patient by name.
 * @param {string} pName - The name of the patient to fetch.
 * @returns {Promise<Object>} A promise that resolves to the matched patient's data.
 */
export const getPatient = (pName: string) => {
    try{
        const results =  getPatients();
        const matchedPatient = results.find((result: any) => {
            const matchedName = result.name
            const searchedName = pName
            return searchedName === matchedName
        })
        if (matchedPatient){
            return matchedPatient
        }
    } catch (e) {
        console.error(e)
    }
}

/**
 * Fetches the diagnosis data for a specific patient and date.
 * @param {string} pName - The name of the patient.
 * @param {string} date - The date of the diagnosis to fetch.
 * @returns {Promise<Object>} A promise that resolves to the diagnosis data for the specified date.
 */
export const getDiagnosisForSelectedDate = (pName: string, date: string) => {
    try{
        const result =  getPatient(pName);
        const matchedDiagnosis = result.diagnosis_history.find((diagnosis:any) => {
                const month = diagnosis.month.substring(0,3);
                const year = diagnosis.year;
                const dateValue = date;
                return `${month} ${year}`=== dateValue 
        })
        if (matchedDiagnosis){
            const neededData = {
            heart_rate: matchedDiagnosis.heart_rate.value, 
            heart_level: matchedDiagnosis.heart_rate.levels,
            temperature: matchedDiagnosis.temperature.value,
            temperature_level: matchedDiagnosis.temperature.levels,
            respiratory_rate: matchedDiagnosis.respiratory_rate.value,
            respiratory_level: matchedDiagnosis.respiratory_rate.levels,
            diastolic: matchedDiagnosis.blood_pressure.diastolic.value,  
            diastolic_level:matchedDiagnosis.blood_pressure.diastolic.levels,
            systolic: matchedDiagnosis.blood_pressure.systolic.value,
            systolic_level: matchedDiagnosis.blood_pressure.diastolic.levels    
            }
            return (neededData)
        }
    } catch (e) {
        console.error(e)
    }

}