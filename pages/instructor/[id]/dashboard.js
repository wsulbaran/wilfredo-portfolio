import { useRouter } from 'next/router';
import withApollo from '@/hoc/withApollo';
import withAuth from '@/hoc/withAuth';
import BaseLayout from '@/layouts/BaseLayout';
import { getDataFromTree } from '@apollo/react-ssr';
import { Card, Button } from 'react-bootstrap';
import  { useGetUserPortfolios, useDeletePortfolio } from '@/apollo/actions';
import Link from 'next/link';

const InstructorDashboard = withAuth(() => {
  const { data } = useGetUserPortfolios();
  const [ deletePortfolio ] = useDeletePortfolio();
  const userPortfolios = (data && data.userPortfolios) || [];
  const router = useRouter();

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-12">
          <h1 className="page-title">Instructor Portfolios</h1>
            { userPortfolios.map(p =>
              <Card key={p._id} className="mb-2">
                <Card.Header>{p.jobTitle}</Card.Header>
                <Card.Body>
                  <Card.Title>{p.title}</Card.Title>
                  <Card.Text>
                    {p.startDate} - {p.endDate}
                  </Card.Text>
                  <Link
                    href="/portfolios/[id]/edit"
                    as={`/portfolios/${p._id}/edit`}>
                    <a className="btn btn-warning mr-1">Update</a>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={()=> deletePortfolio({variables: {id: p._id} })}>
                      Delete
                  </Button>
                </Card.Body>
              </Card>
              )
            }
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}, ['admin', 'instructor'])

export default withApollo(InstructorDashboard, {getDataFromTree});
