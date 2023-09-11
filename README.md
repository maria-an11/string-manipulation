# JavaScript: String manipulation

## Requirements:

- The function must accept a valid object format.
- The function must remove invalid objects.
- The function must output a valid byline HTML string.
- A byline string must start with a "By".
- Authors must be separated by a comma "," if there are more than 2.
- The last Author must be separated by an "and".
- The Author must be wrapped by the style specified in the "block" parameter.
- Assume the we support the `<em>` and `<strong>` html tags.

## Given example to work with

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

## The example input above should return:

    "By <strong>Jonah Engel Bromwich</strong>, <em>Matthew Schneier</em> and Niraj Chokshi"
