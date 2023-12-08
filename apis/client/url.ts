function url<Parts extends string[]>(...url_parts: Parts) {
  const joined_parts = url_parts.join("/");
  return `/${joined_parts}`;
}

export { url };
