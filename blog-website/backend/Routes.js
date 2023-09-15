const express = require("express");
const router = express.Router();
const userModel = require("./models/user");
const blogModel = require("./models/blog");
const multer = require("multer");
const fs = require("fs");

router.post("/user", (req, res) => {
  console.log(req.body);
  const { email, username, password } = req.body;

  const newUser = new userModel({
    email: email,
    username: username,
    password: password,
  });

  newUser
    .save()
    .then((user) => {
      res.json(user);
      console.log("new user added", user);
    })
    .catch((err) => {
      res.status(404).json(err);
      console.log(err);
    });
});

router.get("/user", (req, res) => {
  console.log("request received");
  userModel
    .find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("file");

router.post("/new-post", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log("some error while uploading", err);
    } else {
      console.log("blog creation request ");
      // console.log(req.file);
      if (req.file === undefined) {
        console.log("its empty");
      }
      const { originalname, mimetype, path } = req.file;

      const { title, summary, content, buffer, author, uid } = req.body;
      const timestamp = Date.now();
      const time = new Date(timestamp);

      const options = {
        timeZone: "Asia/Kolkata",
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      const dateString = time.toLocaleString("en-US", options);
      const ext = mimetype.split("/")[1];
      // console.log(req.file)
      // console.log('this is the orignal name',originalname)
      // console.log('this is the path added inside the blog',path+''+ext);
      const first = path.split(".")[0];
      const newBlog = new blogModel({
        title: title,
        summary: summary,
        content: content,
        file: {
          contentType: mimetype,
          data: buffer,
        },
        time: dateString,
        author: author,
        path: first + "." + ext,
        uid: uid,
      });

      const fileData = Buffer.from(buffer, "base64");

      // console.log(ext);

      console.log("this is the first part of the image", first);
      fs.writeFile(`${first}.` + ext, fileData, (err) => {
        if (err) {
          console.log(
            "there was some error while saving the uploaded file",
            err
          );
        } else {
          console.log("uploaded file saved successfully");
        }
      });

      newBlog
        .save()
        .then((blog) => {
          res.status(200).json(blog);
          const x = {
            ...blog,
            file: {
              data: "",
            },
          };
          console.log("blog saved", x);
        })
        .catch((err) => {
          console.log("there was some error while posting the blog", err);
          res.status(404).json(err)
        });
    }
  });
});

router.get("/blogs", (req, res) => {
  console.log("inside the get blogs request ");
  blogModel
    .find()
    .then((result) => {
      // console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

router.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  blogModel
    .findById(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.put("/edit/:id", (req, res) => {
  const id = req.params.id;
  console.log({...req.bdoy})
console.log('inside the update request')
  upload(req, res, (err) => {
    if (err) {
      console.log("some error while uploading", err);
    } else {
      let newFile = null;
      let originalname = "";
      let mimetype = "";
      let path = "";
      if (req.file) {
        originalname = req.file.originalname;
        mimetype = req.file.mimetype;
        path = req.file.path;
      }

      // const Mainpath = first + '.' + ext;
      const { title, summary, content, buffer, author, uid } = req.body;
      // console.log(title,summary,content)
      const timestamp = Date.now();
      const time = new Date(timestamp);

      const options = {
        timeZone: "Asia/Kolkata",
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      const dateString = time.toLocaleString("en-US", options);
      if (req.file && buffer) {
        console.log('inside the request to update photo');
        const ext = mimetype.split("/")[1];
        const first = path.split(".")[0];
        console.log(first+'.'+ext);
        console.log(mimetype);
        const fileData = Buffer.from(buffer, "base64");
        fs.writeFile(`${first}.` + ext, fileData, (err) => {
          if (err) {
            console.log(
              "there was some error while saving the uploaded file",
              err
            );
          } else {
            console.log("uploaded file saved successfully");
          }
        });

        blogModel.findById(id).then((result) => {
          result.updateOne({
            data: {
              contentType: mimetype,
              data: buffer,
            },
            path: first + "."+ext,
          }).then((res)=>{
            console.log('updated photo', res);
          }).catch((err)=>{
            console.log('some error while updating photo',err);
          });
        })
      }
console.log('updating main');
      blogModel.findById(id).then((result) => {
        // console.log('result fetched to update',result);
        result.updateOne({
          title: title,
          summary: summary,
          content: content,
          author: author,
          uid: uid,
          time: dateString,
        }).then((res)=>{
          // console.log('updated ,',res);
        }).catch((err)=>{
          console.log('there was some error',err);
        });
      });
    }
  });
});
module.exports = router;
