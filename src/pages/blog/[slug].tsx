const path = require('path')

import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import fetch from 'node-fetch'
import { useRouter } from 'next/router'

import { NEXT_PUBLIC_URL } from '../../lib/notion/server-constants'
import Header from '../../components/header'
import Heading from '../../components/heading'
import SocialButtons from '../../components/social-buttons'
import components from '../../components/dynamic'
import blogStyles from '../../styles/blog.module.css'
import { getBlogLink, getTagLink, getDateStr } from '../../lib/blog-helpers'
import { textBlock } from '../../lib/notion/renderers'
import {
  getPosts,
  getAllPosts,
  getRankedPosts,
  getPostBySlug,
  getPostsByTag,
  getAllTags,
  getAllBlocksByPageId,
} from '../../lib/notion/client'

// Get the data for each blog post
export async function getStaticProps({ params: { slug } }) {
  const post = await getPostBySlug(slug)

  if (!post) {
    console.log(`Failed to find post for slug: ${slug}`)
    return {
      props: {
        redirect: '/blog',
      },
      revalidate: 30,
    }
  }

  const blocks = await getAllBlocksByPageId(post.PageId)
  const rankedPosts = await getRankedPosts()
  const recentPosts = await getPosts(5)
  const tags = await getAllTags()

  let sameTagPosts = []
  if (post.Tags.length > 0) {
    sameTagPosts = (await getPostsByTag(post.Tags[0], 6)).filter(
      p => p.Slug !== post.Slug
    )
  }

  return {
    props: {
      post,
      blocks,
      rankedPosts,
      recentPosts,
      sameTagPosts,
      tags,
    },
    revalidate: 60,
  }
}

// Return our list of blog posts to prerender
export async function getStaticPaths() {
  const posts = await getAllPosts()
  return {
    paths: posts.map(post => getBlogLink(post.Slug)),
    fallback: 'blocking',
  }
}

const listTypes = new Set(['bulleted_list', 'numbered_list'])

