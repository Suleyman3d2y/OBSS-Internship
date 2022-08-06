import Hellow from "./Hellow";
const Hello = function (props) {
  let { title, name } = props;
  return (
    <>
      {title}
      <h1>Hello React - Functional Component {name}</h1>
      <br />
      <Hellow />
    </>
  );
};

export default Hello;
