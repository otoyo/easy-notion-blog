'use client'

import type { NextPage } from 'next'
import Image from 'next/image'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import config from 'utils/config'
import styles from 'utils/styles'
import functions from 'utils/functions'

const Profile: NextPage = () => {
  const Birthdate = {
    year: config.profile.birth.year,
    month: config.profile.birth.month,
    date: config.profile.birth.date,
  }

  const age = functions.Birthdate(Birthdate)

  return (
    <>
      <Root>
        <Left>
          <Picture>
            <Image src='/img/profile/profile.jpg' alt='Tsujimoto Mamoru with Didgeridoo' width='150' height='150' />
          </Picture>
          <Infomation>
            <ul>
              <li>
                <h3>名前</h3>
                <ul>
                  <li>
                    <span>{config.profile.names}</span>
                  </li>
                </ul>
              </li>
              <li>
                <h3>年齢</h3>
                <ul>
                  <li>
                    <span>{age}</span>
                  </li>
                </ul>
              </li>
              <li>
                <h3>出生地</h3>
                <ul>
                  <li>
                    <span>{config.profile.place.birthplace.place}</span>
                  </li>
                </ul>
              </li>
              <li>
                <h3>現在の拠点</h3>
                <ul>
                  <li>
                    <span>{config.profile.place.current_base.place}</span>
                  </li>
                </ul>
              </li>
              <li>
                <h3>趣味</h3>
                <ul>
                  <li>
                    <span>{config.profile.hobby.dance}</span>
                  </li>
                  <li>
                    <span>{config.profile.hobby.instrument}</span>
                  </li>
                  <li>
                    <span>{config.profile.hobby.plant}</span>
                  </li>
                  <li>
                    <span>{config.profile.hobby.etc}</span>
                  </li>
                </ul>
              </li>
              <li>
                <h3>スキル</h3>
                <ul>
                  <li>
                    <h4>フロントエンド</h4>
                    <ul>
                      <li>
                        <span>{config.profile.skils.frontend.html}</span>
                      </li>
                      <li>
                        <span>{config.profile.skils.frontend.css}</span>
                      </li>
                      <li>
                        <span>{config.profile.skils.frontend.javascript}</span>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <h4>バックエンド</h4>
                    <ul>
                      <li>
                        <span>{config.profile.skils.backend.serverside}</span>
                      </li>
                      <li>
                        <span>{config.profile.skils.backend.database}</span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    <h3>Contact</h3>
                    <Socials>
                      <li>
                        <a href={config.external.github.link} target='_blank' rel='noreferrer'>
                          <FontAwesomeIcon icon={config.external.github.icon} />
                        </a>
                      </li>
                      <li>
                        <a href={config.external.twitter.link} target='_blank' rel='noreferrer'>
                          <FontAwesomeIcon icon={config.external.twitter.icon} />
                        </a>
                      </li>
                      <li>
                        <a href={config.external.instagram.link} target='_blank' rel='noreferrer'>
                          <FontAwesomeIcon icon={config.external.instagram.icon} />
                        </a>
                      </li>
                    </Socials>
                  </li>
                </ul>
              </li>
            </ul>
          </Infomation>
        </Left>
        <Right>
          <h3>{config.profile.names}について</h3>
          <p>{config.profile.text.first}</p>

          <GratefulLife>
            <figure>
              <Image src='/img/profile/grateful-life.jpg' alt='My Greateful Life' width='3013' height='3013' />
              <figcaption>What A Wonderful World</figcaption>
            </figure>
          </GratefulLife>
        </Right>
      </Root>
    </>
  )
}

const Root = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  width: 100%;
  margin: 50px 0;
  padding: 0;
  border: 1px solid #d0d0d4;

  @media (max-width: ${styles.sizes.breakpoint.small}) {
    grid-template-columns: 100%;
  }
`

const Left = styled.div`
  padding: 0 20px;
  border-right: 1px solid #d0d0d4;
`

const Right = styled.div`
  padding: 20px;
`

const Picture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;

  img {
    border-radius: 50%;
    border: 2px solid #000 !important;
  }
`

const Infomation = styled.div`
  ul {
    li {
      margin-bottom: 20px;

      h3 {
        position: relative;
        margin: 0 0 10px;
        ${styles.mixins.fontSize(16, 32)};

        &:before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 10%;
          height: 1px;
          background-color: #464646;
          z-index: 2;
        }

        &:after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: #d1d1d1;
        }
      }

      h4 {
        position: relative;
        margin: 10px 0;
        ${styles.mixins.fontSize(13, 32)};

        &:before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 10%;
          height: 1px;
          background-color: #464646;
          z-index: 2;
        }

        &:after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: #d1d1d1;
        }
      }

      span {
        ${styles.mixins.fontSize(14, 32)};
      }

      ul {
        li {
          margin: 0;

          ul {
            margin: 0;
          }
        }
      }
    }
  }
`

const Socials = styled.ul`
  display: flex;
  justify-content: space-between;

  li {
    text-align: center;
    ${styles.mixins.fontSize(20, 20)};

    a {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 70px;
      height: 70px;
    }
  }
`

const GratefulLife = styled.div`
  margin: 50px 0;

  figcaption {
    text-align: center;
  }

  img {
    width: auto;
    height: auto;
  }
`

export default Profile
