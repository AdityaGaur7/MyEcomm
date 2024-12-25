import Layout from "../components/Layout/Layout";
import { useAuth } from "../Context/auth";
const HomePage = () => {

    const { auth } = useAuth();
  return (
    <Layout
      title={"Home"}
      description={"Homepage"}
      keywords={"electronics, buy electronics, cheap electronics"}
      author={"ProShop"}
    >
      <div>HomePage</div>
      <pre>
        {JSON.stringify(auth, null, 2)}
      </pre>
    </Layout>
  );
};

export default HomePage;
