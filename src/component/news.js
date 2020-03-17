import React, { Component } from 'react';
// import axios from 'axios';
import {
    Card, CardBody,
    CardTitle, CardSubtitle, Button, CardColumns
} from 'reactstrap';
import { Link } from 'react-router-dom';

const url = 'http://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=396af8006baf46c483fd09dd702797b7';
class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        };
    }

    // let req = new Request(url);
    componentDidMount() {
        this.props.history.push('/dashboard/news')
        fetch(url)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    articles: response.articles
                })
            })
        let arti = this.state.articles;
        arti.map((el, key) => {
            Object.assign(el, { isOpen: false })
        })
        this.setState({ articles: arti });
    }
    handleDisplayMore = (id) => {
        console.log("source id" + id);
        let arti = this.state.articles;
        arti.map((el, key) => {
            if (el.title === id) {
                el.isOpen = !el.isOpen;
            }
            this.setState({ articles: arti })
            // this.setState({ isOpen: !this.state.isOpen })
        })



    }
    render() {
        const { articles } = this.state;

        return (<div >
            <CardColumns>
                {
                    articles.map((el, key) =>
                        <Card key={el.title} body inverse style={{ backgroundColor: '#333', borderColor: '#333' }} >
                            <CardBody>
                                <CardTitle>
                                    <Link to={{
                                        pathname: `/dashboard/news/${el.title}`,
                                        state: {
                                            data: this.state.articles
                                        },
                                    }}>
                                        Title: {articles.length > 0 && el.title}
                                    </Link>
                                </CardTitle>
                                <CardSubtitle>Author: {articles.length > 0 && el.author}</CardSubtitle>
                                <Button onClick={() => { this.handleDisplayMore(el.title) }}>View More</Button>
                                {el.isOpen ? (
                                    <CardBody>
                                        {el.description}
                                    </CardBody>) : null}
                            </CardBody>
                        </Card>
                        // )
                    )
                }
            </CardColumns>
        </div>);
    }
}
export default News;
// 396af8006baf46c483fd09dd702797b7