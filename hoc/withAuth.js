import { useGetUser } from '@/apollo/actions';
import Redirect from '@/components/shared/Redirect';

export default (WrappedComponent, role) => (props) => {
  const { data: { user } = {}, loading, error } = useGetUser({fetchPolicy: 'network-only'});

  if (
    !loading &&
    (!user || error) &&
    typeof window !== 'undefined'
  ) {
    return <Redirect to="/login" />
  }

  // TODO: Check for role
  if (user) {
    if(role && !role.includes(user.role)) {
      return <Redirect to="/login" />
    }
    return <WrappedComponent {...props} />

  }

  return <p>Authenticating...</p>;
}
