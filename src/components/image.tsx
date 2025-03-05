import { v4 as uuidv4 } from 'uuid';

interface props {
    source: string,
    containerClass: string
}

const Image = ({source, containerClass}: props) => {

    return(
        <div className={containerClass}>
            <img className="general-img" src={source} key={uuidv4()}/>
        </div>
    )
}

export default Image