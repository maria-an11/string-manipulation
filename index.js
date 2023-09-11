/**
 * @fileoverview
 * Requirements:
 * - The function must accept a valid object format.
 * - The function must remove invalid objects.
 * - The function must output a valid byline HTML string.
 * - A byline string must start with a "By".
 * - Authors must be separated by a comma "," if there are more than 2.
 * - The last Author must be separated by an "and".
 * - The Author must be wrapped by the style specified in the "block" parameter.
 * - Assume the we support the `<em>` and `<strong>` html tags.
 *
 *
 * The example input below should return:
 * "By <strong>Jonah Engel Bromwich</strong>, <em>Matthew Schneier</em> and Niraj Chokshi"
 */

const exampleBylines = {
  authors: [
    {
      firstName: "jonah",
      middleName: "Engel",
      lastName: "bromwich",
      block: {
        __typename: "Bold",
      },
    },
    { random: "node" },
    {},
    {
      firstName: "matthew",
      middleName: "",
      lastName: "sChneier",
      block: {
        __typename: "Italics",
      },
    },
    {
      firstName: "Niraj",
      middleName: "",
      lastName: "chokshi",
      block: {},
    },
  ],
};

const isValid = (author) => {
  const keys = Object.keys(author);
  let count = 0;

  for (const key of keys) {
    if (
      key === "firstName" ||
      key === "middleName" ||
      key === "lastName" ||
      key === "block"
    )
      count++;
  }
  return count === 4;
};

const filteredArr = (arr) => {
  const res = [];
  arr.filter((author) => {
    if (isValid(author)) {
      res.push(author);
    }
  });
  return res;
};

const blockCheck = (author) => {
  let style = "";
  switch (author.block.__typename?.toLowerCase()) {
    case "bold":
      style = "strong";
      break;
    case "italics":
      style = "em";
      break;
    default:
      style = null;
  }

  return style;
};

const capitalized = (key) => {
  let word = key.toLowerCase();
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const wrappedStr = (str, style) => {
  return style ? `<${style}>${str}</${style}>` : str;
};

const getAuthor = (author) => {
  let authorStr = "";
  let styleStr = blockCheck(author);

  if (author.firstName.length) authorStr += capitalized(author.firstName);

  if (author.middleName.length)
    authorStr += ` ${capitalized(author.middleName)}`;

  if (author.lastName.length) authorStr += ` ${capitalized(author.lastName)}`;

  return wrappedStr(authorStr, styleStr);
};

function createBylineString(bylines) {
  const arr = bylines.authors;
  const cleanArr = filteredArr(arr);
  let authorsArr = [];
  let res = "";

  cleanArr.map((author) => {
    authorsArr.push(getAuthor(author));
  });

  if (authorsArr.length > 0) {
    const delimiter = authorsArr.length > 2 ? "," : "";
    res += "By ";

    for (let i = 0; i < authorsArr.length - 1; i++) {
      res += `${authorsArr[i]}${delimiter} `;
    }

    res += `and ${authorsArr[authorsArr.length - 1]}`;
  }

  return res;
}

console.log(createBylineString(exampleBylines));
