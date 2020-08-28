import { useRouter } from "next/router";
import { useEffect }  from 'react'




const Redirect = ({to}) => {
    const router = useRouter();

    useEffect(() => {
        router.push({pathname: to})
    }, [])

    return null;
}

export default Redirect;