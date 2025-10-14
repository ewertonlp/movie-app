import React from 'react'
import { FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa'

import { Link } from 'react-router-dom'

import bg from '../../assets/footer-bg.jpg'
import logo from '../../assets/tmovie.png'

import './footer.scss'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content container">
        <div className="footer__content__logo">
        <div className="logo">
          <Link to="/"><h1>BL<span> prime</span></h1></Link>
        </div>
        </div>
        <div className="footer__content__icons">
          <Link to="https://www.instagram.com">
            <FaInstagram className="footer__content__icon" />
          </Link>
          <Link to="https://www.youtube.com">
            <FaYoutube className="footer__content__icon" />{' '}
          </Link>
          <Link to="https://www.twitter.com">
            <FaTwitter className="footer__content__icon" />
          </Link>
        </div>
        <div className="footer__content__menus">
          <div className="footer__content__menu">
            <Link to="/">Home</Link>
            <Link to="/">Fale conosco</Link>
            <Link to="/">Termos de uso</Link>
            <Link to="/">Sobre nós</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">Live</Link>
            <Link to="/">FAQ</Link>
            <Link to="/">Premium</Link>
            <Link to="/">Política de Privacidade</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">Recomendados</Link>
            <Link to="/">Lançamentos</Link>
            <Link to="/">Top IMDB</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
