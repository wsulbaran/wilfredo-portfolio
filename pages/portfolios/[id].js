import {useRouter} from 'next/router'
import React from 'react'



/* const portFoliosDetails = ()  =>{
  const router = useRouter();
  const {id} = router.query;
  return (
  <h1>portfolio details ID: {id}</h1>
  )
} */


/* class portFoliosDetails extends React.Component {
  static getInitialProps ({query}) {
    return {query};
  }
  render () {
    const {id}  = this.props.query;
    return (
      <h1>portfolio details ID: {id}</h1>
    )
  }
} */

const portFoliosDetails = ({query})  =>{
  const {id} = query;
  return (
  <h1>portfolio details ID: {id}</h1>
  )
}

portFoliosDetails.getInitialProps = ({query}) => {
  return {query};
}

export default portFoliosDetails;