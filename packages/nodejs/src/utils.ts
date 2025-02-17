import path from "path"

/**
 * Retrieve a valid version number from a `package.json` in a given
 * `basedir`.
 *
 * @function
 */
export function getPackageVerson(basedir: string): string {
  try {
    const { version } = require(path.join(basedir, "package.json"))
    return version
  } catch (e) {
    return "0.0.0"
  }
}
