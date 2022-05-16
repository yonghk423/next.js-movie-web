import Link from 'next/link';
import Image from 'next/image';
import styles from "./Header.module.scss"

export default function Header() {
    return (    
      <nav className={styles.nav}>
        <div className={styles.col}>
          <div className={styles.logo}>
            <Image src="/yonghee.jpeg" alt="" layout='fill' />
          </div>
          <ul className={styles.items}>
            <li className={styles.item}>
              <Link href={"/Series"}>
                <a>series</a>
              </Link>
            </li>
            <li>
              <Link href={"/Movies"}>
                <a>movies</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.col}>
          <span className={styles.search}>search           
          </span>
        </div>  
      </nav>      
    )
}
