import React, { Component } from "react";
import { useParams, Link } from "react-router-dom";
import { Jumbotron, Button } from 'reactstrap';
import { withRouter } from "react-router";
import axios from "axios";
import PrintData from "./printData";
const url =
    "http://newsapi.org/v2/top-headlines?" +
    "country=us&" +
    "apiKey=396af8006baf46c483fd09dd702797b7";
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
    constructor(props) {
        super(props);
        this.state = {
            item: {
                source: { id:'Unknown', name: null },
                author: null,
                title: null,
                description: null,
                url: null,
                urlToImage: null,
                publishedAt: null,
                content: null
            },
        }
    }

    componentDidMount() {
        this.props.history.push(`/dashboard/news/:${this.props.match.params}`)
        console.log("id is: ");
        const { id } = this.props.match.params;
        console.log(id)
        const { data } = this.props.location.state;
        console.log(data)
        console.log("KK")
        let you = null;
        // const {data}=this.props.data;
        data.map((el, key) => {
            if (el.title === id)
                you = el
        })
        console.log("YOU:" + you)
        let load = data.find((e) => {
            return (e.title === id)
        })
        console.log("data is:" + load.source.name);
        console.log('0000000000000000');
        console.log(this.props)
        console.log('0000000000000000');
        console.log("_____________________");
        console.log(data);
        console.log("_____________________");
        // this.setState({ id: this.props.match.params.id });

        this.setState({ item: {
            source: { id: load.source.id, name: load.source.name },
            author: load.author,
            title: load.title,
            description: load.description,
            url: load.url,
            urlToImage: load.urlToImage,
            publishedAt: load.publishedAt,
            content: load.content
        }})
        console.log("JJ")
        console.log(this.state.item)
    }
    render() {
        //console.log("id is: ");
        // const {id}=this.props.match.params.id;
        // console.log(this.props.match.params.id);
        // console.log("--------------------");
        // console.log(this.state.item);
        return (
            <div>
      <Jumbotron>
        <h1 className="display-3">{this.state.item.source.name}</h1>
        <p className="lead">Presented by:{this.state.item.source.id}</p>
        <hr className="my-2" />
        <p>Author: {this.state.item.author}</p>
        <p>Title:{this.state.item.title}</p>
        <p>Description:{this.state.item.description}</p>
        <p>Source: <a href={this.state.item.url}>{this.state.item.source.name}</a></p>
        <p>PublishedAt: {this.state.item.publishedAt}</p>
        <hr className="my-2" />
        <p>Content: {this.state.item.content}</p>
 
        {/* <p>Link:{<Link to={this.state.item.url}>{this.state.item.source.name}</Link>}</p> */}
      </Jumbotron>
    </div>
        );
    }
    // const item=this.state.match.params.id;
}
export default NewsDescription;