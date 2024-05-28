export const getSlugwithName = (name) => {
  let formattedString = name.toLowerCase();
  formattedString = formattedString.replace(/[,|']/g, "");
  formattedString = formattedString.replace(/\s+/g, "-");
  formattedString = formattedString.replace(/-+$/, "");
  formattedString = formattedString.replace(/-+/g, "-");

  return formattedString;
};
