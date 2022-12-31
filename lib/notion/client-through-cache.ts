import * as responses from './responses'
import {
  Post,
  Block,
} from './interfaces'
import * as client from './client'
import * as blogIndexCache from './blog-index-cache'

export async function getPosts(pageSize = 10): Promise<Post[]> {
  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    return allPosts.slice(0, pageSize)
  }

  return client.getPosts(pageSize)
}

export async function getAllPosts(): Promise<Post[]> {
  if (blogIndexCache.exists()) {
    console.log('Found cached posts.')

    return (blogIndexCache.get())
      .filter((pageObject: responses.PageObject) => client._validPageObject(pageObject))
      .map((pageObject: responses.PageObject) => client._buildPost(pageObject))
  }

  return client.getAllPosts()
}

export async function getRankedPosts(pageSize = 10): Promise<Post[]> {
  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    return allPosts
      .filter(post => !!post.Rank)
      .sort((a, b) => {
        if (a.Rank > b.Rank) {
          return -1
        } else if (a.Rank === b.Rank) {
          return 0
        }
        return 1
      })
      .slice(0, pageSize)
  }

  return client.getRankedPosts(pageSize)
}

export async function getPostsBefore(date: string, pageSize = 10): Promise<Post[]> {
  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    return allPosts.filter(post => post.Date < date).slice(0, pageSize)
  }

  return client.getPostsBefore(date, pageSize)
}

export async function getFirstPost(): Promise<Post|null> {
  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    return allPosts[allPosts.length - 1]
  }

  return client.getFirstPost()
}

export async function getPostBySlug(slug: string): Promise<Post|null> {
  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    return allPosts.find(post => post.Slug === slug)
  }

  return client.getPostBySlug(slug)
}

export async function getPostsByTag(tag: string | undefined, pageSize = 100): Promise<Post[]> {
  if (!tag) return []

  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    return allPosts.filter(post => post.Tags.includes(tag)).slice(0, pageSize)
  }

  return client.getPostsByTag(tag, pageSize)
}

export async function getPostsByTagBefore(
  tag: string,
  date: string,
  pageSize = 100
): Promise<Post[]> {
  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    return allPosts
      .filter(post => {
        return post.Tags.includes(tag) && new Date(post.Date) < new Date(date)
      })
      .slice(0, pageSize)
  }

  return client.getPostsByTagBefore(tag, date, pageSize)
}

export async function getFirstPostByTag(tag: string): Promise<Post|null> {
  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    const sameTagPosts = allPosts.filter(post => post.Tags.includes(tag))
    return sameTagPosts[sameTagPosts.length - 1]
  }

  return client.getFirstPostByTag(tag)
}

export async function getAllBlocksByBlockId(blockId: string): Promise<Block[]> {
  return client.getAllBlocksByBlockId(blockId)
}

export async function getBlock(blockId: string): Promise<Block> {
  return client.getBlock(blockId)
}

export async function getAllTags(): Promise<string[]> {
  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    return [...new Set(allPosts.flatMap(post => post.Tags))].sort()
  }

  return client.getAllTags()
}
