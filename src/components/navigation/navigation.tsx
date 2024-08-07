import NavigationLink from "../navigation-link/navigation-link";
import styles from "./navigation.module.scss";

const links = [
  {
    title: 'Home',
    to: '/'
  },
  {
    title: 'Cards',
    to: '/cards'
  },
  {
    title: 'Earn',
    to: '/earn'
  },
  {
    title: 'Friends',
    to: '/friends'
  }
]

const Navigation = () => {

  return (
    <div className={styles.container}>
      <nav className={styles.wrap}>
        {links.map((link, index) => (
          <NavigationLink
            key={link.title + index}
            title={link.title}
            value={link.title}
            to={link.to}
          />
        ))}
      </nav>
    </div>
  )
}

export default Navigation;