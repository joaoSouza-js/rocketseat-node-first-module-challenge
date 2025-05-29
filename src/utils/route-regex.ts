export function getRouteRegex(path) {
  // Replace :param with a regex group
  return new RegExp("^" + path.replace(/:([^\/]+)/g, "([^/]+)") + "$");
}