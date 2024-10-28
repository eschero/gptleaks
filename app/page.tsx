// Percorso: gptleaks-main/app/page.tsx
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import AsciiAnimation from '../components/AsciiAnimation' // Import del nuovo componente

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)

  return (
    <div>
      <AsciiAnimation /> {/* Aggiungi l'animazione in cima */}
      <Main posts={posts} />
    </div>
  )
}
