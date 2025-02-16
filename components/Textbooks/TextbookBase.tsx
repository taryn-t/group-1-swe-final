import FindTextbooks from "./Find/FindTextbooks"

type Props = {
  route: string[]
}

export default function TextbookBase({route}:Props){

    if(route.length === 1){
        return(
            <>
                <FindTextbooks/>
            </>
        )
    }
    else{
        return(
            <>
            
            
            </>
        )
    }
    
}