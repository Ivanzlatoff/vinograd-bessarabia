import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <meta name="description" content="Quality vine grapes in sunny Bessarabia. Our range include vine making classical grapes such as noble sorts of Odesskiy Cherniy, Merlot and hybird Isabella. Visit our site to get some. Buying grapes has never been as easy. Simply select quantity and sort or a mixture of some and plane your order! And get your barrells ready, they will need a thorough wash to store some quality vine!" />
        <title>Vinograd Bessarabia</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
