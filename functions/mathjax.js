var mjAPI = require("mathjax-node");

mjAPI.config({
  MathJax: {},
});

mjAPI.start();

const renderSVG = (formula) => {
  return new Promise((resolve, reject) => {
    mjAPI.typeset(
      {
        math: formula,
        format: "TeX", // or "inline-TeX", "MathML"
        svg: true,
      },
      function (data) {
        if (!data.errors) {
          resolve(data.svg);
        }
      }
    );
  });
};

exports.handler = async function (event) {
  const { queryStringParameters, httpMethod } = event;
  if (
    httpMethod.toUpperCase() === "GET" &&
    queryStringParameters &&
    typeof queryStringParameters.tex === "string"
  ) {
    const formula = decodeURIComponent(queryStringParameters.tex);
    const svg = await renderSVG(formula);
    return {
      headers: {
        "content-type": "image/svg+xml",
      },
      statusCode: 200,
      body: svg,
    };
  }
};
