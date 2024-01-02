
export const removeHtmlTags = (input) => (
   input.replace(/<\/?[^>]+(>|$)/g, "")
)

export const timestampToDate = (timestamp) => {
   const date = new Date(Number(timestamp));
   const options = { year: "numeric", month: "long", day: "numeric" };
   return date.toLocaleDateString(undefined, options);
}

export const UppercaseWord = (input) => (
   input.replace(/\b\w/ig, (match) => match.toUpperCase())
)

export const getFirstLetters = (input) => {
   const words = input.split(' ');
   const firstTwoWords = words.slice(0, 2);
   const firstLetters = firstTwoWords.map(word => word.charAt(0).toUpperCase());
   return firstLetters.join('');
}