import React, { Component } from 'react';
// import axios from 'axios';
import Request from 'request';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
  
const url = 'http://newsapi.org/v2/top-headlines?' +
'country=us&' +
'apiKey=396af8006baf46c483fd09dd702797b7';
class News extends Component {
    constructor(props) {
        super(props);
        this.state = { articles: []};
    }
   
        // let req = new Request(url);
    componentDidMount() {
        fetch(url)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    articles: response.articles
                })
            })
    }
    render() {
        const { articles } = this.state;
        return (<div >
            {/* <div class="card-body">
            <h5 class="card-title">
                {articles.length > 0 && articles[0].title}
            </h5>
            <a href="#" class="btn btn-primary">Description</a>
            </div> */}
            <Card>
        <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
        <CardBody>
          <CardTitle>{articles.length > 0 && articles[0].title}</CardTitle>
          <CardSubtitle>{articles.length > 0 && articles[0].author}</CardSubtitle>
          <Button>Description</Button>
        </CardBody>
      </Card>
        </div>);
    }
}
export default News;
// 396af8006baf46c483fd09dd702797b7