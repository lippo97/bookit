import ErrorPage from './_error';

const message = "We could't find the page you're looking for";

function Error404() {
  return <ErrorPage code={404} text={message} />;
}

export default Error404;
