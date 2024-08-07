import { NavLink } from "react-router-dom";
import styles from "./navigation-link.module.scss";

interface INavigationLink {
  value?: string;
  to?: string;
  title?: string;
}


const NavigationLink = (props: INavigationLink) => {
  const { value, to = '', title = '' } = props;
  return (
    <NavLink
      title={title}
      end
      className={({ isActive }) => isActive ? styles.active_link : styles.link}
      to={to}
    >
      {value}
    </NavLink>
  )
}

export default NavigationLink;