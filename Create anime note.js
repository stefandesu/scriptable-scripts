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

const { anime, season, episode } = args.shortcutParameter || { anime: "test", season: 1, episode: 2 }
const folder = anime.split(":").join(";")

const directory = joinPaths(fs.bookmarkedPath("notes"), "anime", folder)

// Create directory for anime if necessary
if (!fs.isDirectory(directory)) {
  fs.createDirectory(directory, true)
  console.log(`Created directory ${directory}`)
}

// Create filename for note
let filename = `${folder} - Season ${season}`
if (episode) {
  filename += ` Episode ${`0${episode}`.slice(-2)}`
}
filename += ".md"

const filePath = joinPaths(directory, filename)

if (!fs.fileExists(filePath)) {
  const date = new Date()
  const formatter = new DateFormatter()
  formatter.dateFormat = "yyyy-MM-dd"
  const dateString = formatter.string(date)
  console.log(dateString)
  
  fs.writeString(filePath, `---
anime: ${anime}
anilist:
reddit:
season: ${season}
episode: ${episode || null}
title:
aired:
watched: ${dateString}
---
# ${anime} - Season ${season} ${episode ? `Episode ${episode}` : ""}

## Notes

`)
  console.log(`Wrote to file ${filePath}`)
} else {
  console.log(`File ${filePath} already exists, doing nothing.`)
}

const iAWriterPath = encodeURIComponent(filePath.replace(fs.bookmarkedPath("notes"), "/Locations/iCloud"))
const iAWriterURL = `ia-writer://open?path=${iAWriterPath}&edit=true`
Safari.open(iAWriterURL)
