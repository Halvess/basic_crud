const Text = ({type = '', content, classes=''}) => {
    let className
    switch(type){
        case 'error': className = 'error'; break;
        default: className = 'disclaimer'; break;
    }
    return (
        <p className={`${className} pagePadding ${classes}`}>
            {content}  
        </p>
    )
}

export default Text