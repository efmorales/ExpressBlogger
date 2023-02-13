const { v4: uuidv4 } = require("uuid");
uuidv4();
const express = require('express');
const router = express.Router();

//instantiate mongodb 
const { db } = require('../mongo');

const { validateBlogData } = require("../validation/blogs");

/* GET blogs listing. */
router.get('/', async function(req, res, next) {
    const blogs = await db()
    .collection('sample_blogs')
    .find({})
    .limit(15)
    .toArray(function(err, result){
        if (err) {
          res.status(400).send("error fetching blogs")
        } else {
          res.json(result);
        }
      }); 
  
      res.json({
        sucess:true,
        blogs: blogs
      });
  
      
  }); 

// Post ("create-one") a new blog

router.post("/create-one", async (req, res) => {

    //try block, for validation code
    try {

        // anticipate fields of our post request /create-one
        // parse out request data to local variables
        const id = uuidv4();
        const title = req.body.title;
        const text = req.body.text;
        const author = req.body.author;
        const category = req.body.category;

        //create blogData object fields
        const blogData = {
            id,
            title,
            text,
            author,
            category,
            createdAt: new Date(),
            lastModified: new Date(),
        };

        //pass blog data object to our validate function
        const blogDataCheck = validateBlogData(blogData);

        if (blogDataCheck.isValid === false) {
            throw Error(blogDataCheck.message)
        }

        const insertResponse = await db()
        .collection('sample_blogs')
        .insertOne(blogData)

        console.log("blogList ", blogData);

        res.status(200);
        res.json({
            success: true,
        });
    } catch (e) {
        // In the catch block, we always want to do 2 things: console.log the error and respond with an error object
        console.log(e);
        res.json({
            success: false,
            error: String(e)
        }).status(500);
    }
});

// get just one post from all the db posts

router.get("/get-one", async (req, res) => {
    try {
        const foundBlog = await db()
        .collection('sample_blogs')
        .find({})
        .limit(1)
        .toArray(function(err, result){
            if (err) {
                res.status(400).send("error fetching blogs")
            } else {
                res.json(result);
            }
        });

        if (!foundBlog) {
            res.json({
                success: false,
                message: "Could not find blog in the list"
            })
            return
        }

        res.json({
            success: true,
            foundBlog
        }).status(200);
    }

    catch (e) {
        console.log(e);
        res.json({
            success: false,
            error: String(e)
        }).status(500);
    }
})


// get one blog by title ("/single/:titleToGet")

router.get("/get-one/:titleToGet", async (req, res) => {

    try {

        const blogToFind = req.params.titleToGet;

        const foundBlog = await db()
        .collection('sample_blogs')
        .findOne({
            title: blogToFind
        })

        if (!foundBlog) {
            res.json({
                success: false,
                message: "Could not find blog in the list"
            })
            return
        }

        res.json({
            success: true,
            foundBlog
        }).status(200);
    }

    catch (e) {
        console.log(e);
        res.json({
            success: false,
            error: String(e)
        }).status(500);
    }
})

// router.get("/single/:titleToGet", ((req, res) => {

//     const foundBlog = sampleBlogs.find((blog) => {
//         return blog.title === req.params.titleToGet;
//     })

//     res.json({
//         success: true,
//         foundBlog
//     }).status(200);
// }))

// PUT = UPDATE

// update one blog by title ("/update-one/:blogToUpdate")

router.put("/update-one/:blogToUpdate", async (req, res) => {

    try {

        const blogToFind = req.params.blogToUpdate;

        const originalBlog = await db()
        .collection('sample_blogs')
        .findOne({
            title: blogToFind
        })

        if (!originalBlog) {
            res.json({
                success: false,
                message: "Could not find blog in the list"
            })
            return
        }

        const updatedBlog = {}

        if (req.body.title !== undefined) {
            updatedBlog.title = req.body.title
        } else {
            updatedBlog.title = originalBlog.title
        }

        if (req.body.text !== undefined) {
            updatedBlog.text = req.body.text
        } else {
            updatedBlog.text = originalBlog.text
        }

        if (req.body.author !== undefined) {
            updatedBlog.author = req.body.author
        } else {
            updatedBlog.author = originalBlog.author
        }

        if (req.body.category !== undefined) {
            updatedBlog.category = req.body.category
        } else {
            updatedBlog.category = originalBlog.category
        }

        updatedBlog.createdAt = new Date();
        updatedBlog.lastModified = new Date();

        const updateResponse = await db()
        .collection('sample_blogs')
        .updateOne({
            title: blogToFind
        }, {
            $set: updatedBlog
        })

        res.json({
            success: true,
            updatedBlog
        }).status(200);
    }

    catch (e) {
        console.log(e);
        res.json({
            success: false,
            error: String(e)
        }).status(500);
    }
})

