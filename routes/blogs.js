// Create a new file /validation/blogs.js. In /validation/blogs. js: OK
// Create a basic validator function for blogData and add that function to the module.exports
// In /routes/blogs.js:
// Import (require) the blogData validator function into /routes/blogs.js
// Create one POST route /blogs/create-one to create a new blog post
// Note: Do not forget to generated createdAt and lastModified in the new blog post

// Create one PUT route /blogs/update-one/:blog Title to update a blog post
// Both of the above routes should run validations on the incoming blog post body data BEFORE either creating a new blog post or updating a blog post. If the blog data is invalid, then a message should be sent in the http response indicating which validation failed and why
// Build out the blogData validator function to check for the following conditions
// Title, text and author are required fields and they should be strings
// Title and author should be no longer than 40 characters in length (letters + whitespace)

// o Stretch Goal:

// If category is defined and has a length greater than 0:
// There can be no more than 10 entries for category
// All the entries must be strings
// All categories must be in the following list of strings:
// "Lorem"
// "ipsum"
// "dolor"
// "sit"
// "amet"

const express = require('express');
const router = express.Router();

const { validateBlogData } = require("../validation/blogs");

const sampleBlogs = [
    {
        title: "dicta",
        text: "Iusto et in et. Nulla accusantium fugit. Et qui dolorem inventore soluta et veritatis. Aut ut aut non laudantium eveniet suscipit odit. Sapiente sint nihil nihil sit et molestias. In nisi omnis quas et sed aut minus aperiam ea.\n \rLaudantium quo quisquam quae. Et et quas officia perspiciatis iusto sunt sunt eaque. Quidem sit voluptas deserunt sequi magni.\n \rEst est facere cumque ipsam omnis animi. Voluptatem magnam officiis architecto possimus. Quia similique aut eos qui. Quasi quae sed aliquam.",
        author: "Darren Abbott",
        category: ["Lorem", "sit", "amet"],
        createdAt: "2022-03-22T10:36:37.176Z",
        lastModified: "2022-03-22T10:36:37.176Z",
    },
    {
        title: "ducimus",
        text: "Placeat ea et fuga. Qui itaque quibusdam nam. Maxime nobis quam. Et laudantium sunt incidunt reiciendis.\n \rEarum aut sed omnis autem aliquam architecto corporis sint. Nostrum cumque voluptatem aperiam alias similique. Tenetur et esse omnis praesentium ipsum alias. Impedit rerum qui quia quaerat architecto mollitia est autem. Qui blanditiis earum et qui dolorum reprehenderit. Debitis est temporibus.\n \rEt nam sed. Corporis ut rerum. Ut qui dolore est dolorem ex.",
        author: "Luke Rogahn PhD",
        category: ["Lorem", "ipsum"],
        createdAt: "2022-03-22T15:16:56.285Z",
        lastModified: "2022-03-22T15:16:56.285Z",
    },
    {
        title: "quod",
        text: "Accusamus nisi eos. Tenetur earum tenetur nemo. Qui voluptas temporibus repellendus maxime. Ipsum optio voluptate enim nihil. Ea et dolorem. Omnis unde perspiciatis.\n \rUt odio eaque. Harum non placeat. Eveniet molestiae in cupiditate dolor doloremque rerum eligendi aut ab.\n \rMolestias eligendi et. Nemo velit natus autem numquam atque provident et nulla. In et dolores ad nihil. Delectus quis doloremque asperiores similique. Asperiores id nam vitae nobis labore autem. Dolor aperiam provident quia consectetur aut ut.",
        author: "Maryann Schneider",
        category: ["Lorem", "ipsum", "dolor", "sit", "amet"],
        createdAt: "2022-03-21T20:09:32.298Z",
        lastModified: "2022-03-21T20:09:32.298Z",
    },
    {
        title: "ut",
        text: "Itaque necessitatibus repudiandae. Porro suscipit exercitationem qui atque. Perferendis suscipit debitis sint aut dignissimos nobis ut. Modi ea nihil est vel consequuntur voluptatem. In magnam delectus in eos reiciendis sit est enim eligendi. Sint dicta at.\n \rConsectetur aspernatur alias sed non explicabo blanditiis laborum fugit voluptate. Reiciendis iste aut sit natus qui et in ratione. Placeat qui in voluptatum autem nulla ratione. Commodi sit alias sint sapiente rem. Quia sapiente minus deleniti vitae.\n \rExercitationem numquam omnis maxime dolorum sed deserunt suscipit laudantium. Ad et autem voluptatem esse laudantium et. Id fuga accusamus est sapiente dicta.",
        author: "Dr. Lorenzo Anderson",
        category: ["ipsum", "dolor", "sit", "amet"],
        createdAt: "2022-03-21T23:07:53.447Z",
        lastModified: "2022-03-21T23:07:53.447Z",
    },
    {
        title: "id",
        text: "Porro officia aliquid fugiat sed reprehenderit illo amet doloribus sed. Molestiae vero et. Quae voluptates dolores. Voluptatem facere fuga. Veniam perferendis illo ut sunt earum deleniti.\n \rIusto neque dolorem esse error. Saepe et quia ut corrupti. Autem repellendus similique dolorem sunt in ipsa perferendis. Et excepturi ut voluptatem deserunt accusantium dolores aperiam cum ut.\n \rDoloremque expedita sit et voluptatem unde libero. Numquam beatae sed repellat iusto doloribus fugit tenetur. Possimus et ut adipisci harum voluptatem provident consequatur. Corporis quo aut vel itaque blanditiis illum.",
        author: "Bobbie Dach",
        category: ["amet"],
        createdAt: "2022-03-22T15:14:39.819Z",
        lastModified: "2022-03-22T15:14:39.819Z",
    },
];

