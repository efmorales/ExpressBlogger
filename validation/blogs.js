
// Note: If we have a function, we want to return similar values for all possible return cases.
const validateBlogData = (blogData) => {


	if (blogData.title === undefined || typeof(blogData.title) !== "string") {
		// email is required and it must be a string
		return {
			isValid: false,
			message: "Title is required, it must be a string and less than 40 characters"
		}
	}

	if (blogData.text === undefined || typeof(blogData.text) !== "string") {
		// text is required and it must be a string
		return {
			isValid: false,
			message: "Text is required, it must be a string and less than 40 characters"
		}
	}

	if (blogData.author === undefined || typeof(blogData.author) !== "string") {
		// author is required and it must be a string
		return {
			isValid: false,
			message: "Author is required and it must be a string"
		}
	}

	if (blogData.category === undefined || !Array.isArray(blogData.category) || blogData.category.length === 0) {
		// category is required and it must be a string
		return {
			isValid: false,
			message: "Category must be an array and must have length"
		}
	}

    const nonStringCategories = blogData.category.filter((cat) => {
        if (typeof (cat) !== "string") {
            return true;
        } else {
            return false;
        }
    })

    console.log("nonStringCategories", nonStringCategories);

    if (nonStringCategories.length > 0) {
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
	// validateblogData: validateUserData
	validateBlogData,
}