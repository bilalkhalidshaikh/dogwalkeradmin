import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Dogs from '../../features/Dogs'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Dogs"}))
      }, [])


    return(
        <Dogs />
    )
}

export default InternalPage