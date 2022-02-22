import * as fs from 'fs'

export const store = async (id: string, url: string) => {
  const blob = await fetchImageAsBlob(url)

  if (!blob) {
    return
  }

  const binary = (await blob.arrayBuffer()) as Uint8Array
  const buffer = Buffer.from(binary)

  fs.writeFile(filePath(id), buffer, err => {
    if (err) {
      console.log(err)
    }
  })
}

const dir = 'public/notion_images'

const filePath = (id: string) => {
  return `${dir}/${id}.png`
}

const fetchImageAsBlob = async (url: string) => {
  try {
    return await fetch(url).then(res => res.blob())
  } catch (err) {
    console.log(err)
    return null
  }
}
