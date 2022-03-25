const Footer = ({ formIsToggled }) => {
  const getClassNames = () => formIsToggled ? "form-toggled" : "";

  return (
    <footer className={getClassNames()}>
      <p>
        Created by <a href="http://github.com/jaohara">John O'Hara</a> in 2022.
      </p>
    </footer>
  )
};

export default Footer;