import React, { Component } from 'react'
import Article from './News-Article'
import API from '../API/apiManager'
import styled from 'styled-components';

const Red = styled.div`
    background-color: white;
    color: cornflowerblue;
`


const Input = styled.input`
    display: block;
`


export default class News extends Component {
    state = {
        articles: [],
        newsTitle: "",
        newsBody: "",
        newsURL: ""
    }

    componentDidMount() {
        API.getField("news?_sort=timestamp&_order=desc")
            .then(articles => this.setState({ articles: articles }))
        
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    checkInarticle = () => {
        API.postNews(sessionStorage.getItem("activeUser"), this.state.newsTitle, this.state.newsURL, this.state.newsBody, new Date)
            .then(result => {
                // console.log('news post result:', result);
                API.getField("news?_sort=timestamp&_order=desc")
                    .then(articles => this.setState({ articles: articles }))
                this.setState({ newsTitle: "" });
                this.setState({ newsBody: "" });
                this.setState({ newsURL: "" });

            })
    }


    checkOutarticle = (articleId) => {
        // Delete the specified article from the API

        API.delNews(articleId)
            .then(() => {
                return API.getField("news?_sort=timestamp&_order=desc")
            })
            .then(articleList => {
                // console.log('check out articles list', articleList)
                this.setState({ articles: articleList });
            })
    }

    render() {
        return (
            <React.Fragment>
                <Red className="News">
                <div className="News">
                    <h2>News</h2>
                    <label>Title</label>
                    <Input onChange={this.handleFieldChange} value={this.state.newsTitle} type="text" id="newsTitle" required /><br />
                    <label>Body</label>
                    <Input onChange={this.handleFieldChange} value={this.state.newsBody} type="text" id="newsBody" required /><br />
                    <label>URL</label>
                    <Input onChange={this.handleFieldChange} value={this.state.newsURL} type="text" id="newsURL" required /><br />
                    <button onClick={this.checkInarticle} id="add-article">New Article</button>


                    {
                        this.state.articles.map(article => {
                            console.log("test log", article.id, this.props.friends.concat([sessionStorage.getItem('activeUser')]).includes(`${article.userId}`))
                            return this.props.friends.concat([sessionStorage.getItem('activeUser')]).includes(`${article.userId}`) && <Article key={article.id}
                                article={article}
                                styling={sessionStorage.getItem('activeUser') == article.userId ? "normal" : "italics"}
                                checkOutarticle={this.checkOutarticle}
                            />
                        }

                        )
                    }
                    </div>
                </Red>

            </React.Fragment>
        )
    }
}

