import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';
import PrintData from './printData';
const url = 'http://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=396af8006baf46c483fd09dd702797b7';

//     function newsDescription() {
//         // We can use the `useParams` hook here to access
//         // the dynamic pieces of the URL.
//         let { id } = useParams();
      
//         return (
//           <div>
//               <p></p>
//             <h3>ID: {id}</h3>
//           </div>
//         );
//       }
// export default newsDescription;
class NewsDescription extends Component {
    // let { id } = useParams();
    constructor(props) {
        super(props);
        // this.state={id:null}
    }
    componentDidMount() {
        // console.log("id is: ");
        // const {id}=this.props.match.params.id;
        // console.log(this.props)
        // console.log(id)
        // this.fetchData(id);
        // this.setState({id:this.props})
        // const { match: { params } } = this.props;
        // const { id1 }= this.props.match.params.id;
        // axios.get(`/dashboard/news/description/${id}`)
        //   .then(({ data: item }) => {
        //     this.setState({ item });
        //   });
    }
//       fetchData = id => {
//         axios.get(`/dashboard/news/${id}`)
//           .then(({ data: item }) => {

//           });
// };
render()
{
    console.log("id is: ");
        // const {id}=this.props.match.params.id;
        console.log(this.props)
        console.log('--------------------')
    return (
        <div>
            <h3>adsfadsf</h3>
            <p>{this.props}</p>
        </div>
    );
}
    // const item=this.state.match.params.id;
    
}

export default NewsDescription;