import ErrorPage from './_error';

const message = 'Whoops! Something bad happened.';

function Error500() {
  return <ErrorPage code={500} text={message} />;
}

export default Error500;
