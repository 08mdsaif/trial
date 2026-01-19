import Hero from "@/Components/Hero"
import Header from "../Components/Header"
import Trending from "../Components/Trending"
import Movies from "@/Components/Movies"
import Tv from "@/Components/Tv"
import Sports from "@/Components/Sports"
import Footer from '@/Components/Footer'

function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Trending />
      <Movies />
      <Tv />
      <Sports />
      <Footer />
    </div>
  )
}

export default Home