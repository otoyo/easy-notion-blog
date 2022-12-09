import Script from 'next/script'
import footer from 'styles/layout/footer.module.scss'
import config from 'utils/config'

const Footer = () => {
  return (
    <div id={footer.root}>
      <div id={footer.dmca}>
        <p>
          &copy; 2022 {config.info.siteName} <br /> Powered by{' '}
          <a href='https://github.com/otoyo/easy-notion-blog'>easy-notion-blog</a>
        </p>
        <a
          href='//www.dmca.com/Protection/Status.aspx?ID=7a648f21-69b5-4293-8a57-0897e957963c'
          title='DMCA.com Protection Status'
          className='dmca-badge'
        >
          <img
            src='https://images.dmca.com/Badges/dmca_protected_sml_120l.png?ID=7a648f21-69b5-4293-8a57-0897e957963c'
            alt='DMCA.com Protection Status'
          />
        </a>
        <Script src='https://images.dmca.com/Badges/DMCABadgeHelper.min.js'></Script>
      </div>
    </div>
  )
}

// const Root = styled.footer`
//   grid-area: footer;
//   text-align: center;

//   p {
//     padding: 1rem;
//     font-size: 1.2rem;
//   }
// `

// const COPYRIGHT = styled.p`
//   padding: 1rem;
//   font-size: 1.2rem;
// `

// const SPECIALTHANKS = styled.a`
//   font-size: 1.2rem;
// `

// const DMCA = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   padding: 8px;
//   background-color: #000000;
// `

export default Footer
