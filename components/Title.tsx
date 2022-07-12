import Head from 'next/head'

const Title = ({ title, noh2 }: { title: string; noh2?: boolean }) => (
  <>
    <Head>
      <title>{title} | INFO PRIDE</title>
    </Head>
    {!noh2 && <h2>{title}</h2>}
  </>
)

export default Title
