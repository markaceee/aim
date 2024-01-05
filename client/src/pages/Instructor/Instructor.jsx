import React from 'react'
import { Link } from 'react-router-dom'

const Instructor = () => {
    // const toast = useToast()
    return (
        <div>
            <Link to={"/instructor/register"}>Apply now</Link>
            {/* {toast({
                title: `top-right toast`,
                position: 'top-right',
                isClosable: true,
            })} */}
        </div>
    )
}

export default Instructor
