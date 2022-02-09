import { Layout } from "../../components/Layout";
import { ExchangesList } from "../../components/ExchangeList";

interface ExchangesPageProps {}

const ExchangesPage: React.FC<ExchangesPageProps> = () => {
  return (
    <Layout>
      <ExchangesList />
    </Layout>
  );
};

export default ExchangesPage;
