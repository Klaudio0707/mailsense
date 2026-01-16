import HeroCarousel from '../../components/HeroCarousel'
import styles from './styles.module.css'

const Home = () => {
    return (
        <main className={styles.pageWrapper}>
            <HeroCarousel />
        </main>
    )
}

export default Home
