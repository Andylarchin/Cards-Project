import './App.css';
import { useQuery } from 'react-query';
import { QueryClient, QueryClientProvider } from 'react-query';
import Card from './components/Card/Card';
import LoginBody from './components/LoginForm/loginBody';
import Login from './components/actualLoginForm/login';

const queryClient = new QueryClient();

function App() {
  const getPost = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    return res.json();
  };

  const { data: PostsData, error, isLoading } = useQuery('posts', getPost);

  const getUser = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    return res.json();
  };

  const {
    data: UserData,
    error: userError,
    isLoading: userLoading,
  } = useQuery('users', async () => {
    const values = [];
    const Ures = await fetch('https://jsonplaceholder.typicode.com/posts');
    values.push(Ures.json());
    const Cres = await fetch('https://jsonplaceholder.typicode.com/comments');
    values.push(Cres.json());
    const Pres = await fetch('https://jsonplaceholder.typicode.com/posts');
    values.push(Pres.json());

    return values;
  });

  const getComment = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments');
    return res.json();
  };

  const {
    data: commentData,
    error: commentError,
    isLoading: commentLoading,
  } = useQuery('comments', getComment);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!PostsData || PostsData.length === 0) return <p>No data available</p>;

  if (userLoading) return <p>Loading...</p>;
  if (userError) return <p>Error: {userError.message}</p>;
  if (!UserData || UserData.length === 0) return <p>No data available</p>;

  if (commentLoading) return <p>Loading...</p>;
  if (commentError) return <p>Error: {commentError.message}</p>;
  if (!commentData || commentData.length === 0) return <p>No data available</p>;

  return (
    <>
      {/* <div class='bg'>
        <Card
          PostsData={PostsData}
          UserData={UserData}
          commentData={commentData}
        />
      </div> */}
      {/* <LoginBody /> */}
      <Login />
    </>
  );
}

function WrappedApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

export default WrappedApp;
