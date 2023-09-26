require("dotenv").config();

const axios = require("axios");
const express = require("express");
const cors = require("cors");
const { urlencoded } = require("express");

const app = express();
app.set("view engine", "ejs");
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));
app.use(cors());

const port = process.env.PORT || 3000;
const baseUrl = "https://subtitlez-api.glitch.me";

app.get("/", async (req, res) => {
  try {
    axios.get(baseUrl).then((response) => {
      res.render("./pages/index", {
        title: "SubtitleZ - Where Language Meets Entertainment",
        section: response.data,
      });
    });
  } catch (err) {
    console.log(err);
  }
});

app.get(["/popular", "/popular/:cat"], async (req, res) => {
  try {
    let url = `${baseUrl}/popular`;

    if (req.params.cat === "movie") {
      url = `${baseUrl}/popular/movie`;
    } else if (req.params.cat === "series") {
      url = `${baseUrl}/popular/series`; 
    } else if (req.params.cat === "music") {
      url = `${baseUrl}/popular/music`;
    }

    axios.get(url).then((response) => {
      res.render("./pages/popular", {
        title: "SubtitleZ - Popular",
        section: response.data,
      });
    });
  } catch (err) {
    console.log(err);
  }
});

app.get(["/latest", "/latest/:cat"], async (req, res) => {
  try {
    let url = `${baseUrl}/latest`;

    if (req.params.cat === "movie") {
      url = `${baseUrl}/latest/movie`;
    } else if (req.params.cat === "series") {
      url = `${baseUrl}/latest/series`;
    } else if (req.params.cat === "music") {
      url = `${baseUrl}/latest/music`;
    }

    axios.get(url).then((response) => {
      res.render("./pages/latest", {
        title: "SubtitleZ - Latest",
        section: response.data,
      });
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/search", async (req, res) => {
  const query = req.query.q.replace(/\s/g, "%20");
  try {
    if (!query.length) {
      return res.redirect("/");
    }
    axios.get(`${baseUrl}/search?q=${query}`).then((response) => {
      if (!response.data.length) {
        return res.render("./pages/notfound", {
          title: "SubtitleZ - Search results for " + req.query.q,
          section: response.data,
          query: req.query.q,
          error: "No result found",
        });
      }
      res.render("./pages/search", {
        title: "SubtitleZ - Search results for " + req.query.q,
        section: response.data,
        query: req.query.q,
      });
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/subtitles/:id", async (req, res) => {
  try {
    axios.get(`${baseUrl}/subtitles/${req.params.id}`).then((response) => {
      res.render("./pages/subtitle", {
        title: "SubtitleZ - Subtitles for " + req.params.id,
        data: response.data,
      });
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/subtitles/:path/:lan/:id", async (req, res) => {
  try {
    axios
      .get(
        `${baseUrl}/subtitles/${req.params.path}/${req.params.lan}/${req.params.id}`
      )
      .then((response) => {
        res.render("./pages/download", {
          title: "SubtitleZ - Download Subtitle",
          lan: req.params.lan,
          data: response.data,
        });
      });
  } catch (err) {
    console.log(err);
  }
});

app.get("/aboutUs", async (req, res) => {
  try {
    res.render("./pages/aboutUs", {
      title: "SubtitleZ - About Us",
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/contactUs", async (req, res) => {
  try {
    res.render("./pages/contactUs", {
      title: "SubtitleZ - Contact Us",
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/privacyPolicy", async (req, res) => {
  try {
    res.render("./pages/privacyPolicy", {
      title: "SubtitleZ - Privacy Policy",
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/termsAndConditions", async (req, res) => {
  try {
    res.render("./pages/terms", {
      title: "SubtitleZ - Terms and Conditions",
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/req&report", async (req, res) => {
  try {
    res.render("./pages/req&report", {
      title: "SubtitleZ - Request or Report",
    });
  } catch (err) {
    console.log(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status === 500) {
    console.error("EJS template rendering error:", err);
    res.status(500).render("./pages/500", { title: 'SubtitleZ - 500', errorMessage: "Something went wrong" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).render('./pages/notfound', { title: 'SubtitleZ - 404', error: 'Page not found' });
  } else {
    next(err);
  }
});

// SERVER //

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
