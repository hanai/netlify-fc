var mjAPI = require("mathjax-node");

mjAPI.config({
  MathJax: {
  }
});

mjAPI.start();

const renderSVG = (formula) => {
  return new Promise((resolve, reject) => {
    mjAPI.typeset({
      math: formula,
      format: "TeX", // or "inline-TeX", "MathML"
      svg: true,
    }, function (data) {
      if (!data.errors) {
        resolve(data.svg);
      }
    });
  });
}

exports.handler = async function (event) {
  const svg = await renderSVG('E = mc^2');
  return {
    statusCode: 200,
    body: svg
  };
};