const RenderPost = ({
  post,
  blocks = [],
  rankedPosts = [],
  recentPosts = [],
  sameTagPosts = [],
  tags = [],
  redirect,
}) => {
  const router = useRouter()

  let listTagName: string | null = null
  let listLastId: string | null = null
  let listMap: {
    [id: string]: {
      key: string
      isNested?: boolean
      nested: string[]
      children: React.ReactFragment
    }
  } = {}

  useEffect(() => {
    if (redirect && !post) {
      router.replace(redirect)
    }
  }, [router, redirect, post])

  if (!post) {
    return (
      <div className={blogStyles.post}>
        <p>
          Woops! did not find the posts, redirecting you back to the blog index
        </p>
      </div>
    )
  }

  return (
    <>
      <Header
        path={`/blog/${post.Slug}`}
        titlePre={post.Title}
        description={post.Excerpt}
        ogImageUrl={post.OGImage}
      />
      <div className={`${blogStyles.flexContainer}`}>
        <div className={blogStyles.post}>
          {post.Date && (
            <div className="posted">📅&nbsp;&nbsp;{getDateStr(post.Date)}</div>
          )}
          <h1>{post.Title || ''}</h1>
          <hr />
          <div className={blogStyles.tagContainer}>
            {post.Tags &&
              post.Tags.length > 0 &&
              post.Tags.map(tag => (
                <Link
                  href="/blog/tag/[tag]"
                  as={getTagLink(tag)}
                  key={tag}
                  passHref
                >
                  <a className={blogStyles.tag}>🔖&nbsp;&nbsp;{tag}</a>
                </Link>
              ))}
          </div>

          {blocks.length === 0 && <p>This post has no content</p>}

          {blocks.map((block, blockIdx) => {
            const isLast = blockIdx === blocks.length - 1
            const isList =
              block.Type === 'bulleted_list_item' ||
              block.Type === 'numbered_list_item'
            let toRender = []
            let richText

            if (!!block.RichTexts && block.RichTexts.length > 0) {
              richText = block.RichTexts[0]
            }

            if (isList) {
              listTagName =
                components[block.Type === 'bulleted_list_item' ? 'ul' : 'ol']
              listLastId = `list${block.Id}`

              listMap[block.Id] = {
                key: block.Id,
                nested: [],
                children: textBlock(block, true, block.Id),
              }
            }

            if (listTagName && (isLast || !isList)) {
              toRender.push(
                React.createElement(
                  listTagName,
                  { key: listLastId! },
                  Object.keys(listMap).map(itemId => {
                    if (listMap[itemId].isNested) return null

                    const createEl = item =>
                      React.createElement(
                        components.li || 'ul',
                        { key: item.key },
                        item.children,
                        item.nested.length > 0
                          ? React.createElement(
                              components.ul || 'ul',
                              { key: item + 'sub-list' },
                              item.nested.map(nestedId =>
                                createEl(listMap[nestedId])
                              )
                            )
                          : null
                      )
                    return createEl(listMap[itemId])
                  })
                )
              )
              listMap = {}
              listLastId = null
              listTagName = null
            }

            const renderHeading = (Type: string | React.ComponentType) => {
              if (!!richText) {
                toRender.push(
                  <Heading key={block.Id}>
                    <Type key={block.Id}>
                      {textBlock(block, true, block.Id)}
                    </Type>
                  </Heading>
                )
              }
            }

            switch (block.Type) {
              case 'paragraph':
                toRender.push(textBlock(block, false, block.Id))
                break
              case 'heading_1':
                renderHeading('h1')
                break
              case 'heading_2':
                renderHeading('h2')
                break
              case 'heading_3':
                renderHeading('h3')
                break
              case 'image':
                toRender.push(
                  <img src={block.Image.File.Url} alt="image in the content" />
                )
                if (
                  block.Image.Caption.length > 0 &&
                  block.Image.Caption[0].Text.Content
                ) {
                  toRender.push(
                    <div className={blogStyles.caption}>
                      {block.Image.Caption[0].Text.Content}
                    </div>
                  )
                }
                break
              case 'code':
                toRender.push(
                  <components.Code
                    key={block.Id}
                    language={block.Language || ''}
                  >
                    {block.Code.Text.map(
                      richText => richText.Text.Content
                    ).join('')}
                  </components.Code>
                )
                break
              case 'quote':
                toRender.push(
                  React.createElement(
                    components.blockquote,
                    { key: block.Id },
                    block.Quote.Text.map(
                      richText => richText.Text.Content
                    ).join('')
                  )
                )
                break
              case 'callout':
                toRender.push(
                  <components.Callout key={block.Id} icon={block.Callout.Icon}>
                    {textBlock(block.Callout, false, block.Id)}
                  </components.Callout>
                )
                break
              default:
                if (
                  process.env.NODE_ENV !== 'production' &&
                  !(
                    block.Type === 'bulleted_list_item' ||
                    block.Type === 'numbered_list_item'
                  )
                ) {
                  console.log('unknown type', block.Type)
                }
                break
            }
            return toRender
          })}
          <div>
            {NEXT_PUBLIC_URL && (
              <SocialButtons
                title={post.Title}
                url={path.join(NEXT_PUBLIC_URL, getBlogLink(post.Slug))}
                id={post.Slug}
              />
            )}
          </div>
        </div>
        <div className={blogStyles.sideMenu}>
          <h3>Posts in the same category</h3>
          <hr />

          {sameTagPosts.length === 0 && (
            <div className={blogStyles.noContents}>There are no posts yet</div>
          )}
          {sameTagPosts.length > 0 && (
            <ul>
              {sameTagPosts.map(sameTagPost => {
                return (
                  <li key={sameTagPost.Slug}>
                    <Link
                      href="/blog/[slug]"
                      as={getBlogLink(sameTagPost.Slug)}
                      passHref
                    >
                      <a>{sameTagPost.Title}</a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
          <h3>Recommended</h3>
          <hr />

          {rankedPosts.length === 0 && (
            <div className={blogStyles.noContents}>There are no posts yet</div>
          )}
          {rankedPosts.length > 0 && (
            <ul>
              {rankedPosts.map(rankedPost => {
                return (
                  <li key={rankedPost.Slug}>
                    <Link
                      href="/blog/[slug]"
                      as={getBlogLink(rankedPost.Slug)}
                      passHref
                    >
                      <a>{rankedPost.Title}</a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
          <h3>Latest posts</h3>
          <hr />

          {recentPosts.length === 0 && (
            <div className={blogStyles.noContents}>There are no posts yet</div>
          )}
          {recentPosts.length > 0 && (
            <ul>
              {recentPosts.map(recentPost => {
                return (
                  <li key={recentPost.Slug}>
                    <Link
                      href="/blog/[slug]"
                      as={getBlogLink(recentPost.Slug)}
                      passHref
                    >
                      <a>{recentPost.Title}</a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
          <h3>Categories</h3>
          <hr />

          {tags.length === 0 && (
            <div className={blogStyles.noContents}>There are no tags yet</div>
          )}
          {tags.length > 0 && (
            <ul>
              {tags.map(tag => {
                return (
                  <li key={tag}>
                    <Link href="/blog/tag/[tag]" as={getTagLink(tag)} passHref>
                      <a>{tag}</a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default RenderPost
