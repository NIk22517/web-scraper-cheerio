const axios = require("axios");
const cheerio = require("cheerio");

const data = axios("https://mangareader.to/jujutsu-kaisen-168")
  .then((res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    const article = [];
    $("#wrapper", html).each(function () {
      const title = $(this).find(".anisc-detail").find(".manga-name").text();
      const poster = $(this).find(".manga-poster").find("img").attr("src");
      const type = $(this)
        .find(".anisc-info")
        .find(".item")
        .text()
        .replace(/\n/g, "");
      const description = $(this)
        .find(".description")
        .text()
        .replace(/\n/g, "");
      const characterImage = $(this)
        .find(".block_area-characters")
        .find(".cl-item")
        .find("img")
        .attr("src");
      const characterName = $(this)
        .find(".cli-info")
        .find(".cl-name")
        .text()
        .replace(/\n/g, "");
      const chapterList = $(this)
        .find(".chapters-list-ul")
        .find("ul")
        .find("li")
        .find("a")
        .text()
        .replace(/\n/g, "");
      article.push({
        title,
        poster,
        type,
        description,
        characterImage,
        characterName,
        chapterList,
      });
    });
    console.log(article);
  })
  .catch((err) => console.log(err));
