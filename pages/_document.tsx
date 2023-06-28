import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { Navbar } from 'components/index'

const  Document=()=> {
  return (
    <Html lang="en" className='w-full h-full'>
      <Head />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <body className='w-full h-full'>
        <Main />
        {/* <h1>footer</h1> */}
        <NextScript />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js" integrity="sha512-fD9DI5bZwQxOi7MhYWnnNPlvXdp/2Pj3XSTRrFs5FQa4mizyGLnJcN6tuvUS6LbmgN1ut+XGSABKvjN0H6Aoow==" crossOrigin="anonymous" referrerPolicy="no-referrer"></Script>
      </body>
    </Html>
  )
}
export default Document