import React, { Component } from 'react';
// import axios from 'axios';
import Request from 'request';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardDeck, CardColumns, Collapse
} from 'reactstrap';

const url = 'http://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=396af8006baf46c483fd09dd702797b7';
class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            isOpen: false
        };
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
    handleDisplayMore = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }
    render() {
        const { articles } = this.state;

        return (<div >
            <CardColumns>
                {
                    articles.map((el, key) => {
                        return (<div>
                            <br></br>
                            <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                                <CardBody>
                                    <CardTitle> Title: {articles.length > 0 && el.title}</CardTitle>
                                    <CardSubtitle>Author: {articles.length > 0 && el.author}</CardSubtitle>
                                    <Button onClick={this.handleDisplayMore}>View More</Button>
                                    {this.state.isOpen ? (
                                        <CardBody>
                                            {el.description}
                                        </CardBody>) : null}
                                </CardBody>
                            </Card>
                        </div>
                        )
                    })
                }
            </CardColumns>
        </div>);
    }
}
export default News;
// 396af8006baf46c483fd09dd702797b7