import RegisterForm from '@/components/forms/RegisterForm';
import { Mutation } from 'react-apollo';
import { SIGN_UP } from '@/apollo/queries';
import withApollo from '@/hoc/withApollo';
import Redirect from '@/components/shared/Redirect';
import BaseLayout from '@/layouts/BaseLayout';


const Register = () => {
  const errorMessages = (error) => {
    return error.graphQLErrors && error.graphQLErrors[0].message || 'Oooops something went wrong...'
  }
  return (
    <BaseLayout>
      <div className="bwm-form m-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Register</h1>
            <Mutation mutation={SIGN_UP}>
              { (signUpUser, {data, error}) =>

                <>
                  <RegisterForm onSubmit={registerData => {
                    signUpUser({variables: registerData}).catch(e => e);
                  }} />
                  { data && data.signUp && <Redirect to="/login"/>}
                  { error && error.graphQLErrors[0].message && <div className="alert alert-danger">{errorMessages(error)}</div>}
                </>
              }
            </Mutation>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default withApollo(Register);
