// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: magic;
const fs = FileManager.local()
  
const joinPaths = (...paths) => {
  let [path, ...morePaths] = paths
  for (let nextPath of morePaths) {
    path = fs.joinPath(path, nextPath) 
  }
  return path
}

const date = new Date()
const formatter = new DateFormatter()
formatter.dateFormat = "yyyy-MM-dd"
const dateString = formatter.string(date)
const dateParts = dateString.split("-")
formatter.dateFormat = "EEEE"
const weekday = formatter.string(date)

const directory = joinPaths(fs.bookmarkedPath("notes"), "journal", dateParts[0], dateParts[1])

// Create directory for anime if necessary
if (!fs.isDirectory(directory)) {
  // fs.createDirectory(directory, true)
  console.log(`Created directory ${directory}`)
}

// Create filename for note
let filename = `${dateString}.md`

const filePath = joinPaths(directory, filename)

if (!fs.fileExists(filePath)) {
  
  fs.writeString(filePath, `${dateString}

${weekday}

`)
  console.log(`Wrote to file ${filePath}`)
} else {
  console.log(`File ${filePath} already exists, doing nothing.`)
}

const iAWriterPath = encodeURIComponent(filePath.replace(fs.bookmarkedPath("notes"), "/Locations/iCloud"))
const iAWriterURL = `ia-writer://open?path=${iAWriterPath}&edit=true`
Safari.open(iAWriterURL)
