import RegisterForm from '@/components/forms/RegisterForm';
import { Mutation } from 'react-apollo';
import { SIGN_UP } from '@/apollo/queries';
import withApollo from '@/hoc/withApollo';
import Redirect from '@/components/shared/Redirect';


const Register = () => {
  return (
    <>
      <div className="bwm-form m-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Register</h1>
            <Mutation mutation={SIGN_UP}>
              { (signUpUser, {data, error}) =>

                <>
                  <RegisterForm onSubmit={registerData => {
                    signUpUser({variables: registerData})
                  }} />
                  { data && data.signUp && <Redirect to="/login"/>}
                </>
              }
            </Mutation>
          </div>
        </div>
      </div>
    </>
  )
}

export default withApollo(Register);