// router.put("/update-one/:blogToUpdate", ((req, res) => {

//     try {

//         const blogToFind = req.params.blogToUpdate;

//         const originalBlog = sampleBlogs.find((blog) => {
//             return blog.title === blogToFind;
//         })

//         const originalBlogIndex = sampleBlogs.findIndex((blog) => {
//             return blog.title === blogToFind;
//         })

//         if (!originalBlog) {
//             res.json({
//                 success: false,
//                 message: "Could not find blog in the list"
//             })
//             return
//         }

//         const updatedBlog = {}

//         if (req.body.title !== undefined) {
//             updatedBlog.title = req.body.title
//         } else {
//             updatedBlog.title = originalBlog.title
//         }

//         if (req.body.text !== undefined) {
//             updatedBlog.text = req.body.text
//         } else {
//             updatedBlog.text = originalBlog.text
//         }

//         if (req.body.author !== undefined) {
//             updatedBlog.author = req.body.author
//         } else {
//             updatedBlog.author = originalBlog.author
//         }

//         if (req.body.category !== undefined) {
//             updatedBlog.category = req.body.category
//         } else {
//             updatedBlog.category = originalBlog.category
//         }

//         updatedBlog.createdAt = new Date();
//         updatedBlog.lastModified = new Date();

//         //pass blog data object to our validate function
//         const blogDataCheck = validateBlogData(updatedBlog);

//         if (blogDataCheck.isValid === false) {
//             throw Error(blogDataCheck.message)

//         }

//         sampleBlogs[originalBlogIndex] = updatedBlog

//         res.json({
//             success: true,
//         }).status(200)
//     } catch (e) {
//         // In the catch block, we always want to do 2 things: console.log the error and respond with an error object
//         console.log(e);
//         res.json({
//             success: false,
//             error: String(e)
//         }).status(500);
//     }

// }))

// DELETE

router.delete("/delete/:titleToDelete", async (req, res) => {

    try {

        const blogToDelete = req.params.titleToDelete;

        const deleteResponse = await db()
        .collection('sample_blogs')
        .deleteOne({
            title: blogToDelete
        })

        res.json({
            success: true
        }).status(200)
    }

    catch (e) {
        console.log(e);
        res.json({
            success: false,
            error: String(e)
        }).status(500);
    }
})

// /get-multi/ (GET): get multiple sorted results

router.get("/get-multi", async (req, res) => {

    try {

        const sort = req.query.sort;
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);

        const blogs = await db()
        .collection('sample_blogs')
        .find({})
        .sort({
            [sort]: -1
        })
        .limit(limit)
        .skip(skip)
        .toArray()

        res.json({
            success: true,
            blogs
        }).status(200);
    }

    catch (e) {
        console.log(e);
        res.json({
            success: false,
            error: String(e)
        }).status(500);
    }
})

// multiple delete route

router.delete("/delete-multi", async (req, res) => {

    try {

        const blogsToDelete = req.body.blogsToDelete;

        const deleteResponse = await db()
        .collection('sample_blogs')
        .deleteMany({
            title: {
                $in: blogsToDelete
            }
        })

        res.json({
            success: true
        }).status(200)
    }

    catch (e) {
        console.log(e);
        res.json({
            success: false,
            error: String(e)
        }).status(500);
    }
})


// router.delete("/delete/:titleToDelete", ((req, res) => {

//     const blogToDelete = req.params.titleToDelete;
//     const blogIndex = sampleBlogs.findIndex((blog) => {
//         return blog.title === blogToDelete;
//     })

//     sampleBlogs.splice(blogIndex, 1);

//     res.json({
//         success: true
//     }).status(200)
// }))


module.exports = router;
