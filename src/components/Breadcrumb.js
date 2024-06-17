import '../assets/css/Breadcrumb.scss'
export const Breadcrumb = ({catagories}) => {
    // let catagoryArr = catagories.split('|')

    return (
        <nav>
            <ul className="breadcrumb">
                {catagories.map((cat, index) => {
                    return (
                        <li data-slash={index!=catagories.length-1?'/':''}>
                            <a href="">{cat}</a>
                        </li>
                    )
                })}
                {/*<li data-slash='/'>*/}
                {/*    <a href="">Accessorirs</a>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <a href="">Bags</a>*/}
                {/*</li>*/}
            </ul>
        </nav>
    )
}