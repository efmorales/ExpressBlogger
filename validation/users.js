
// Note: If we have a function, we want to return similar values for all possible return cases.
const validateUserData = (userData) => {

	/* // EXAMPLE of .filter()
	const array = ["string", 2, true, "other string"]
	const filteredArray = array.filter((arrayItem)=>{
		// .filter() will loop through an array we provide and will only return items that match true for the condition that we define
		// For .filter() the return value must be a boolean and should be true for items that we want to keep
		if (typeof(arrayItem) === 'string') {
			return true;
		} else {
			return false;
		}
	})
	console.log("array ", array)
	console.log("filteredArray ", filteredArray) */

	if (userData.email === undefined || typeof(userData.email) !== "string") {
		// email is required and it must be a string
		return {
			isValid: false,
			message: "Email is required and it must be a string"
		}
	}

	if (userData.firstName === undefined || typeof(userData.firstName) !== "string") {
		// firstName is required and it must be a string
		return {
			isValid: false,
			message: "First name is required and it must be a string"
		}
	}

	if (userData.lastName === undefined || typeof(userData.lastName) !== "string") {
		// lastName is required and it must be a string
		return {
			isValid: false,
			message: "Last name is required and it must be a string"
		}
	}

	if (userData.age !== undefined && typeof(userData.age) !== "number") {
		// age is NOT required, so first we check to see if it even exists before checking to see if the type is anything except 'number'
		return {
			isValid: false,
			message: "Age must be a number"
		}
	}

	// Since all array's in JS are objects behind the scenes, typeof(array) will return 'object'. So in order to verify that the variable is actually an array, we have to do the Array.isArray() check.
	if (userData.favoriteFoods === undefined || !Array.isArray(userData.favoriteFoods) || userData.favoriteFoods.length === 0) {
		return {
			isValid: false,
			message: "favorite foods must be an array and must have length"
		}
	}

	// We are going to use .filter() to iterate through favoriteFoods and will only bring through values that are NOT strings. Then we will check if the resultant array has any length, in which case we know there are non-string values in the array.
	const nonStringFoods = userData.favoriteFoods.filter((favoriteFood)=>{

		// If the callback function in .filter() returns true, then the item will be kept in the resultant array. If the callback returns false, the item will be filtered out
		if (typeof(favoriteFood) !== 'string') {
			return true
		} else {
			return false
		}
	})

	console.log("nonStringFoods ", nonStringFoods)

	if (nonStringFoods.length > 0) {
		return {
			isValid: false,
			message: "favorite foods must be an array of strings"
		}
	}

	return {
		isValid: true
	}
}

module.exports = {
	// These two lines are equivalent because the variable name and the key for the object are the same name. Typically, we write the short-hand version.
	// validateUserData: validateUserData
	validateUserData,
}
