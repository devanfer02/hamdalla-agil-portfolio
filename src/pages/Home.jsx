import { useEffect, useState } from "react"
import { Icon } from '@iconify/react'
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules'
import { heroes, illustrations, others } from "../utils/assets/assets.home";
import { socials } from "../utils/assets/assets.socials";
import SectionTitle from "../components/SectionTitle";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import 'swiper/css/pagination'
import '../style/sliderhero.css'
import '../style/carousel.css'
import '../style/home.css'

function SliderHero() {
  useEffect(() => {
    const blurDivs = document.querySelectorAll('.blur-load')

    blurDivs.forEach(div => {
      const img = div.querySelector('img')

      function loaded() {
        div.classList.add('loaded')
      }

      if (img.complete) {
        loaded()
      } else {
        img.addEventListener('load', loaded)
      }
    })
  })
  return (
    <Swiper
        slidesPerView={1}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        navigation
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className='swiper-hero'
      >
      { heroes.map((hero, index) => (
        <SwiperSlide key={index}> 
          <div className='overlay'></div>
          <img src={hero.src} className="slider-img" alt="hero" draggable="false" loading="lazy"/>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

function CarouselText() {
  return (
    <section className="carousel-text">
      <h3 className="font-title">
        Hamdalla Agil
      </h3>
      <h1 className="centered-text font-desc">
        Illustrator &amp; <br/>
        Graphic Novel <br/>
        Artist
      </h1>
      <Link to="/portfolio" className="btn-custom-hero">
        Portfolio
      </Link>
      <div className='mt-5'>
        <ul className='nav justify-content-center mb-3'>
          { socials.map((social) => (
            <li className='nav-item footer-item'>
              <Link to={social.href} target="_blank">
                <Icon icon={social.icon} width={'30px'} className='iconify-color'/>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function HomeCarousel() {
  return (
    <section className="hero-carousel">
      <SliderHero/>
      <CarouselText/>
    </section>
  )
}

function HomeAbout() {
  const [ isPhone, setIsPhone ] = useState(window.innerWidth <= 550)
  
  const greetDiv = () => {
    return (
      <div className="">
        <img src={others.greet} alt="greet" className="img-about" loading="lazy"/>
      </div>
    )
  }

  useEffect(() => {
    const handleResize = () => {
      setIsPhone(window.innerWidth <= 550)
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [isPhone])
  
  if (isPhone) {
    return (
      <section className="section-home">
        <section className="home-about-container justify-content-center pb-5">
            <div className="introduction-container container align-items-center justify-content-center">
              <h1 className="font-dk-96 welcome-title">Welcome</h1>
              { greetDiv() }
              <p className="font-about">
              This is Hamdalla Agil an illustrator based in indonesia. 
              You can explore more of his artworks through this website and get to know more about him.
              </p>
              <Link to="/about" className="btn-custom-about col-xl-1 ">
                About Me
              </Link>
            </div>
        </section>
      </section>
    )
  }
  
  return (
    <section className="section-home">
      <section className="home-about-container container">
        <div className="row">
          <div className="col-md-6 p-5 ">
            <h1 className="font-dk-96">Welcome</h1>
            <p className="font-about">
            This is Hamdalla Agil an illustrator based in indonesia. 
            You can explore more of his artworks through this website and get to know more about him.
            </p>
            <Link to="/about" className="btn-custom-about">
              About Me
            </Link>
          </div>
          <div className="col-md-6">
            { greetDiv() }
          </div>
        </div>
      </section>
    </section>
  )
}

function HomeIllustrations() {
  const getDisplayClass = () => {
    const isLessThan = window.innerWidth <= 810

    if (isLessThan) return 'd-none'
    else return ''
  }

  const getSlidesPerView = () => {
    const isPhone = window.innerWidth <= 550

    if (isPhone) return 2
    else return 4
  }

  const notActive = (currentIllustration, sliderIllustration) => {
    return currentIllustration.title !== sliderIllustration.title ? 'not-active' : 'active-illust'
  }

  const [ illustration, setIllustration ] = useState(illustrations[0])
  const [ displayClass, setDisplayClass ] = useState(getDisplayClass())
  const [ slidesPerView, setSlidesPerView ] = useState(getSlidesPerView)

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView())
      setDisplayClass(getDisplayClass())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return (
    <section className="section-illust">
      <section className="section-illustration container">
        <section className="current-illustration d-flex">
          <div className="container-current-illust">
            <img 
              src={illustration.src} 
              alt={illustration.title} 
              className="current-illustration-img" 
              draggable="false"
              loading="lazy"
            />
          </div>
          <div className="maintaner-height "></div>
          <div className={`illustration-info ${displayClass}`}>
            <h2 className="illustration-title">{illustration.title}</h2>
            <p className="illustration-category">{illustration.category}</p>
            <p className="illustration-description">{illustration.paragraf}</p>
            <Link className="btn-custom-illust" to='/portfolio'>
              &nbsp;See More&nbsp;
            </Link>
          </div>
        </section>
        <Swiper
          slidesPerView={slidesPerView}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={40}
          navigation
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="swiper-illustration"
        >
          { illustrations.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="illust-container">
                <img 
                  src={item.src} 
                  alt={item.title} 
                  draggable="false" 
                  className={`illust-slider ${notActive(illustration, item)}`}
                  onClick={() => setIllustration(item)}
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </section>
  )
}

function PlsHelpImBroke() {
  return (
    <section className="pls-help">
      <div className="position-relative">
        <img src={others.imbroke} alt="" className="w-100"/>
        <div className="pls-help-text">
          <h1 className="pls-help-title">
            Please Help Me, I have to pay my bills
          </h1>
          <p className="pls-help-little">
            Buy my prints or stickers please!
          </p>
        </div>
      </div>
    </section>
  )
}

function HomeStore() {
  return (
    <section className="container row mx-auto mb-5">
      <section className="col-sm store-information">
        <h5 className="store-info ">The prints are live!</h5>
        <p className="store-desc">check out all hamdallagil's artwork here!</p>
        <div className="mt-3 mx-auto">
          <Link to="/store" className="btn-custom-about">
            Store
          </Link>
        </div>
      </section>
      <section className="col-sm justify-content-center mx-3">
        <img src={others.ad} alt="ad-store" className="store-image img-fluid" loading="lazy"/>
      </section>
    </section>
  )
}

export default function HomePage() {
  useEffect(() => {
    document.title = 'Home'
  }, [])
  
  return (
    <>
      <HomeCarousel/>
      <section className="leaf-background">
      <SectionTitle title={'Introduction'}/>
      <HomeAbout/>
      <SectionTitle title={'Portfolio'}/>
      <HomeIllustrations/>
      <PlsHelpImBroke/>
      <SectionTitle title={'Store'}/>
      <HomeStore/>
      </section>
    </>
  )
}
