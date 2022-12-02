import Link from 'next/link'

import { Post } from 'lib/notion/interfaces'
import DateFormatter from 'components/Date'
import card from 'styles/components/card.module.scss'
type Props = {
  posts: Post[]
  title: string
}

const CardSmall = ({ title, posts }: Props) => {
  return (
    <section className={card.section}>
      <h1 className='section-title'>{title}</h1>
      <div className={card.wrapper}>
        {posts.map((post) => (
          <div key={post.Slug} className={card.article}>
            <Link as={`/blog/${post.Slug}`} href={`/blog/${post.Slug}`} passHref scroll={false}>
              <div className='story-figure figure' style={{ backgroundImage: `url(${post.coverEyeCatch})` }}></div>
              <div className='story-entrance'>
                <span className='story-category'>{post.Tags}</span>
                <h1>{post.Title}</h1>
                <div className='story-information'>
                  <ul className='story-status'>
                    <li>
                      <span className='story-publish'>
                        <DateFormatter dateString={post.Date} />
                      </span>
                    </li>
                  </ul>
                  <p>{post.Excerpt}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CardSmall