// POST blog


router.post("/create-one", (req, res) => {

    //try block, for validation code
    try {
  
      // anticipate fields of our post request /create-one
      // parse out request data to local variables
      const title = req.body.title;
      const text = req.body.text;
      const author = req.body.author;
      const category = req.body.category;
  
      //create blogData object fields
      const blogData = {
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
        // res.json({
        //   success: false,
        //   message: blogDataCheck.message,
        // });
        // return;
      }
  
      sampleBlogs.push(blogData);
  
      console.log("blogList ", sampleBlogs);
  
      res.json({
        success: true,
      });
    } catch (e) {
          // In the catch block, we always want to do 2 things: console.log the error and respond with an error object
      console.log(e);
      res.json({
              success: false,
              error: String(e)
          });
    }
  });

  /* GET blogs listing. */

router.get('/', function (req, res, next) {
    res.send('blogs page');
});

router.get("/all", (req, res) => {
    res.json({
        success: true,
        sampleBlogs
    })
} )


router.get("/single/:titleToGet", ((req, res) => {

    const foundBlog = sampleBlogs.find ((blog) => {
        return blog.title === req.params.titleToGet;
    })

    res.json({
        success: true,
        foundBlog
    })
}))

// PUT = UPDATE

router.put("/update-one/:blogToUpdate", ((req, res) => {

    const blogToFind = req.params.blogToUpdate;

    const originalBlog = sampleBlogs.find((blog) => {
        return blog.title === blogToFind;
    })

    const originalBlogIndex = sampleBlogs.findIndex((blog) => {
        return blog.title === blogToFind;
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

    sampleBlogs[originalBlogIndex] = updatedBlog

    res.json({
        success: true,
    })

}))

router.delete("/delete/:titleToDelete", ((req, res) => {

    const blogToDelete = req.params.titleToDelete;
    const blogIndex = sampleBlogs.findIndex((blog) => {
        return blog.title === blogToDelete;
    })

    sampleBlogs.splice(blogIndex, 1);

    res.json({
        success: true
    })
}))


module.exports = router;
