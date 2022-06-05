import Head from 'next/head'

const Title = ({ title }: { title: string }) => (
  <>
    <Head>
      <title>{title} | INFO PRIDE</title>
    </Head>
    <h2>{title}</h2>
  </>
)

export default Title
